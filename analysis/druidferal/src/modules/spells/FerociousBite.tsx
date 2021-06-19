import SPELLS from 'common/SPELLS';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { CastEvent } from 'parser/core/Events';
import SpellEnergyCost from '../features/SpellEnergyCost';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';
import { getAdditionalEnergyUsed } from '../../normalizers/FerociousBiteDrainLinkNormalizer';
import { SpellLink } from 'interface';
import { t } from '@lingui/macro';
import React from 'react';
import { ThresholdStyle, When } from 'parser/core/ParseResults';

const FB_BASE_COST = 25;
const MAX_FB_DRAIN = 25;

/**
 * Tracks Ferocious Bite usage for analysis, including some legendary and talent interactions.
 */
class FerociousBite extends Analyzer {
  hasSotf: boolean;

  shouldUseBonusEnergyCasts: number = 0;
  extraEnergyUsed: number = 0;

  constructor(options: Options) {
    super(options);

    this.hasSotf = this.selectedCombatant.hasTalent(SPELLS.SOUL_OF_THE_FOREST_TALENT_FERAL);

    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(SPELLS.FEROCIOUS_BITE),
      this.onFbCast,
    );
  }

  onFbCast(event: CastEvent) {
    if (event.resourceCost && event.resourceCost[RESOURCE_TYPES.ENERGY.id] === 0) {
      return; // free FBs (like from Apex Predator's Craving) don't drain but do full damage
    }

    if (
      this.hasSotf &&
      (this.selectedCombatant.hasBuff(SPELLS.BERSERK.id) ||
        this.selectedCombatant.hasBuff(SPELLS.INCARNATION_KING_OF_THE_JUNGLE_TALENT.id))
    ) {
      return; // using less than full bonus with SotF during Zerk is acceptable in order to maximize finishers used
    }

    const additionalEnergyUsed = getAdditionalEnergyUsed(event);
    this.shouldUseBonusEnergyCasts += 1;
    this.extraEnergyUsed += additionalEnergyUsed;

    if (additionalEnergyUsed < MAX_FB_DRAIN) {
      event.meta = event.meta || {};
      event.meta.isInefficientCast = true;
      event.meta.inefficientCastReason = `Used with low energy, causing only ${additionalEnergyUsed}
        extra energy to be turned in to bonus damage. You should always cast Ferocious Bite with
        the full ${FB_BASE_COST + MAX_FB_DRAIN} energy available in order to maximize damage`;
    }
  }

  /** This is the average extra energy used by FB casts, not counting casts where the player shouldn't use the full extra */
  get averageExtraEnergyUsed() {
    return this.shouldUseBonusEnergyCasts === 0
      ? MAX_FB_DRAIN // default to max with zero casts to avoid spurious suggestion
      : this.extraEnergyUsed / this.shouldUseBonusEnergyCasts;
  }

  get extraEnergySuggestionThresholds() {
    return {
      actual: this.averageExtraEnergyUsed,
      isLessThan: {
        minor: 25,
        average: 20,
        major: 10,
      },
      style: ThresholdStyle.NUMBER,
    };
  }

  suggestions(when: When) {
    when(this.extraEnergySuggestionThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <>
          You didn't always give <SpellLink id={SPELLS.FEROCIOUS_BITE.id} /> enough energy to get
          the full damage bonus. You should aim to have {FB_BASE_COST + MAX_FB_DRAIN} energy before
          using Ferocious Bite (or {0.8 * FB_BASE_COST + MAX_FB_DRAIN} during{' '}
          <SpellLink id={SPELLS.INCARNATION_KING_OF_THE_JUNGLE_TALENT.id} />
          ).
          <br />
          The only times it is acceptable to use less than the full energy consumption is when using
          free bite procs like with <SpellLink id={SPELLS.APEX_PREDATORS_CRAVING.id} /> or during
          <SpellLink id={SPELLS.BERSERK.id} /> when you have{' '}
          <SpellLink id={SPELLS.SOUL_OF_THE_FOREST_TALENT_FERAL.id} /> - as the extra combo points
          and energy allow you to maximize bites cast. These exceptions are <strong>not</strong>{' '}
          being counted in this statistic.
        </>,
      )
        .icon(SPELLS.FEROCIOUS_BITE.icon)
        .actual(
          t({
            id: 'druid.feral.suggestions.ferociousBite.efficiency',
            message: `${actual.toFixed(1)} average bonus energy used on Ferocious Bite.`,
          }),
        )
        .recommended(`${recommended} is recommended.`),
    );
  }
}

export default FerociousBite;

import { PlayerInfo, Rule } from 'parser/shared/metrics/apl';
import TALENTS from 'common/TALENTS/warlock';
import * as cnd from 'parser/shared/metrics/apl/conditions';
import SPELLS from 'common/SPELLS';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';
// import { TIERS } from "game/TIERS";

// Rules finishing in "Orig" arent based on the APL

// TODO
// nether_portal
// variable.tyrant_cd

export const rotation = (info: PlayerInfo): Rule[] => {
  // const hasDoomBrand = info.combatant.has2PieceByTier(TIERS.DF3 || TIERS.DF4)

  const rules = [
    dreadstalkersAsap,
    // hasDoomBrand ? dbRefreshDoomBrand : false,
    hog45,
    // hasDoomBrand ? dbSave1Core : db2cores,
    db2cores,
    powerSiphonNoOvercap,
    hog3,
    SPELLS.SHADOW_BOLT_DEMO,
  ];

  return rules;
};

const dreadstalkersAsap: Rule = {
  spell: TALENTS.CALL_DREADSTALKERS_TALENT,
  condition: cnd.describe(cnd.spellAvailable(TALENTS.CALL_DREADSTALKERS_TALENT), () => (
    <>available</>
  )),
};

const hog45: Rule = {
  spell: SPELLS.HAND_OF_GULDAN_CAST,
  condition: cnd.hasResource(RESOURCE_TYPES.SOUL_SHARDS, { atLeast: 4 }),
};

const hog3: Rule = {
  spell: SPELLS.HAND_OF_GULDAN_CAST,
  condition: cnd.hasResource(RESOURCE_TYPES.SOUL_SHARDS, { atLeast: 3 }),
};

const db2cores: Rule = {
  spell: SPELLS.DEMONBOLT,
  condition: cnd.buffStacks(SPELLS.DEMONIC_CORE_BUFF, { atLeast: 2 }),
};

// const dbRefreshDoomBrand: Rule = {

// }

// const dbSave1Core: Rule = {

// }

const powerSiphonNoOvercap: Rule = {
  spell: TALENTS.POWER_SIPHON_TALENT,
  condition: cnd.buffStacks(SPELLS.DEMONIC_CORE_BUFF, { atMost: 2 }),
};

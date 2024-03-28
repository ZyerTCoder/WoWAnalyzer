import { useAnalyzer } from 'interface/guide';
import Combatant from 'parser/core/Combatant';
import CastEfficiency from 'parser/shared/modules/CastEfficiency';
import { ComparisonStat, formatStatType } from './comparisonStatsInterface';
import TALENTS from 'common/TALENTS/warlock';

// ABILITIES TO ADD
// casts for sb/db/hog/implosion
// hogs with 3/2/1 shards
// implosion analyzer
// guillotine analyzer
// trinkets?

export function AddAbilitiesWithoutAnalyzers(stats: ComparisonStat[], combatant: Combatant) {
  let castEffic = useAnalyzer(CastEfficiency)!.getCastEfficiencyForSpell(
    TALENTS.CALL_DREADSTALKERS_TALENT,
  )!;
  if (combatant.hasTalent(TALENTS.CALL_DREADSTALKERS_TALENT)) {
    stats.push({
      icon: TALENTS.CALL_DREADSTALKERS_TALENT.icon,
      name: TALENTS.CALL_DREADSTALKERS_TALENT.name,
      sort: 2,
      stats: [
        {
          value: castEffic.casts,
          valueDesignator: 'casts',
          formatType: formatStatType.NO_FORMAT,
        },
        {
          value: castEffic.maxCasts - castEffic.casts,
          valueDesignator: 'missed casts',
          formatType: formatStatType.NO_FORMAT,
        },
        {
          value: castEffic.efficiency!,
          valueDesignator: 'time on cd',
          formatType: formatStatType.TO_PERCENT,
        },
      ],
    });
  }

  castEffic = useAnalyzer(CastEfficiency)!.getCastEfficiencyForSpell(TALENTS.POWER_SIPHON_TALENT)!;
  if (combatant.hasTalent(TALENTS.POWER_SIPHON_TALENT)) {
    stats.push({
      icon: TALENTS.POWER_SIPHON_TALENT.icon,
      name: TALENTS.POWER_SIPHON_TALENT.name,
      sort: 2,
      stats: [
        {
          value: castEffic.casts,
          valueDesignator: 'casts',
          formatType: formatStatType.NO_FORMAT,
        },
        {
          value: castEffic.efficiency!,
          valueDesignator: 'time on cd',
          formatType: formatStatType.TO_PERCENT,
        },
      ],
    });
  }

  castEffic = useAnalyzer(CastEfficiency)!.getCastEfficiencyForSpell(
    TALENTS.DEMONIC_STRENGTH_TALENT,
  )!;
  if (combatant.hasTalent(TALENTS.DEMONIC_STRENGTH_TALENT)) {
    stats.push({
      icon: TALENTS.DEMONIC_STRENGTH_TALENT.icon,
      name: TALENTS.DEMONIC_STRENGTH_TALENT.name,
      sort: 2,
      stats: [
        {
          value: castEffic.casts,
          valueDesignator: 'casts',
          formatType: formatStatType.NO_FORMAT,
        },
        {
          value: castEffic.efficiency!,
          valueDesignator: 'time on cd',
          formatType: formatStatType.TO_PERCENT,
        },
      ],
    });
  }

  castEffic = useAnalyzer(CastEfficiency)!.getCastEfficiencyForSpell(
    TALENTS.GRIMOIRE_FELGUARD_TALENT,
  )!;
  if (combatant.hasTalent(TALENTS.GRIMOIRE_FELGUARD_TALENT)) {
    stats.push({
      icon: TALENTS.GRIMOIRE_FELGUARD_TALENT.icon,
      name: TALENTS.GRIMOIRE_FELGUARD_TALENT.name,
      sort: 2,
      stats: [
        {
          value: castEffic.casts,
          valueDesignator: 'casts',
          formatType: formatStatType.NO_FORMAT,
        },
        {
          value: castEffic.efficiency!,
          valueDesignator: 'time on cd',
          formatType: formatStatType.TO_PERCENT,
        },
      ],
    });
  }

  castEffic = useAnalyzer(CastEfficiency)!.getCastEfficiencyForSpell(
    TALENTS.SUMMON_VILEFIEND_TALENT,
  )!;
  if (combatant.hasTalent(TALENTS.SUMMON_VILEFIEND_TALENT)) {
    stats.push({
      icon: TALENTS.SUMMON_VILEFIEND_TALENT.icon,
      name: TALENTS.SUMMON_VILEFIEND_TALENT.name,
      sort: 2,
      stats: [
        {
          value: castEffic.casts,
          valueDesignator: 'casts',
          formatType: formatStatType.NO_FORMAT,
        },
        {
          value: castEffic.efficiency!,
          valueDesignator: 'time on cd',
          formatType: formatStatType.TO_PERCENT,
        },
      ],
    });
  }

  castEffic = useAnalyzer(CastEfficiency)!.getCastEfficiencyForSpell(TALENTS.NETHER_PORTAL_TALENT)!;
  if (combatant.hasTalent(TALENTS.NETHER_PORTAL_TALENT)) {
    stats.push({
      icon: TALENTS.NETHER_PORTAL_TALENT.icon,
      name: TALENTS.NETHER_PORTAL_TALENT.name,
      sort: 2,
      stats: [
        {
          value: castEffic.casts,
          valueDesignator: 'casts',
          formatType: formatStatType.NO_FORMAT,
        },
        {
          value: castEffic.efficiency!,
          valueDesignator: 'time on cd',
          formatType: formatStatType.TO_PERCENT,
        },
      ],
    });
  }

  castEffic = useAnalyzer(CastEfficiency)!.getCastEfficiencyForSpell(TALENTS.GUILLOTINE_TALENT)!;
  if (combatant.hasTalent(TALENTS.GUILLOTINE_TALENT)) {
    stats.push({
      icon: TALENTS.GUILLOTINE_TALENT.icon,
      name: TALENTS.GUILLOTINE_TALENT.name,
      sort: 5,
      stats: [
        {
          value: castEffic.casts,
          valueDesignator: 'casts',
          formatType: formatStatType.NO_FORMAT,
        },
        {
          value: castEffic.efficiency!,
          valueDesignator: 'time on cd',
          formatType: formatStatType.TO_PERCENT,
        },
      ],
    });
  }

  castEffic = useAnalyzer(CastEfficiency)!.getCastEfficiencyForSpell(
    TALENTS.BILESCOURGE_BOMBERS_TALENT,
  )!;
  if (combatant.hasTalent(TALENTS.BILESCOURGE_BOMBERS_TALENT)) {
    stats.push({
      icon: TALENTS.BILESCOURGE_BOMBERS_TALENT.icon,
      name: TALENTS.BILESCOURGE_BOMBERS_TALENT.name,
      sort: 5,
      stats: [
        {
          value: castEffic.casts,
          valueDesignator: 'casts',
          formatType: formatStatType.NO_FORMAT,
        },
        {
          value: castEffic.efficiency!,
          valueDesignator: 'time on cd',
          formatType: formatStatType.TO_PERCENT,
        },
      ],
    });
  }

  return stats;
}

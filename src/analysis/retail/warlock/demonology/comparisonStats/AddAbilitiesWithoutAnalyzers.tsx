import { useAnalyzer } from 'interface/guide';
import Combatant from 'parser/core/Combatant';
import CastEfficiency from 'parser/shared/modules/CastEfficiency';
import { ComparisonStat, formatStatType } from './comparisonStatsInterface';
import TALENTS from 'common/TALENTS/warlock';

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
          valueDesignator: 'efficiency',
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
      sort: 2,
      stats: [
        {
          value: castEffic.casts,
          valueDesignator: 'casts',
          formatType: formatStatType.NO_FORMAT,
        },
        {
          value: castEffic.efficiency!,
          valueDesignator: 'efficiency',
          formatType: formatStatType.TO_PERCENT,
        },
      ],
    });
  }

  return stats;
}

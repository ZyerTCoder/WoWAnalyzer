import CombatLogParser from './CombatLogParser';
import { GuideProps, Section, useAnalyzer } from 'interface/guide';
import {
  ComparisonStat,
  instanceOfComparisonStat,
  formatStatType,
  getFormattedStat,
} from './comparisonStats/comparisonStatsInterface';
import { Icon } from 'interface';
import CastEfficiency from 'parser/shared/modules/CastEfficiency';
import TALENTS from 'common/TALENTS/warlock';
import Combatant from 'parser/core/Combatant';

const tempTopValues: { [key: string]: number } = {
  'Summon Demonic Tyrant casts': 4,
  'Summon Demonic Tyrant demons': 14,
  'Call Dreadstalkers% efficiency': 0.5,
  'Call Dreadstalkers missed casts': 3,
  'Bilescourge Bombers% efficiency': 0.65,
  'Bilescourge Bombers casts': 10,
  'Doom Brand explosions': 41,
  'Doom Brand% uptime': 91,
  'Doomfiend summons': 8,
  'Doomfiend bolts/volley': 1.5,
};

function TempAddExtraAbilities(stats: ComparisonStat[], combatant: Combatant) {
  let castEffic = useAnalyzer(CastEfficiency)!.getCastEfficiencyForSpell(
    TALENTS.CALL_DREADSTALKERS_TALENT,
  )!;
  if (combatant.hasTalent(TALENTS.CALL_DREADSTALKERS_TALENT)) {
    stats.push({
      icon: TALENTS.CALL_DREADSTALKERS_TALENT.icon,
      name: TALENTS.CALL_DREADSTALKERS_TALENT.name,
      sort: 2,
      first: {
        value: castEffic.casts,
        valueDesignator: ' casts',
        formatType: formatStatType.NO_FORMAT,
      },
      second: {
        value: castEffic.maxCasts - castEffic.casts,
        valueDesignator: ' missed casts',
        formatType: formatStatType.NO_FORMAT,
      },
    });
    stats.push({
      icon: TALENTS.CALL_DREADSTALKERS_TALENT.icon,
      name: TALENTS.CALL_DREADSTALKERS_TALENT.name,
      sort: 2,
      first: {
        value: castEffic.efficiency!,
        valueDesignator: '% efficiency',
        formatType: formatStatType.TO_PERCENT,
      },
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
      first: {
        value: castEffic.casts,
        valueDesignator: ' casts',
        formatType: formatStatType.NO_FORMAT,
      },
      second: {
        value: castEffic.efficiency!,
        valueDesignator: '% efficiency',
        formatType: formatStatType.TO_PERCENT,
      },
    });
  }

  return stats;
}

function entries(stats: ComparisonStat[]) {
  return stats.map((stat) => {
    let firstPerfPercent = 0;
    let firstPerfColor = '#70b570';
    if (stat.first.top !== undefined) {
      const under = stat.first.value <= stat.first.top;
      under
        ? (firstPerfPercent = 1 - stat.first.value / stat.first.top)
        : (firstPerfPercent = 1 - stat.first.top / stat.first.value);
      firstPerfPercent > 0.2 ? (firstPerfColor = '#ff8000') : (firstPerfColor = '#70b570');
    }
    let secondPerfPercent = 0;
    let secondPerfColor = '#70b570';
    if (stat.second && stat.second.top !== undefined) {
      const under = stat.second.value < stat.second.top;
      under
        ? (secondPerfPercent = 1 - stat.second.value / stat.second.top)
        : (secondPerfPercent = 1 - stat.second.top / stat.second.value);
      secondPerfPercent > 0.2 ? (secondPerfColor = '#ff8000') : (secondPerfColor = '#70b570');
    }

    return (
      <tr key={stat.name}>
        <td style={{ width: '25px' }}>
          <Icon icon={stat.icon}></Icon>
        </td>
        <td style={{ width: '20%' }}>{stat.name}</td>
        <td style={{ width: '12%' }}>{getFormattedStat(stat.first)}</td>
        <td style={{ width: '12%' }}>{stat.second && getFormattedStat(stat.second)}</td>
        {stat.first.top === undefined ? (
          <>
            <td colSpan={2}>No top performer data</td>
          </>
        ) : (
          <>
            <td style={{ width: '12%' }}>
              <div className="flex performance-bar-container">
                <div
                  className="flex-sub performance-bar"
                  style={{
                    width: `${firstPerfPercent * 100}%`,
                    backgroundColor: firstPerfColor,
                  }}
                />
              </div>
            </td>
            <td>
              {getFormattedStat({
                value: stat.first.top,
                valueDesignator: stat.first.valueDesignator,
                formatType: stat.first.formatType,
              })}
            </td>
          </>
        )}
        {!stat.second ? (
          <>
            <td />
            <td />
          </>
        ) : stat.second.top === undefined ? (
          <>
            <td colSpan={2}>No top performer data</td>
          </>
        ) : (
          <>
            <td style={{ width: '12%' }}>
              <div className="flex performance-bar-container">
                <div
                  className="flex-sub performance-bar"
                  style={{
                    width: `${secondPerfPercent * 100}%`,
                    backgroundColor: secondPerfColor,
                  }}
                />
              </div>
            </td>
            <td>
              {getFormattedStat({
                value: stat.second.top,
                valueDesignator: stat.second.valueDesignator,
                formatType: stat.second.formatType,
              })}
            </td>
          </>
        )}
      </tr>
    );
  });
}

function ComparisonStatsTable({ modules, events, info }: GuideProps<typeof CombatLogParser>) {
  let stats: ComparisonStat[] = [];
  Object.values(modules).forEach((module) => {
    if (instanceOfComparisonStat(module)) {
      stats = stats.concat(module.comparisonStat);
    }
  });

  stats = TempAddExtraAbilities(stats, info.combatant);

  stats.sort((a, b) => a.sort - b.sort);
  stats.forEach((stat) => {
    stat.first.top = tempTopValues[stat.name + stat.first.valueDesignator];
    stat.second && (stat.second.top = tempTopValues[stat.name + stat.second.valueDesignator]);
  });

  return (
    <Section title="Test">
      <div>
        <div style={{ padding: '1em' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil perferendis nemo ad facilis
          quae animi deserunt laborum, obcaecati repellendus, consequuntur illo sed quia quidem
          consectetur veniam laboriosam! Saepe, doloribus quas?
        </div>
        <table className="data-table" style={{ marginTop: 10, marginBottom: 10 }}>
          <tbody>
            <tr>
              <th style={{ width: '25px' }} />
              <th style={{ width: '15%' }}>Statistic</th>
              <th colSpan={2}>Your performance</th>
              <th colSpan={4}>Average top performance</th>
            </tr>
            {entries(stats)}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      {getStatsString(stats)}
    </Section>
  );
}

function getStatsString(stats: ComparisonStat[]) {
  const out: (string | number)[][] = [];
  stats.forEach((stat) => out.push([stat.name + stat.first.valueDesignator, stat.first.value]));
  stats.forEach(
    (stat) => stat.second && out.push([stat.name + stat.second.valueDesignator, stat.second.value]),
  );
  console.error(out);
  return JSON.stringify(out);
}

export default ComparisonStatsTable;

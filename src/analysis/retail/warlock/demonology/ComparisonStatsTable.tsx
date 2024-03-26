import CombatLogParser from './CombatLogParser';
import { GuideProps, Section, useAnalyzer } from 'interface/guide';
import {
  ComparisonStat,
  instanceOfComparisonStat,
} from './comparisonStats/comparisonStatsInterface';
import { Icon } from 'interface';
import CastEfficiency from 'parser/shared/modules/CastEfficiency';
import TALENTS from 'common/TALENTS/warlock';
import Combatant from 'parser/core/Combatant';

const tempTopValues: { [key: string]: number } = {
  'Summon Demonic Tyrantcasts': 4,
  'Summon Demonic Tyrantdemons empowered': 14,
  'Call Dreadstalkers efficiency': 50,
  'Bilescourge Bombers efficiency': 65,
  'Bilescourge Bombers casts': 10,
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
        name: ' casts',
        value: castEffic.casts,
        valueDesignator: ' casts',
      },
      second: {
        name: ' efficiency',
        value: Number((castEffic.efficiency! * 100).toFixed(0)),
        valueDesignator: '% efficiency',
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
        name: ' casts',
        value: castEffic.casts,
        valueDesignator: ' casts',
      },
      second: {
        name: ' efficiency',
        value: Number((castEffic.efficiency! * 100).toFixed(0)),
        valueDesignator: '% efficiency',
      },
    });
  }

  return stats;
}

function entries(stats: ComparisonStat[]) {
  return stats.map((stat) => {
    let firstPerfPercent = 0;
    let firstPerfColor = '#70b570';
    if (stat.first.top) {
      const under = stat.first.value < stat.first.top;
      under
        ? (firstPerfPercent = stat.first.value / stat.first.top)
        : (firstPerfPercent = stat.first.top / stat.first.value);
      firstPerfPercent < 0.8 ? (firstPerfColor = '#ff8000') : (firstPerfColor = '#70b570');
    }
    let secondPerfPercent = 0;
    let secondPerfColor = '#70b570';
    if (stat.second.top) {
      const under = stat.second.value < stat.second.top;
      under
        ? (secondPerfPercent = stat.second.value / stat.second.top)
        : (secondPerfPercent = stat.second.top / stat.second.value);
      secondPerfPercent < 0.8 ? (secondPerfColor = '#ff8000') : (secondPerfColor = '#70b570');
    }

    return (
      <tr key={stat.name}>
        <td style={{ width: '25px' }}>
          <Icon icon={stat.icon}></Icon>
        </td>
        <td style={{ width: '20%' }}>{stat.name}</td>
        <td style={{ width: '8%' }}>
          {stat.first.value}
          {stat.first.valueDesignator}
        </td>
        <td style={{ width: '10%' }}>
          {stat.second.value}
          {stat.second.valueDesignator}
        </td>
        {!stat.first.top ? (
          <>
            <td>No top performer data</td>
            <td />
          </>
        ) : (
          <>
            <td style={{ width: '20%' }}>
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
              {stat.first.top}
              {stat.first.valueDesignator}
            </td>
          </>
        )}
        {!stat.second.top ? (
          <>
            <td>No top performer data</td>
            <td />
          </>
        ) : (
          <>
            <td style={{ width: '20%' }}>
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
              {stat.second.top}
              {stat.second.valueDesignator}
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
    stat.first.top = tempTopValues[stat.name + stat.first.name];
    stat.second.top = tempTopValues[stat.name + stat.second.name];
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
  stats.forEach((stat) => out.push([stat.name + stat.first.name, stat.first.value]));
  stats.forEach((stat) => out.push([stat.name + stat.second.name, stat.second.value]));
  console.error(out);
  return JSON.stringify(out);
}

export default ComparisonStatsTable;

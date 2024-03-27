import CombatLogParser from '../CombatLogParser';
import { GuideProps, Section } from 'interface/guide';
import {
  ComparisonStat,
  instanceOfComparisonStat,
  getFormattedStat,
  SubStat,
} from './comparisonStatsInterface';
import { Icon } from 'interface';
import { AddAbilitiesWithoutAnalyzers } from './AddAbilitiesWithoutAnalyzers';

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

function getTopPerformer(subStat: SubStat) {
  if (subStat.top === undefined) {
    return <td colSpan={2}>No top performer data</td>;
  } else {
    let perfPercent = 0;
    let perfColor = '#70b570';
    if (subStat.top !== undefined) {
      const under = subStat.value <= subStat.top;
      under
        ? (perfPercent = 1 - subStat.value / subStat.top)
        : (perfPercent = 1 - subStat.top / subStat.value);
      perfPercent > 0.2 ? (perfColor = '#ff8000') : (perfColor = '#70b570');
    }
    return (
      <>
        <td style={{ width: '12%' }}>
          <div className="flex performance-bar-container">
            <div
              className="flex-sub performance-bar"
              style={{
                width: `${perfPercent * 100}%`,
                backgroundColor: perfColor,
              }}
            />
          </div>
        </td>
        <td>
          {getFormattedStat({
            value: subStat.top,
            valueDesignator: subStat.valueDesignator,
            formatType: subStat.formatType,
          })}
        </td>
      </>
    );
  }
}

function entries(stats: ComparisonStat[]) {
  return stats.map((stat) => (
    <tr key={stat.name}>
      <td style={{ width: '25px' }}>
        <Icon icon={stat.icon}></Icon>
      </td>
      <td style={{ width: '20%' }}>{stat.name}</td>
      <td style={{ width: '12%' }}>{getFormattedStat(stat.first)}</td>
      <td style={{ width: '12%' }}>{stat.second && getFormattedStat(stat.second)}</td>
      {getTopPerformer(stat.first)}
      {stat.second ? getTopPerformer(stat.second) : <td colSpan={2}></td>}
    </tr>
  ));
}

function addTopValues(stats: ComparisonStat[]): ComparisonStat[] {
  stats.forEach((stat) => {
    stat.first.top = tempTopValues[stat.name + stat.first.valueDesignator];
    stat.second && (stat.second.top = tempTopValues[stat.name + stat.second.valueDesignator]);
  });
  return stats;
}

function ComparisonStatsTable({ modules, events, info }: GuideProps<typeof CombatLogParser>) {
  let stats: ComparisonStat[] = [];
  Object.values(modules).forEach((module) => {
    if (instanceOfComparisonStat(module)) {
      stats = stats.concat(module.comparisonStat);
    }
  });

  stats = AddAbilitiesWithoutAnalyzers(stats, info.combatant);
  stats = addTopValues(stats);

  stats.sort((a, b) => {
    if (a.sort !== b.sort || a.name === b.name) {
      return a.sort - b.sort;
    } else {
      return a.name < b.name ? -1 : 1;
    }
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
      {tempGetStatsString(stats)}
    </Section>
  );
}

function tempGetStatsString(stats: ComparisonStat[]) {
  const out: (string | number)[][] = [];
  stats.forEach((stat) => out.push([stat.name + stat.first.valueDesignator, stat.first.value]));
  stats.forEach(
    (stat) => stat.second && out.push([stat.name + stat.second.valueDesignator, stat.second.value]),
  );
  console.error(out);
  return JSON.stringify(out);
}

export default ComparisonStatsTable;

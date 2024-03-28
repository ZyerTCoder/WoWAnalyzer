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
    }
    perfPercent < 0.2
      ? (perfColor = '#70b570')
      : perfPercent < 0.4
      ? (perfColor = '#ff8000')
      : (perfColor = '#d00833');
    perfPercent > 0.5 ? (perfPercent = 1) : (perfPercent *= 2);

    return (
      <>
        <td style={{ width: '15%' }}>
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
    <>
      <tr key={stat.name + stat.sort + stat.stats[0].valueDesignator}>
        <td style={{ width: '25px' }}>
          <Icon icon={stat.icon}></Icon>
        </td>
        <td style={{ width: '25%' }}>{stat.name}</td>
        <td style={{ width: '20%' }}>{getFormattedStat(stat.stats[0])}</td>
        {getTopPerformer(stat.stats[0])}
      </tr>
      {stat.stats.length > 1 &&
        stat.stats.slice(1).map((subStat) => (
          <tr key={stat.name + stat.sort + subStat.valueDesignator}>
            <td style={{ width: '25px' }} />
            <td style={{ width: '25%' }} />
            <td style={{ width: '20%' }}>{getFormattedStat(subStat)}</td>
            {getTopPerformer(subStat)}
          </tr>
        ))}
    </>
  ));
}

function addTopValues(stats: ComparisonStat[]): ComparisonStat[] {
  stats.forEach((stat) => {
    stat.stats.forEach((substat) => {
      substat.top = tempTopValues[stat.name + substat.valueDesignator];
    });
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
              <th />
              <th>Statistic</th>
              <th>Your performance</th>
              <th colSpan={2}>Average top performance</th>
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
  const out: { [key: string]: number } = {};
  stats.forEach((stat) =>
    stat.stats.forEach((subStat) => (out[stat.name + subStat.valueDesignator] = subStat.value)),
  );
  return 'const tempTopValues: { [key: string]: number } = ' + JSON.stringify(out);
}

export default ComparisonStatsTable;

const tempTopValues: { [key: string]: number } = {
  Downtimedowntime: 0.22411087485684644,
  'Summon Demonic Tyrantcasts': 4,
  'Summon Demonic Tyrantdemons': 14,
  'Call Dreadstalkerscasts': 17,
  'Call Dreadstalkersmissed casts': 4,
  'Call Dreadstalkerstime on cd': 0.7754893964110929,
  'Grimoire: Felguardcasts': 4,
  'Grimoire: Felguardtime on cd': 0.9380777596519848,
  'Power Siphoncasts': 11,
  'Power Siphontime on cd': 0.754249404661454,
  'Doom Brandexplosions': 36,
  'Doom Branduptime': 0.695467926721794,
  'Doom Brandhits/brand': 3.3333333333333335,
  'Doom Brandhits': 120,
  Doomfiendsummons: 7,
  'Doomfiendtargets/volley': 1.8666666666666667,
  'Bilescourge Bomberscasts': 9,
  'Bilescourge Bomberstime on cd': 0.5732500796909865,
  Guillotinecasts: 7,
  'Guillotinetime on cd': 0.7013392773433837,
  'Doom Branddmg/brand': 274772.05555555556,
  'Doom Branddps': 23184.906527160565,
  'Doomfienddmg/doomfiend': 848463.5714285715,
  Doomfienddps: 13920.714500009375,
};

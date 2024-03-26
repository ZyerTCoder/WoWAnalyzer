import CombatLogParser from './CombatLogParser';
import { GuideProps, Section, useAnalyzer } from 'interface/guide';
import {
  ComparisonStat,
  instanceOfComparisonStat,
} from './comparisonStats/comparisonStatsInterface';
import { Icon } from 'interface';
import CastEfficiency from 'parser/shared/modules/CastEfficiency';
import TALENTS from 'common/TALENTS/warlock';

const tempTopValues: { [key: string]: number } = {
  'Total Tyrant Casts': 4,
  'Total Demons Empowered': 14,
  'Call Dreadstalkers efficiency': 50,
};

function TempAddExtraAbilities(stats: ComparisonStat[]) {
  const castEffic = useAnalyzer(CastEfficiency)!.getCastEfficiencyForSpell(
    TALENTS.CALL_DREADSTALKERS_TALENT,
  )!;

  stats.push({
    icon: TALENTS.CALL_DREADSTALKERS_TALENT.icon,
    name: TALENTS.CALL_DREADSTALKERS_TALENT.name + ' casts',
    value: castEffic.casts,
    valueDesignator: ' casts',
    sort: 2,
  });
  stats.push({
    icon: TALENTS.CALL_DREADSTALKERS_TALENT.icon,
    name: TALENTS.CALL_DREADSTALKERS_TALENT.name + ' efficiency',
    value: Number((castEffic.efficiency! * 100).toFixed(0)),
    valueDesignator: '%',
    sort: 2,
  });

  return stats;
}

function entries(stats: ComparisonStat[]) {
  return stats.map((stat) => {
    let perfPercent = 0;
    let perfColor = '#70b570';
    if (stat.top) {
      const under = stat.value < stat.top;
      under ? (perfPercent = stat.value / stat.top) : (perfPercent = stat.top / stat.value);
      perfPercent < 0.8 ? (perfColor = '#ff8000') : (perfColor = '#70b570');
    }

    return (
      <tr key={stat.name}>
        <td style={{ width: '25px' }}>
          <Icon icon={stat.icon}></Icon>
        </td>
        <td style={{ width: '20%' }}>{stat.name}</td>
        <td style={{ width: '20%' }}>
          {stat.value}
          {stat.valueDesignator}
        </td>
        {!stat.top ? (
          <>
            <td>No top performer data available</td>
            <td />
          </>
        ) : (
          <>
            <td style={{ width: '20%' }}>
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
              {stat.top}
              {stat.valueDesignator}
            </td>
          </>
        )}
      </tr>
    );
  });
}

function ComparisonStatsTable({ modules }: GuideProps<typeof CombatLogParser>) {
  let stats: ComparisonStat[] = [];
  Object.values(modules).forEach((module) => {
    if (instanceOfComparisonStat(module)) {
      stats = stats.concat(module.comparisonStat);
    }
  });

  stats = TempAddExtraAbilities(stats);

  stats.sort((a, b) => a.sort - b.sort);
  stats.forEach((stat) => {
    stat.top = tempTopValues[stat.name];
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
              <th style={{ width: '20%' }}>Statistic</th>
              <th style={{ width: '20%' }}>Your performance</th>
              <th>Average top performance</th>
            </tr>
            {entries(stats)}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      {JSON.stringify(stats.map((stat) => [stat.name, stat.value]))}
    </Section>
  );
}

export default ComparisonStatsTable;

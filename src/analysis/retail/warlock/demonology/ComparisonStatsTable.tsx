import CombatLogParser from './CombatLogParser';
import { GuideProps, Section } from 'interface/guide';
import {
  ComparisonStat,
  instanceOfComparisonStat,
} from './comparisonStats/comparisonStatsInterface';
import { Icon } from 'interface';

const tempTopValues: { [key: string]: number } = {
  'Total Tyrant Casts': 4,
  'Total Demons Empowered': 14,
};

function entries(stats: ComparisonStat[]) {
  return stats.map((stat) => {
    return (
      <tr key={stat.name}>
        <td style={{ width: '25px' }}>
          <Icon icon={stat.icon}></Icon>
        </td>
        <td style={{ width: '20%' }}>{stat.name}</td>
        <td style={{ width: '20%' }}>
          {stat.value} {stat.valueDesignator}
        </td>
        <td style={{ width: '20%' }}>
          <div className="flex performance-bar-container">
            <div
              className="flex-sub performance-bar"
              style={{
                width: `${(stat.value / stat.top!) * 100}%`,
                backgroundColor: '#70b570',
              }}
            />
          </div>
        </td>
        <td>
          {stat.top} {stat.valueDesignator}
        </td>
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
  stats.sort((a, b) => a.relevance - b.relevance);
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
      {JSON.stringify(stats)}
    </Section>
  );
}

export default ComparisonStatsTable;

import CombatLogParser from './CombatLogParser';
import { GuideProps, Section } from 'interface/guide';
import {
  ComparisonStat,
  instanceOfComparisonStat,
} from './comparisonStats/comparisonStatsInterface';

function entries(stats: ComparisonStat[]) {
  return stats.map((stat) => (
    <tr key={stat.name}>
      <td>{stat.name}</td>
      <td>
        {stat.value} {stat.valueDesignator}
      </td>
      <td>top</td>
    </tr>
  ));
}

function ComparisonStatsTable({ modules }: GuideProps<typeof CombatLogParser>) {
  let stats: ComparisonStat[] = [];
  Object.values(modules).forEach((module) => {
    if (instanceOfComparisonStat(module)) {
      stats = stats.concat(module.comparisonStat);
    }
  });
  stats.sort((a, b) => a.relevance - b.relevance);

  return (
    <Section title="Test">
      <div style={{ marginTop: -10, marginBottom: -10 }}>
        <div style={{ padding: '1em' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil perferendis nemo ad facilis
          quae animi deserunt laborum, obcaecati repellendus, consequuntur illo sed quia quidem
          consectetur veniam laboriosam! Saepe, doloribus quas?
        </div>
        <table className="data-table" style={{ marginTop: 10, marginBottom: 10 }}>
          <tbody>
            <tr>
              <th>Statistic</th>
              <th>Your performance</th>
              <th>Top performance</th>
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

import { GuideProps, Section, SubSection } from 'interface/guide';
import CombatLogParser from '../../CombatLogParser';
import ResourceTracker from 'parser/shared/modules/resources/resourcetracker/ResourceTracker';

function ResourceUsage({ modules }: GuideProps<typeof CombatLogParser>) {
  return (
    <Section title="Resource Use">
      <SubSection title="Soul Shards">
        <>
          These are your primary spending resource as a Warlock. Instead of spells having cooldowns,
          you'll be gated by the amount of Soul Shards you have available. Outside of combat you
          passively regenerate up to 3 shards.
          {modules.soulshardGraph.plot}
        </>
      </SubSection>
      <SubSection>
        {console.error(modules.soulShardTracker.buildersObj)}
        <table>
          <tbody>{getWastedShards(modules.soulShardTracker)}</tbody>
        </table>
      </SubSection>
    </Section>
  );
}

function getWastedShards(tracker: ResourceTracker) {
  const builders = tracker.buildersObj;
  return Object.keys(builders)
    .filter((key) => builders[Number(key)].wasted > 0)
    .map((key) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{builders[Number(key)].wasted} shards wasted</td>
      </tr>
    ));
}

export default ResourceUsage;

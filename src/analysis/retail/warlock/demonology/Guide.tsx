import { GuideProps, Section } from 'interface/guide';
import CombatLogParser from './CombatLogParser';
import PreparationSection from 'interface/guide/components/Preparation/PreparationSection';
import CooldownSubsection from './modules/guide/CooldownsSubsection';
import ResourceUsage from './modules/guide/ResourceUsage';
import DefensivesGuide from '../shared/Defensives';
import {
  ComparisonStat,
  instanceOfComparisonStat,
} from './comparisonStats/comparisonStatsInterface';

export default function Guide({ modules, events, info }: GuideProps<typeof CombatLogParser>) {
  return (
    <>
      <TempStatsTest modules={modules} events={events} info={info} />
      <CooldownSection modules={modules} events={events} info={info} />
      <DefensivesGuide modules={modules} events={events} info={info} />
      <ResourceUsage modules={modules} events={events} info={info} />
      <PreparationSection />
    </>
  );
}

function CooldownSection({ modules }: GuideProps<typeof CombatLogParser>) {
  return (
    <Section title="Cooldowns">
      <CooldownSubsection />
      {modules.summonDemonicTyrant.guideSubsection}
    </Section>
  );
}

function TempStatsTest({ modules }: GuideProps<typeof CombatLogParser>) {
  let stats: ComparisonStat[] = [];
  console.error(typeof modules);
  Object.values(modules).forEach((module) => {
    if (instanceOfComparisonStat(module)) {
      console.error('found a module with comparison stat', module);
      stats = stats.concat(module.comparisonStat);
    }
  });
  return <Section title="Test">{JSON.stringify(stats)}</Section>;
}

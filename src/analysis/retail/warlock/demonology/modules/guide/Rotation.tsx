import { GuideProps, Section } from 'interface/guide';
import CombatLogParser from '../../CombatLogParser';
import { AplSectionData } from 'interface/guide/components/Apl';
import * as AplCheck from '../AplCheck/AplCheck';

export function Rotation({ modules, info }: GuideProps<typeof CombatLogParser>) {
  return (
    <Section title="Rotation (WIP)">
      <AplSectionData checker={AplCheck.check} apl={AplCheck.apl(info)} />
    </Section>
  );
}

export default Rotation;

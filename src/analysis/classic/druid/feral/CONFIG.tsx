import { Amelydia } from 'CONTRIBUTORS';
import GameBranch from 'game/GameBranch';
import SPECS from 'game/SPECS';
import type Config from 'parser/Config';
import CHANGELOG from './CHANGELOG';
import AlertWarning from 'interface/AlertWarning';
import { SupportLevel } from 'parser/Config';

const config: Config = {
  // The people that have contributed to this spec recently. People don't have to sign up to be long-time maintainers to be included in this list. If someone built a large part of the spec or contributed something recently to that spec, they can be added to the contributors list. If someone goes MIA, they may be removed after major changes or during a new expansion.
  contributors: [Amelydia],
  branch: GameBranch.Classic,
  // The WoW client patch this spec was last updated.
  patchCompatibility: null,
  // Update to false when the spec is mostly complete (and safe to use)
  supportLevel: SupportLevel.Unmaintained,
  // Explain the status of this spec's analysis here. Try to mention how complete it is, and perhaps show links to places users can learn more.
  // If this spec's analysis does not show a complete picture please mention this in the `<Warning>` component.
  description: (
    <>
      Welcome! Thanks for checking out WoWAnalyzer. This guide is seeking a maintainer.
      <br />
      See the public GitHub repo or join our community Discord for information about contributing.
      Thanks!
    </>
  ),
  pages: {
    overview: {
      notes: (
        <AlertWarning>
          Classic Cataclysm support is still a Work in Progress. This spec guide is a stub. See the
          "About" tab for information on contributing.
        </AlertWarning>
      ),
    },
  },
  // A recent example report to see interesting parts of the spec. Will be shown on the homepage.
  exampleReport: 'report/P32g6L4BmatZhHNX/12-Normal+Lord+Jaraxxus+-+Kill+(3:31)/Amelydia',
  // Add spells to display separately on the timeline
  timeline: {
    separateCastBars: [[]],
  },
  // The current spec identifier. This is the only place (in code) that specifies which spec this parser is about.
  spec: SPECS.CLASSIC_DRUID_FERAL_COMBAT, // UPDATE THIS

  // USE CAUTION when changing anything below this line.
  // The contents of your changelog.
  changelog: CHANGELOG,
  // The CombatLogParser class for your spec.
  parser: () =>
    // Update ClassicMeleeSpec -> Example: ClassicUnholyDeathknight
    import('./CombatLogParser' /* webpackChunkName: "ClassicFeralDruidSpec" */).then(
      (exports) => exports.default,
    ),
  // The path to the current directory (relative form project root). This is used for generating a GitHub link directly to your spec's code.
  path: import.meta.url,
};

export default config;

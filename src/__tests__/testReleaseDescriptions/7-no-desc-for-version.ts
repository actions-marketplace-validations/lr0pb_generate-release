import { TestReleaseNotes } from "./types";

const version = '2.39.0';

export default {
  version,
  title: '# v2.30.0 (12-04-2024)\n\n' +
  '## New Changes List\n' +
  '- 🚀 rocket feature\n' +
  '- some feature\n\n' +
  `## v${version} (12-03-2023)\n`,

  description: '\n\n\n',

  nextVersion: '# v2.38.0 (12-02-2022)\n' +
  '### Old Changes\n' +
  '- 🤔 feature\n' +
  '- add feature\n'
} as TestReleaseNotes;

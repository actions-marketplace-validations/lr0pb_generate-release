import { TestReleaseNotes } from "./types";

const version = '2.39.10';

export default {
  version,
  title: `## Version [${version}](/link/to/source.tar.gz) 12-03-2023\n\n`,

  description: '## New Changes List\n' +
  '- 🐻‍❄️ amazing feature\n' +
  '- other feature',

  nextVersion: '\n## v2.38.0 (12-02-2022)\n' +
  '### Old Changes\n' +
  '- 🤔 feature\n' +
  '- add feature\n'
} as TestReleaseNotes;

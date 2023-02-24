import { TestReleaseNotes } from "./types";

const version = '1.0.5';

export default {
  version,
  title: `# v${version}\n`,

  description: '## Breacking changes\n' +
  '- remove feature\n' +
  '- add feature',

  nextVersion: '\n'
} as TestReleaseNotes;

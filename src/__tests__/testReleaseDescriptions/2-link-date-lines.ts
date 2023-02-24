import { TestReleaseNotes } from "./types";

const version = '2.39.10';

export default {
  version,
  title: `## Version [${version}](/link/to/source${version}.tar.gz) 12-03-2023\n\n`,

  description: '# Breacking changes\n' +
  '- remove feature\n' +
  '- add feature',

  nextVersion: '\n'
} as TestReleaseNotes;

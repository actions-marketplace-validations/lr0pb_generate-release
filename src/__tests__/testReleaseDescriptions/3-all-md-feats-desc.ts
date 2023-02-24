import { TestReleaseNotes } from "./types";

const version = '12.4.10';

export const allMdFeatsDesc = '## Breacking changes\n' +
'### Features\n' +
'- remove feature\n' +
'- add feature\n\n' +
'> note: this is in beta\n\n' +
'### Bug fixes\n\n' +
'* fix #23 by [@name](htpps://site.com/name)\n' +
'* fix #34 by [@name](htpps://site.com/name)\n\n' +
'## Big title\n\n' +
'| # | Name | Description | \n' +
'| --- | --- | --- |\n' +
'| 1 | Features | Long desc<br />in 2 lines| \n\n' +
'# Biggest title about #45\n' +
'1. ordered list item\n' +
'1. ordered list item\n\n' +
`Just "plain" text: because all this formatting is awesome, but it ain't no live wo/ simple strings!\n` +
`Or we actually can? \`no way\`\n` +
'[![Alt text](/link/to/image.png)](/link/to/action/) [`[Text]`](/link)';

export default {
  version,
  title: `## Version [${version}](/link/to/source.tar.gz) 12-03-2023\n\n`,
  description: allMdFeatsDesc,
  nextVersion: '\n'
} as TestReleaseNotes;

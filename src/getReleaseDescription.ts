import * as fs from 'fs';
import * as path from 'path';
import { vars } from './constants';

export const defaultDescription = 'No description 💭';

export function getReleaseDescription(
  version: string, changelogPath: string
): string {
  const changelog = fs.readFileSync(
    path.join(vars.basePath, changelogPath), 'utf8'
  );

  const findDesc = (descEndRegex: string) => {
    const regex = new RegExp(
      //(${descEndRegex})
      `^#+\\s.*${version}.*?\\n+((.*\\n)*)(${descEndRegex})`, 'gm'
    );
    return regex.exec(changelog);
  };

  const nextVersion = `#+\\s.*${vars.versionRegex}`; // means next version in file
  const endOfFile = `[\r\n]?$(?![\r\n])`;

  let description = findDesc(nextVersion);
  console.log(description);

  if (!description) {
    description = findDesc(endOfFile);
  }
  return description?.[1].replace(/\n*$/, '') || defaultDescription;
}

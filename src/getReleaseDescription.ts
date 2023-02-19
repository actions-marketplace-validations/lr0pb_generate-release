import * as fs from 'fs';
import * as path from 'path';
import { vars } from "./constants";

export function getReleaseDescription(
  version: string, changelogPath: string
): string {
  const defaultResp = 'No description 💭';
  const changelog = fs.readFileSync(
    path.join(vars.basePath, changelogPath), 'utf8'
  );
  const exec = (pattern: string | RegExp) => {
    const regex = new RegExp(pattern, 'gm');
    const resp = regex.exec(changelog);
    return resp ? resp[0] : undefined
  }

  const versionLine = exec(`^#+.*${version}.*?\\n`);
  if (!versionLine) {
    console.log('Cant find version description in Changelog file');
    return defaultResp;
  }
  const versionRegex = [
    '.', ',',
    '(', ')', '[', ']', '{', '}',
    '/', '+', '*', '=', '?', '^', '$'
  ]
  .reduce((str, symbol) => {
    if (!str.includes(symbol)) return str;
    const regex = new RegExp(`\\${symbol}`, 'gm');
    return str.replace(regex, `\\${symbol}`);
  }, versionLine);

  const nextVersion = `#+.*\\d+\\.\\d+\\.\\d+`;
	const endOfFile = `[\r\n]?$(?![\r\n])`;
  const descRegex = (end: string) => {
    return `(?<=${versionRegex})(.*\\n)*(?=${end})`;
  }
  let description = exec(descRegex(nextVersion));
  if (!description) {
    description = exec(descRegex(endOfFile))
  }
  if (!description) {
    console.log('No description text founded');
    return defaultResp;
  }
  return description.replace(/\n*$/, '');
}

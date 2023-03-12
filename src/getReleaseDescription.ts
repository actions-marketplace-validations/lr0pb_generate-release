import * as core from '@actions/core';
import { vars } from './constants';
import { getRepositoryFile } from './getRepositoryFile';

export const defaultDescription = 'No description 💭';

export async function getReleaseDescription(
  version: string
): Promise<string> {
  const changelogPath = core
    .getInput('notes-file', { required: false })
    .replace(/^\//, '');
  let changelog: string;
  try {
    changelog = await getRepositoryFile(changelogPath);
  } catch (error) {
    console.error(error);
    return defaultDescription;
  }

  const findDesc = (descEndRegex: string) => {
    const regex = new RegExp(
      `^#+\\s.*${version}.*?\\n+((.*\\n)*)(${descEndRegex})`, 'gm'
    );
    return regex.exec(changelog);
  };

  const nextVersion = `#+\\s.*${vars.versionRegex}`; // means next version in file
  const endOfFile = `[\r\n]?$(?![\r\n])`;

  let description = findDesc(nextVersion);

  if (!description) {
    description = findDesc(endOfFile);
  }
  return description?.[1].replace(/\n*$/, '') || defaultDescription;
}

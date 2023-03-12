import * as core from '@actions/core';
import { vars } from './constants';
import { getRepositoryFile } from './getRepositoryFile';

export async function getDescriptionText(
  version: string
): Promise<string> {
  const changelogPath = core
    .getInput('notes-file', { required: false })
    .replace(/^\//, '');
  const changelog = await getRepositoryFile(changelogPath);

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
  if (!description || description?.[1].match(/^\n*$/)) {
    throw new Error(`🔍 No description for ${version} found`);
  }
  return description?.[1].replace(/\n*$/, '');
}

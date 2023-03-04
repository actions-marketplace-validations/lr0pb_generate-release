import * as core from '@actions/core';

export function createTagName(
  version: string
): string {
  const pattern = core
    .getInput('tag-pattern', { required: false }) || 'v{major}.{minor}.{patch}';
  const versionParts = ['major', 'minor', 'patch'];
  let tag = pattern;
  version
    .split('.')
    .forEach((versionPartValue, i) => {
      tag = tag.replace(`{${versionParts[i]}}`, versionPartValue);
    });
  return tag;
};

import * as core from '@actions/core';
import { getOctokit } from '@actions/github';
import { octobase, vars } from './constants';
import { getReleaseDescription } from './getReleaseDescription';

export async function createRelease(
  version: string, changelogPath: string
): Promise<void> {
  try {
    const tag = `v${version}`;
    const body = getReleaseDescription(version, changelogPath);

    const octokit = getOctokit(vars.token);

    const { data: releaseData } = await octokit.rest.repos.createRelease({
      ...octobase,
      tag_name: tag,
      name: tag,
      body,
    });

    core.info(`Created release ${releaseData.name} 🏷️`);
  } catch (error) {
    core.setFailed(
      '📝 Set permission `contents: write` to allow Generate Release create releases'
    );
  }
}

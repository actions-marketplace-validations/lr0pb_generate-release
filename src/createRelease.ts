import * as core from '@actions/core';
import { getOctokit } from '@actions/github';
import { octobase, vars } from './constants';
import { createTagName } from './createTagName';
import { getReleaseNotes } from './getReleaseNotes';

export async function createRelease(
  version: string
): Promise<void> {
  const tag = createTagName(version);
  const {
    body,
    generate_release_notes,
  } = await getReleaseNotes(version);
  const octokit = getOctokit(vars.token);

  try {
    const { data: releaseData } = await octokit.rest.repos.createRelease({
      ...octobase,
      tag_name: tag,
      name: tag,
      body,
      generate_release_notes,
    });

    core.info(`🏷️ Created release tag ${releaseData.name}`);
  } catch (error) {
    console.error(error);
    core.setFailed(
      '📝 Set permission `contents: write` to allow Generate Release create releases'
    );
  }
}

import * as core from '@actions/core';
import { getOctokit } from '@actions/github';
import { octobase, vars } from './constants';
import { createTagName } from './createTagName';
import { getReleaseDescription } from './getReleaseDescription';

export async function createRelease(
  version: string
): Promise<void> {
  const notesSource = core.getInput('notes-source', { required: false });
  const tag = createTagName(version);
  const body = notesSource === 'changelog'
  ? getReleaseDescription(version) : undefined;

  const octokit = getOctokit(vars.token);
  try {
    const { data: releaseData } = await octokit.rest.repos.createRelease({
      ...octobase,
      tag_name: tag,
      name: tag,
      body,
      generate_release_notes: notesSource === 'auto',
    });

    core.info(`Created release ${releaseData.name} 🏷️`);
  } catch (error) {
    console.error(error);
    core.setFailed(
      '📝 Set permission `contents: write` to allow Generate Release create releases'
    );
  }
}

import * as core from '@actions/core';
import { context } from '@actions/github';
import { getChangedFiles } from './getChangedFiles';
import { getNewVersion } from './getNewVersion';
import { createRelease } from './createRelease';

async function run() {
  try {
    if (context.eventName !== 'push') {
      core.setFailed('Generate Release action can only run on push event');
      return;
    }
    if (!process.env.GITHUB_WORKSPACE) {
      core.setFailed('🤔 Generate Release cannot find directory with your repo');
      return;
    }

    const packagePath = core
      .getInput('package-path', { required: false })
      ?.replace(/^\//, '') || 'package.json';

    const changelogPath = core
      .getInput('changelog-path', { required: false })
      ?.replace(/^\//, '') || 'CHANGELOG.md';

    const changedFiles = await getChangedFiles(packagePath);
    console.log(changedFiles);
    if (changedFiles[packagePath]) {
      const newVersion = getNewVersion(changedFiles[packagePath]);
      console.log(`New version: ${newVersion}`);
      if (newVersion) {
        await createRelease(newVersion, changelogPath);
      }
    }

  } catch (error: any) {
    console.log(error);
    core.setFailed(error.message);
  }
}

run();

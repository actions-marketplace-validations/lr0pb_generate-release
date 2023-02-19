import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
// import * as fs from 'fs';
// import * as path from 'path';

interface ChangedFiles {
  fileName: string,
  patch?: string,
}

async function getAllChangedFiles(
  packagePath: string
): Promise<Record<string, ChangedFiles>> {
  const octokit = getOctokit(
    core.getInput('token', { required: true })
  );
  const { owner, repo } = context.repo;
  const { before, after } = context.payload;

  // Get the list of commits between the before and after commits
  const { data: commitsData } = await octokit.rest.repos.compareCommits({
    owner,
    repo,
    base: before,
    head: after,
  });

  // Iterate over each commit and get the list of changed files
  const changedFiles: Record<string, ChangedFiles> = {};
  for (const commit of commitsData.commits) {
    const { data: filesData } = await octokit.rest.repos.getCommit({
      owner,
      repo,
      ref: commit.sha,
    });
    if (Array.isArray(filesData.files)) {
      filesData.files.forEach((file) => {
        changedFiles[file.filename] = {
          fileName: file.filename,
          patch: file.filename === packagePath ? file.patch : undefined,
        };
      });
    }
  }

  // Return the list of all changed files in the push
  return changedFiles;
}

function getNewVersion(packageData: ChangedFiles): string | undefined {
  const patch = packageData.patch;
  if (!patch) return;
  const isVersionUpdated = patch.includes('version');
  console.log(`Is version updated: ${isVersionUpdated}`);
  if (!isVersionUpdated) return;
  const match = patch.match(/^\+.*"version": "(.*)",\n/);
  return match ? match[1] : undefined;
}

async function run() {
  try {
    if (context.eventName !== 'push') {
      core.setFailed('Generate Release action can only run on push event');
      return;
    }
    if (!process.env.GITHUB_WORKSPACE) {
      return;
    }
    const basePath = process.env.GITHUB_WORKSPACE as string;
    const packagePath = core
      .getInput('package-path', { required: false })
      ?.replace(/^\//, '') || 'package.json';

    // const diffUrl = `https://github.com/${context.repo.owner}/${context.repo.repo}/compare/${context.payload.before}...${context.payload.after}.diff`;

    // const { data: diffContent } = await getOctokit(core.getInput('token', { required: true })).request({
    //   method: 'GET',
    //   url: diffUrl,
    //   headers: { Accept: 'application/vnd.github.v3.diff' },
    // });
    // console.log(diffContent);
    const changedFiles = await getAllChangedFiles(packagePath);
    console.log(changedFiles);
    if (changedFiles[packagePath]) {
      const newVersion = getNewVersion(changedFiles[packagePath]);
      console.log(`New version: ${newVersion}`);
    }

  } catch (error: any) {
    console.log(error);
    core.setFailed(error.message);
  }
}

run();

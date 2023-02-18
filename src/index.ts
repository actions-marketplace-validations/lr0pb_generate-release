import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
import * as path from 'path';
import { PushEvent, Commit } from '@octokit/webhooks-definitions/schema';

const context = github.context;

function isPackageChanged(packagePath: string): boolean {
  const changedFiles: string[] = [];
  (context.payload as PushEvent)
    .commits
    .forEach((commit: Commit) => {
      console.log(commit);
      
      changedFiles.push(...commit.modified);
    });
  console.log(changedFiles);

  return changedFiles.includes(packagePath);
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
    const isChanged = isPackageChanged(packagePath);

    if (!isChanged) {
      console.log('No changes in package.json');
      return;
    }

    const packageJson = JSON.parse(
      fs.readFileSync(path.join(basePath, packagePath), 'utf8')
    );
    console.log(packageJson);
    

    const newVersion = packageJson.version;

    const diffUrl = `https://github.com/${context.repo.owner}/${context.repo.repo}/compare/${context.payload.before}...${context.payload.after}.diff`;

    const octokit = github.getOctokit(core.getInput('token', { required: true }));
    const diffContent = await octokit.request({
      method: 'GET',
      url: diffUrl
    });
    console.log(diffContent.data);

    if (isVersionChanged(diffContent.data, newVersion)) {
      console.log('Release happened!');
      //core.setOutput('newVersion', newVersion);
    } else {
      console.log('No changes to version in package.json. Skipping release.');
    }
  } catch (error: any) {
    console.log(error);
    core.setFailed(error.message);
  }
}

function isVersionChanged(diffContent: string, version: string) {
  return diffContent.includes(`"version": "${version}"`);
}

run();

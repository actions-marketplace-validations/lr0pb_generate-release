import { setOutput, setFailed } from '@actions/core';
import { context, rest } from '@actions/github';
import { readFileSync } from 'fs';
import { join } from 'path';

async function run() {
  try {
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath));

    const changedFiles = context.payload.head_commit.modified.filter(file => {
      return file === 'package.json';
    });

    if (changedFiles.length === 0) {
      console.log('No changes to package.json. Skipping release.');
      return;
    }

    const newVersion = packageJson.version;
    console.log(`New version: ${newVersion}`);

    const diffUrl = `https://github.com/${context.repo.owner}/${context.repo.repo}/compare/${context.payload.before}...${context.payload.after}.diff`;

    const diffContent = await rest.request({
      method: 'GET',
      url: diffUrl
    });

    if (isVersionChanged(diffContent.data, newVersion)) {
      console.log('Release happened!');
      setOutput("newVersion", newVersion);
    } else {
      console.log('No changes to version in package.json. Skipping release.');
    }
  } catch (error) {
    setFailed(error.message);
  }
}

function isVersionChanged(diffContent, version) {
  return diffContent.includes(`"version": "${version}"`);
}

run();

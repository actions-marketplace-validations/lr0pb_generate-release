import { getInput, setOutput, setFailed } from '@actions/core';
import { context, rest } from '@actions/github';
import { readFileSync } from 'fs';

function isPackageChanged(packagePath) {
  const changedFiles = context.payload.commits
    .reduce((files, commit) => {
      return files.concat(commit.modified);
    }, []);
  console.log(changedFiles);

  return changedFiles.includes(packagePath);
}

async function run() {
  try {
    const basePath = process.env.GITHUB_WORKSPACE;
    const packagePath = getInput('package-path').replace(/^\//, '');
    const isChanged = isPackageChanged(packagePath);

    if (!isChanged) {
      console.log('No changes in package.json');
      return;
    }

    const packageJson = JSON.parse(
      readFileSync(`${basePath}${packagePath}`, 'utf8')
    );

    const newVersion = packageJson.version;
    console.log(`New version: ${newVersion}`);

    const diffUrl = `https://github.com/${context.repo.owner}/${context.repo.repo}/compare/${context.payload.before}...${context.payload.after}.diff`;

    const diffContent = await rest.request({
      method: 'GET',
      url: diffUrl
    });
    console.log(diffContent);

    if (isVersionChanged(diffContent.data, newVersion)) {
      console.log('Release happened!');
      setOutput("newVersion", newVersion);
    } else {
      console.log('No changes to version in package.json. Skipping release.');
    }
  } catch (error) {
    console.log(error);
    setFailed(error.message);
  }
}

function isVersionChanged(diffContent, version) {
  return diffContent.includes(`"version": "${version}"`);
}

run();

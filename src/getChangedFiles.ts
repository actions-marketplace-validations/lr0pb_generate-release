import { context, getOctokit } from '@actions/github';
import { octobase, vars } from './constants';

export interface ChangedFile {
  fileName: string,
  patch?: string,
}

export async function getChangedFiles(
  packagePath: string
): Promise<Record<string, ChangedFile>> {
  const octokit = getOctokit(vars.token);
  const { before, after } = context.payload;

  // Get the list of commits between the before and after commits
  const { data: commitsData } = await octokit.rest.repos.compareCommitsWithBasehead({
    ...octobase,
    basehead: `${before}${after}`,
  });

  // Iterate over each commit and get the list of changed files
  const changedFiles: Record<string, ChangedFile> = {};
  for (const commit of commitsData.commits) {
    const { data: filesData } = await octokit.rest.repos.getCommit({
      ...octobase,
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

import { getOctokit } from '@actions/github';
import { octobase, vars } from './constants';

export async function getRepositoryFile(
  fileName: string
): Promise<string> {
  const octokit = getOctokit(vars.token);
  const { data } = await octokit.rest.repos.getContent({
    ...octobase,
    path: fileName,
    mediaType: {
      format: 'raw' // needed to read files up to 100MB size
    }
  });

  if (!!data) {
    return data as unknown as string;
  } else {
    throw new Error(`📖 Failed to read file: ${fileName}`);
  }
}

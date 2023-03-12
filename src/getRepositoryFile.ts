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
      format: 'raw'
    }
  });
  console.log(data);
  
  if ('content' in data) {
    const content = data.content;//Buffer.from(data.content, 'base64').toString('utf8');
    return content;
  } else {
    throw new Error(`📖 Failed to read file: ${fileName}`);
  }
}

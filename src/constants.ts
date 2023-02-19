// import * as core from '@actions/core';
import { context } from '@actions/github';

export const octobase = {
  owner: context.repo.owner,
  repo: context.repo.repo,
};

export const vars = {
  token: process.env.GITHUB_TOKEN as string,
  // core.getInput('token', { required: true }),
  basePath: process.env.GITHUB_WORKSPACE as string,
}

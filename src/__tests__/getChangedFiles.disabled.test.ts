import { jest, describe, it, expect, afterEach } from "@jest/globals";
import { getChangedFiles } from "../getChangedFiles";
// import { context, getOctokit } from '@actions/github';
// import { octobase, vars } from '../constants';
import * as core from '@actions/core';

jest.mock('@actions/core');
jest.spyOn(core, 'getInput').mockReturnValue('dummy_token');

// const mockContext = {
//   repo: {
//     owner: 'dummy_owner',
//     repo: 'dummy_repo',
//   },
//   payload: {
//     before: 'dummy_before_sha',
//     after: 'dummy_after_sha',
//   },
// };
// const mockGetOctokit = jest.fn<() => any>().mockReturnValue({
//   rest: {
//     repos: {
//       compareCommits: jest.fn<() => any>().mockResolvedValue({
//         data: {
//           commits: [
//             { sha: 'dummy_sha_1' },
//             { sha: 'dummy_sha_2' },
//           ],
//         },
//       }),
//       getCommit: jest.fn<() => any>().mockResolvedValue({
//         data: {
//           files: [
//             {
//               filename: 'dummy_file_1',
//               patch: 'dummy_patch_1',
//             },
//             {
//               filename: 'dummy_file_2',
//               patch: 'dummy_patch_2',
//             },
//           ],
//         },
//       }),
//     },
//   },
// });
jest.mock('../constants', () => ({
  octobase: {
    owner: 'dummy_owner',
    repo: 'dummy_repo',
  },
  vars: {
    token: 'dummy_token',
  },
}));
jest.mock('@actions/github', () => ({
  getOctokit: jest.fn<() => any>().mockReturnValue({
    rest: {
      repos: {
        compareCommits: jest.fn<() => any>().mockResolvedValue({
          data: {
            commits: [
              { sha: 'dummy_sha_1' },
              { sha: 'dummy_sha_2' },
            ],
          },
        }),
        getCommit: jest.fn<() => any>().mockResolvedValue({
          data: {
            files: [
              {
                filename: 'dummy_file_1',
                patch: 'dummy_patch_1',
              },
              {
                filename: 'dummy_file_2',
                patch: 'dummy_patch_2',
              },
            ],
          },
        }),
      },
    },
  }),
  context: {
    repo: {
      owner: 'dummy_owner',
      repo: 'dummy_repo',
    },
    payload: {
      before: 'dummy_before_sha',
      after: 'dummy_after_sha',
    },
  }
}));

describe('getChangedFiles', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a record of changed files', async () => {
    // setup
    const packagePath = 'dummy_package_path';

    // test
    const result = await getChangedFiles(packagePath);

    // assertions
    expect(result).toEqual({
      dummy_file_1: {
        fileName: 'dummy_file_1',
        patch: undefined,
      },
      dummy_file_2: {
        fileName: 'dummy_file_2',
        patch: undefined,
      },
    });
    // expect(mockGetOctokit).toHaveBeenCalledWith(vars.token);
    // expect(mockGetOctokit().rest.repos.compareCommits).toHaveBeenCalledWith({
    //   ...octobase,
    //   base: mockContext.payload.before,
    //   head: mockContext.payload.after,
    // });
    // expect(mockGetOctokit().rest.repos.getCommit).toHaveBeenCalledWith({
    //   ...octobase,
    //   ref: 'dummy_sha_1',
    // });
    // expect(mockGetOctokit().rest.repos.getCommit).toHaveBeenCalledWith({
    //   ...octobase,
    //   ref: 'dummy_sha_2',
    // });
  });
});

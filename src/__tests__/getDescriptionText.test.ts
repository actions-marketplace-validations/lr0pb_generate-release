import { jest, describe, it, expect } from '@jest/globals';
import fs from 'fs';
import { getDescriptionText } from '../getDescriptionText';
import { getRepositoryFile } from '../getRepositoryFile';
import { TestReleaseNotes } from './testReleaseDescriptions/types';

import notes1 from './testReleaseDescriptions/1-prefix-no-lines';
import notes2 from './testReleaseDescriptions/2-link-date-lines';
import notes3 from './testReleaseDescriptions/3-all-md-feats-desc';
import notes4 from './testReleaseDescriptions/4-prev-versions-same-heading';
import notes5 from './testReleaseDescriptions/5-around-other-versions-diff-headings';
import notes6 from './testReleaseDescriptions/6-no-version-found';
import notes7 from './testReleaseDescriptions/7-no-desc-for-version';

import react from './testReleaseDescriptions/react';
import capacitor from './testReleaseDescriptions/capacitor';

jest.mock('../constants', () => ({
  vars: {
    versionRegex: `\\d+\\.\\d+\\.\\d+`,
  },
}));

jest.mock('fs', () => ({
  promises: {
    access: jest.fn()
  }
}));

jest.mock('@actions/core', () => ({
  getInput: jest.fn().mockReturnValue('CHANGELOG.md')
}));

jest.mock('../getRepositoryFile', () => ({
  getRepositoryFile: jest.fn<typeof getRepositoryFile>()
}));

const getTestReleaseNotes = (notes: TestReleaseNotes) => {
  return `${notes.title}${notes.description}${notes.nextVersion || ''}`;
};

describe('getDescriptionText', () => {
  const tests = [{
    title: 'v-prefix w/ version, multiline desc, no lines between title and desc',
    note: notes1,
  }, {
    title: 'link around version, date in the title, lines between title and desc',
    note: notes2,
  }, {
    title: 'whole pack of markdown features used in desc',
    note: notes3,
  }, {
    title: 'changelog have previous versions, same heading',
    note: notes4,
  }, {
    title: 'changelog have previous versions, different headings',
    note: notes5,
  }, {
    title: 'version not exists in changelog',
    note: notes6,
    error: true,
  }, {
    title: 'no description text for version in changelog',
    note: notes7,
    error: true,
  }, {
    title: 'test on React 18.0.0 release notes',
    note: react
  }, {
    title: 'test on Capacitor 4.7.0 release notes',
    note: capacitor
  }] as {
    title: string,
    note: TestReleaseNotes,
    error?: boolean,
  }[];

  tests.forEach((test) => {
    it(test.title, async () => {
      (getRepositoryFile as jest.Mock<typeof getRepositoryFile>)
        .mockResolvedValueOnce(getTestReleaseNotes(test.note));
      await expect(getDescriptionText(test.note.version))
        [test.error ? 'rejects' : 'resolves']
        [test.error ? 'toBeDefined' : 'toBe']
        (test.error ? undefined : test.note.description);
    });
  });

  it('reject if no file founded at all', async () => {
    (getRepositoryFile as jest.Mock<typeof getRepositoryFile>)
        .mockRejectedValueOnce('No file founded');
    await expect(getDescriptionText('1.0.0'))
      .rejects
      .toMatch('No file founded');
  });
});

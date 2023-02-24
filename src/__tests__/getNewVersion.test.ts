import { jest, describe, it, expect } from '@jest/globals';
import { ChangedFile } from '../getChangedFiles';
import { getNewVersion } from '../getNewVersion';

jest.mock('../constants', () => ({
  vars: {
    versionRegex: `\\d+\\.\\d+\\.\\d+`,
  },
}));

describe('getNewVersion', () => {
  it('should return undefined if packageData.patch is undefined', () => {
    expect(getNewVersion({ fileName: 'package.json' })).toBeUndefined();
  });

  it('should return undefined if "version" is not updated', () => {
    const packageData: ChangedFile = {
      fileName: 'package.json',
      patch: '@@ -1,6 +1,6 @@\n' +
      '   "name": "generate-release",\n' +
      '   "version": "0.0.6",\n' +
      '   "type": "module",\n'
    };
    expect(getNewVersion(packageData)).toBeUndefined();
  });

  it('should return undefined if "version" is not included in patch', () => {
    const packageData: ChangedFile = {
      fileName: 'package.json',
      patch: '@@ -1,6 +1,6 @@\n' +
      '   "name": "generate-release",\n' +
      '-  "type": "module",\n' +
      '+  "type": "commonjs",\n' +
      '   "main": "dist/index.js",\n'
    };
    expect(getNewVersion(packageData)).toBeUndefined();
  });

  it('should return undefined if new and old version numbers are the same', () => {
    const packageData: ChangedFile = {
      fileName: 'package.json',
      patch: '@@ -1,6 +1,6 @@\n' +
      '   "name": "generate-release",\n' +
      '-  "version": "0.0.6",\n' +
      '+"version" :"0.0.6",\n' +
      '   "type": "module",\n'
    };
    expect(getNewVersion(packageData)).toBeUndefined();
  });

  it('should return new version if it was updated', () => {
    const packageData: ChangedFile = {
      fileName: 'package.json',
      patch: '@@ -1,6 +1,6 @@\n' +
      '   "name": "generate-release",\n' +
      '-  "version": "0.0.6",\n' +
      '+  "version": "0.0.7",\n' +
      '   "type": "module",\n'
    };
    expect(getNewVersion(packageData)).toBe('0.0.7');
  });

  it('should return new version if only it was added in this patch', () => {
    const packageData: ChangedFile = {
      fileName: 'package.json',
      patch: '@@ -1,6 +1,6 @@\n' +
      '   "name": "generate-release",\n' +
      '+  "version": "0.0.7",\n' +
      '   "type": "module",\n'
    };
    expect(getNewVersion(packageData)).toBe('0.0.7');
  });

  it('should return new version if JSON content written in 1 line', () => {
    const packageData: ChangedFile = {
      fileName: 'package.json',
      patch: '@@ -1,6 +1,6 @@\n' +
      '-  "name": "generate-release", "version": "0.0.6", "type": "module",\n' +
      '+  "name": "generate-release", "version": "0.0.7", "type": "module",\n' +
      '   \n'
    };
    expect(getNewVersion(packageData)).toBe('0.0.7');
  });
});

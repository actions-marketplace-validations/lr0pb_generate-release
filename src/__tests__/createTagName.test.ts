import { jest, describe, it, expect } from '@jest/globals';
import * as core from '@actions/core';
import { createTagName } from '../createTagName';

jest.mock('@actions/core', () => ({
  getInput: jest.fn()
}));

describe('getTagName', () => {
  it('should return default semver version pattern', () => {
    expect(createTagName('0.8.1')).toBe('v0.8.1');
  });

  it('should return custom pattern with major number', () => {
    (core.getInput as jest.Mock).mockReturnValueOnce('Version {major}');
    expect(createTagName('15.0.1')).toBe('Version 15');
  });

  it('should return custom pattern with minor number', () => {
    (core.getInput as jest.Mock).mockReturnValueOnce('r{minor}');
    expect(createTagName('0.149.1')).toBe('r149');
  });

  it('should return custom pattern with bad order numbers', () => {
    (core.getInput as jest.Mock).mockReturnValueOnce('v{patch}.{minor}.{major}');
    expect(createTagName('12.4.7')).toBe('v7.4.12');
  });
});

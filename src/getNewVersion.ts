import { vars } from './constants';
import { ChangedFile } from './getChangedFiles';

export function getNewVersion(packageData: ChangedFile): string | undefined {
  const patch = packageData.patch;
  if (!patch) return;

  const isVersionUpdated = patch.includes('version');
  // console.log(`Is version prop line updated: ${isVersionUpdated}`);
  if (!isVersionUpdated) return;

  const findVersion = (symbol: string) => {
    const pattern = `^\\${symbol}.*"version"\\s*:\\s*"(${vars.versionRegex})"`;
    return patch.match(new RegExp(pattern, 'm'));
  };
  const oldLine = findVersion('-');
  const newLine = findVersion('+');

  return oldLine && newLine
  ? (oldLine[1] !== newLine[1] ? newLine[1] : undefined)
  : !oldLine && newLine
  ? newLine[1] : undefined;
}

import { ChangedFile } from './getChangedFiles';

export function getNewVersion(packageData: ChangedFile): string | undefined {
  const patch = packageData.patch;
  if (!patch) return;

  const isVersionUpdated = patch.includes('version');
  console.log(`Is version prop line updated: ${isVersionUpdated}`);
  if (!isVersionUpdated) return;

  const match = (symbol: string) => {
    const pattern = `^\\${symbol}.*"version"\\s*:\\s*"(.*)"`;
    return patch.match(new RegExp(pattern, 'm'));
  };
  const oldMatch = match('-');
  const newMatch = match('+');

  return oldMatch && newMatch
  ? (oldMatch[1] !== newMatch[1] ? newMatch[1] : undefined)
  : undefined;
}

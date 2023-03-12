import * as core from '@actions/core';
import { getDescriptionText } from './getDescriptionText';

export async function getReleaseNotes(
  version: string
): Promise<{
  body?: string,
  generate_release_notes?: boolean,
}> {
  const notesSource = core.getInput('notes-source', { required: false });
  const notesFallback = core.getInput('notes-fallback', { required: false });
  let body: string | undefined;
  if (notesSource === 'changelog') {
    try {
      body = await getDescriptionText(version);
    } catch (error) {
      core.info(error as unknown as string);
      if (notesFallback === 'fallbackText') {
        core.info('💭 Fallback text used as release description');
        body = core.getInput('fallback-text', { required: false });
      }
    }
  }
  return {
    body,
    generate_release_notes: notesSource === 'auto' || notesFallback === 'auto',
  };
}

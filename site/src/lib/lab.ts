import { getCollection } from 'astro:content';

// Diagrams live next to the content, one per version: src/content/lab/diagrams/<id>.svg
const diagrams = import.meta.glob('/src/content/lab/diagrams/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface LabVersion {
  id: string;
  data: Awaited<ReturnType<typeof getCollection<'lab'>>>[number]['data'];
  svg: string;
  isCurrent: boolean;
  /** Path of this version's own page, e.g. /lab/v1/ */
  path: string;
  /** "asOf" of the next version, i.e. the point this one stopped being current. */
  archivedOn?: string;
}

/** All versions, newest first. The highest version number is the current one. */
export async function getLabVersions(): Promise<LabVersion[]> {
  const entries = (await getCollection('lab')).sort((a, b) => b.data.version - a.data.version);
  return entries.map((e, i) => {
    const svg = diagrams[`/src/content/lab/diagrams/${e.id}.svg`];
    if (!svg) {
      throw new Error(`Lab ${e.id} has no diagram: add src/content/lab/diagrams/${e.id}.svg`);
    }
    return {
      id: e.id,
      data: e.data,
      svg,
      isCurrent: i === 0,
      path: `/lab/${e.id}/`,
      archivedOn: i > 0 ? entries[i - 1].data.asOf : undefined,
    };
  });
}

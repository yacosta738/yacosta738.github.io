import { getEntries, type CollectionEntry } from 'astro:content';
import { jsonToTech, type Tech } from './Tech';

export interface Project {
  id?: string;
  title?: string;
  date?: string | Date;
  cover?: string;
  repository?: string;
  url?: string;
  company?: string;
  tech?: Tech[];
  showInProjects?: boolean;
  featured?: boolean;
  priority?: number; // 0 - 1 (0 - low, 1 - high) if not set, default is 0
  published?: boolean;
  content?: string;
}

export const jsonToProject = async (json: CollectionEntry<'projects'>): Promise<Project> => {
  const jsonData = json.data;
  const tech = await getEntries(jsonData?.tech)
    .then((res) => res.map((t) => jsonToTech(t)))
    .catch(() => []);
  return {
    id: json.id,
    title: jsonData.title,
    date: jsonData.date,
    cover: jsonData.cover,
    repository: jsonData.repository,
    url: jsonData.url,
    company: jsonData.company,
    tech,
    showInProjects: jsonData.showInProjects,
    featured: jsonData.featured,
    published: jsonData.published,
    content: jsonData.content,
  };
};

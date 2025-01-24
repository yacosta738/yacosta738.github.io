import { type CollectionEntry } from 'astro:content';

export interface Tech {
  id: string;
  name?: string;
  icon?: string;
  url?: string;
}

export const jsonToTech = (json: CollectionEntry<'technologies'>): Tech => {
  const jsonData = json.data;
  return {
    id: json.id,
    name: jsonData?.name,
    icon: jsonData?.icon,
    url: jsonData?.url,
  };
};

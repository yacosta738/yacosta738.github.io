export interface Project {
  id?: string | undefined;
  title?: string | undefined;
  lang?: string | undefined;
  date?: string | Date | undefined;
  cover?: string | undefined;
  repository?: string | undefined;
  url?: string | undefined;
  company?: string | undefined;
  tech?: string[];
  showInProjects?: boolean;
  featured?: boolean;
  published?: boolean;
  content?: string | undefined;
}

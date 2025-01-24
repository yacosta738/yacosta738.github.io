// import DOMPurify from 'dompurify';
import { marked } from 'marked';

/**
 * Generates a random integer between the specified minimum and maximum values.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The generated random integer.
 */
export const randomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Adds the 'inline-link' class to all anchor elements within elements matching the specified class name.
 * @param className The class name of the elements to search for.
 */
export const inlineLinks = (className: string) => {
  const elements = Array.from(document.querySelectorAll(className));
  // eslint-disable-next-line no-array-constructor
  const allLinks = new Array<HTMLElement[]>();
  elements.forEach((el) => allLinks.push(Array.from(el.querySelectorAll('a'))));
  if (allLinks.length > 0) {
    allLinks.forEach((links) => {
      links.forEach((link) => link.classList.add('inline-link'));
    });
  }
};

/**
 * Converts a string to markdown format using the 'marked' library.
 * @param str The input string to be converted.
 * @returns A promise that resolves to the converted markdown string.
 */
export const markdownfy = async (str: string): Promise<string> => await marked.parse(str);

/**
 * Converts a term to a URL-friendly format.
 * @param term The term to be converted.
 * @returns The URLized term.
 */
export const urlize = (term: string): string => {
  if (typeof term !== 'string') {
    throw new TypeError(`The term must be a string, but received a value of type ${typeof term}`);
  }
  return term.trim().toLowerCase().replace(/\s+/g, '-');
};

/**
 * Converts markdown to HTML using the 'marked' library.
 * @param markdown The markdown string to be converted.
 * @returns The converted HTML string.
 * @see https://marked.js.org/
 */
export const markdownToHTML = async (markdown: string): Promise<string> => await marked(markdown);

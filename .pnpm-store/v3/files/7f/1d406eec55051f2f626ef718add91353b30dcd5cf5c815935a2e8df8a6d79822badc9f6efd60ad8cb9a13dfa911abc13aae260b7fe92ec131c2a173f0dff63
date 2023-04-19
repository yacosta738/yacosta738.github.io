export type Tag = { inner: null | string, outer: string };

export function findTagByName(
  xml: string,
  tagName: string,
  options?: { debug?: boolean, nested?: boolean, startIndex?: number }
): Tag | undefined;

export function findTagsByName(
  xml: string,
  tagName: string,
  options?: { debug?: boolean, nested?: boolean, startIndex?: boolean }
): Tag[];

export function findTagsByPath(
  xml: string,
  path: string[],
  options?: { debug?: boolean, returnOnFirst?: boolean }
): Tag[];

export function findTagByPath(
  xml: string,
  path: string[],
  options?: { debug?: boolean }
): Tag | undefined;

export function getAttribute(tag: string | Tag, attributeName: string, options?: { debug?: boolean } ): string;

export function removeTagsByName(xml: string, tagName: string, options?: { debug?: boolean }): string;

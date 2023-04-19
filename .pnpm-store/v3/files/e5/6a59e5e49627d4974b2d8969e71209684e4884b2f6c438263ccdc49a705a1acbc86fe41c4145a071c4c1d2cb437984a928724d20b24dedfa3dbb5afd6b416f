/**
 * Generate a table of contents from `tree`.
 *
 * Looks for the first heading matching `options.heading` (case insensitive) and
 * returns a table of contents (a list) for all following headings.
 * If no `heading` is specified, creates a table of contents for all headings in
 * `tree`.
 * `tree` is not changed.
 *
 * Links in the list to headings are based on GitHub’s style.
 * Only top-level headings (those not in blockquotes or lists), are used.
 * This default behavior can be changed by passing `options.parents`.
 *
 * @param {Node} tree
 *   Tree to search and generate from.
 * @param {Options | null | undefined} [options]
 *   Configuration.
 * @returns {Result}
 *   Results.
 */
export function toc(tree: Node, options?: Options | null | undefined): Result
export type Root = import('mdast').Root
export type Content = import('mdast').Content
export type List = import('mdast').List
export type SearchOptions = import('./search.js').SearchOptions
export type ContentsOptions = import('./contents.js').ContentsOptions
export type Node = Root | Content
export type Options = SearchOptions & ContentsOptions & ExtraOptions
/**
 * Extra configuration fields.
 */
export type ExtraOptions = {
  /**
   * Heading to look for, wrapped in `new RegExp('^(' + value + ')$', 'i')`.
   */
  heading?: string | null | undefined
}
/**
 * Results.
 */
export type Result = {
  /**
   * Index of the node right after the table of contents heading, `-1` if no
   * heading was found, `null` if no `heading` was given.
   */
  index: number | null
  /**
   * Index of the first node after `heading` that is not part of its section,
   * `-1` if no heading was found, `null` if no `heading` was given, same as
   * `index` if there are no nodes between `heading` and the first heading in
   * the table of contents.
   */
  endIndex: number | null
  /**
   * List representing the generated table of contents, `null` if no table of
   * contents could be created, either because no heading was found or because
   * no following headings were found.
   */
  map: List | null
}

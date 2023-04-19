export = rehypeFilter
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 *
 * @callback AllowElement
 * @param {Element} element
 * @param {number} index
 * @param {Element|Root} parent
 * @returns {boolean|undefined}
 *
 * @typedef RehypeFilterOptions
 * @property {Array.<string>} [allowedElements]
 * @property {Array.<string>} [disallowedElements=[]]
 * @property {AllowElement} [allowElement]
 * @property {boolean} [unwrapDisallowed=false]
 */
/**
 * @type {import('unified').Plugin<[RehypeFilterOptions]>}
 */
declare function rehypeFilter(
  options: RehypeFilterOptions
): void | import('unified').Transformer
declare namespace rehypeFilter {
  export {Node, Root, Element, AllowElement, RehypeFilterOptions}
}
type RehypeFilterOptions = {
  allowedElements?: string[] | undefined
  disallowedElements?: string[] | undefined
  allowElement?: AllowElement | undefined
  unwrapDisallowed?: boolean | undefined
}
type Node = import('unist').Node
type Root = import('hast').Root
type Element = import('hast').Element
type AllowElement = (
  element: Element,
  index: number,
  parent: Element | Root
) => boolean | undefined

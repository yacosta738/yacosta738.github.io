export = ReactMarkdown
/**
 * @param {ReactMarkdownOptions} options
 * @returns {ReactElement}
 */
declare function ReactMarkdown(options: ReactMarkdownOptions): ReactElement
declare namespace ReactMarkdown {
  export {
    defaultProps,
    propTypes,
    uriTransformer,
    ReactNode,
    ReactElement,
    PluggableList,
    Root,
    FilterOptions,
    TransformOptions,
    CoreOptions,
    PluginOptions,
    LayoutOptions,
    ReactMarkdownOptions,
    Deprecation
  }
}
type ReactMarkdownOptions = CoreOptions &
  PluginOptions &
  LayoutOptions &
  FilterOptions &
  TransformOptions
type ReactElement = import('react').ReactElement<{}>
declare namespace defaultProps {
  export {uriTransformer as transformLinkUri}
}
declare namespace propTypes {
  const children: PropTypes.Requireable<string>
  const className: PropTypes.Requireable<string>
  const allowElement: PropTypes.Requireable<(...args: any[]) => any>
  const allowedElements: PropTypes.Requireable<(string | null | undefined)[]>
  const disallowedElements: PropTypes.Requireable<(string | null | undefined)[]>
  const unwrapDisallowed: PropTypes.Requireable<boolean>
  const remarkPlugins: PropTypes.Requireable<(object | null | undefined)[]>
  const rehypePlugins: PropTypes.Requireable<(object | null | undefined)[]>
  const sourcePos: PropTypes.Requireable<boolean>
  const rawSourcePos: PropTypes.Requireable<boolean>
  const skipHtml: PropTypes.Requireable<boolean>
  const includeElementIndex: PropTypes.Requireable<boolean>
  const transformLinkUri: PropTypes.Requireable<
    boolean | ((...args: any[]) => any)
  >
  const linkTarget: PropTypes.Requireable<string | ((...args: any[]) => any)>
  const transformImageUri: PropTypes.Requireable<(...args: any[]) => any>
  const components: PropTypes.Requireable<object>
}
import uriTransformer = require('./uri-transformer.js')
type ReactNode = import('react').ReactNode
type PluggableList = import('unified').PluggableList
type Root = import('hast').Root
type FilterOptions = import('./rehype-filter.js').RehypeFilterOptions
type TransformOptions = import('./ast-to-react.js').TransformOptions
type CoreOptions = {
  children: string
}
type PluginOptions = {
  /**
   * **deprecated**: use `remarkPlugins` instead
   */
  plugins?: PluggableList | undefined
  remarkPlugins?: PluggableList | undefined
  rehypePlugins?: PluggableList | undefined
}
type LayoutOptions = {
  className?: string | undefined
}
type Deprecation = {
  id: string
  to?: string | undefined
}
import PropTypes = require('prop-types')

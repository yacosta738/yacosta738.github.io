export type IntrinsicElements = JSX.IntrinsicElements
export type ReactNode = import('react').ReactNode
export type Position = import('unist').Position
export type Element = import('hast').Element
export type Root = import('hast').Root
export type Text = import('hast').Text
export type Comment = import('hast').Comment
export type Doctype = import('hast').DocType
export type Info = {
  space: string | null
  attribute: string | null
  property: string | null
  boolean: boolean
  booleanish: boolean
  overloadedBoolean: boolean
  number: boolean
  commaSeparated: boolean
  spaceSeparated: boolean
  commaOrSpaceSeparated: boolean
  mustUseProperty: boolean
  defined: boolean
}
export type Schema = {
  property: {
    [x: string]: Info
  }
  normal: {
    [x: string]: string
  }
  space: string | null
}
export type Raw = {
  type: 'raw'
  value: string
}
export type Context = {
  options: TransformOptions
  schema: Schema
  listDepth: number
}
export type TransformLink = (
  href: string,
  children: Array<Comment | Element | Text>,
  title: string | null
) => string
export type TransformImage = (
  src: string,
  alt: string,
  title: string | null
) => string
export type TransformLinkTarget = (
  href: string,
  children: Array<Comment | Element | Text>,
  title: string | null
) => string | undefined
/**
 * To do: is `data-sourcepos` typeable?
 */
export type ReactMarkdownNames = keyof IntrinsicElements
export type ReactMarkdownProps = {
  node: Element
  key: string
  children: ReactNode[]
  /**
   * Passed when `options.rawSourcePos` is given
   */
  sourcePosition?: import('unist').Position | null | undefined
  /**
   * Passed when `options.includeElementIndex` is given
   */
  index?: number | undefined
  /**
   * Passed when `options.includeElementIndex` is given
   */
  siblingCount?: number | undefined
}
export type CodeComponent = (
  props: JSX.IntrinsicElements['code'] &
    ReactMarkdownProps & {
      inline?: boolean
    }
) => ReactNode
export type HeadingComponent = (
  props: JSX.IntrinsicElements['h1'] &
    ReactMarkdownProps & {
      level: number
    }
) => ReactNode
export type LiComponent = (
  props: JSX.IntrinsicElements['li'] &
    ReactMarkdownProps & {
      checked: boolean | null
      index: number
      ordered: boolean
    }
) => ReactNode
export type OrderedListComponent = (
  props: JSX.IntrinsicElements['ol'] &
    ReactMarkdownProps & {
      depth: number
      ordered: true
    }
) => ReactNode
export type TableCellComponent = (
  props: JSX.IntrinsicElements['table'] &
    ReactMarkdownProps & {
      style?: {
        [x: string]: unknown
      }
      isHeader: boolean
    }
) => ReactNode
export type TableRowComponent = (
  props: JSX.IntrinsicElements['tr'] &
    ReactMarkdownProps & {
      isHeader: boolean
    }
) => ReactNode
export type UnorderedListComponent = (
  props: JSX.IntrinsicElements['ul'] &
    ReactMarkdownProps & {
      depth: number
      ordered: false
    }
) => ReactNode
export type SpecialComponents = {
  code: CodeComponent | ReactMarkdownNames
  h1: HeadingComponent | ReactMarkdownNames
  h2: HeadingComponent | ReactMarkdownNames
  h3: HeadingComponent | ReactMarkdownNames
  h4: HeadingComponent | ReactMarkdownNames
  h5: HeadingComponent | ReactMarkdownNames
  h6: HeadingComponent | ReactMarkdownNames
  li: LiComponent | ReactMarkdownNames
  ol: OrderedListComponent | ReactMarkdownNames
  td: TableCellComponent | ReactMarkdownNames
  th: TableCellComponent | ReactMarkdownNames
  tr: TableRowComponent | ReactMarkdownNames
  ul: UnorderedListComponent | ReactMarkdownNames
}
export type NormalComponents = {
  a:
    | 'a'
    | ((
        props: React.ClassAttributes<HTMLAnchorElement> &
          React.AnchorHTMLAttributes<HTMLAnchorElement> &
          ReactMarkdownProps
      ) => ReactNode)
  abbr:
    | 'abbr'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  address:
    | 'address'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  area:
    | 'area'
    | ((
        props: React.ClassAttributes<HTMLAreaElement> &
          React.AreaHTMLAttributes<HTMLAreaElement> &
          ReactMarkdownProps
      ) => ReactNode)
  article:
    | 'article'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  aside:
    | 'aside'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  audio:
    | 'audio'
    | ((
        props: React.ClassAttributes<HTMLAudioElement> &
          React.AudioHTMLAttributes<HTMLAudioElement> &
          ReactMarkdownProps
      ) => ReactNode)
  b:
    | 'b'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  base:
    | 'base'
    | ((
        props: React.ClassAttributes<HTMLBaseElement> &
          React.BaseHTMLAttributes<HTMLBaseElement> &
          ReactMarkdownProps
      ) => ReactNode)
  bdi:
    | 'bdi'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  bdo:
    | 'bdo'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  big:
    | 'big'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  blockquote:
    | 'blockquote'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.BlockquoteHTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  body:
    | 'body'
    | ((
        props: React.ClassAttributes<HTMLBodyElement> &
          React.HTMLAttributes<HTMLBodyElement> &
          ReactMarkdownProps
      ) => ReactNode)
  br:
    | 'br'
    | ((
        props: React.ClassAttributes<HTMLBRElement> &
          React.HTMLAttributes<HTMLBRElement> &
          ReactMarkdownProps
      ) => ReactNode)
  button:
    | 'button'
    | ((
        props: React.ClassAttributes<HTMLButtonElement> &
          React.ButtonHTMLAttributes<HTMLButtonElement> &
          ReactMarkdownProps
      ) => ReactNode)
  canvas:
    | 'canvas'
    | ((
        props: React.ClassAttributes<HTMLCanvasElement> &
          React.CanvasHTMLAttributes<HTMLCanvasElement> &
          ReactMarkdownProps
      ) => ReactNode)
  caption:
    | 'caption'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  cite:
    | 'cite'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  code:
    | 'code'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  col:
    | 'col'
    | ((
        props: React.ClassAttributes<HTMLTableColElement> &
          React.ColHTMLAttributes<HTMLTableColElement> &
          ReactMarkdownProps
      ) => ReactNode)
  colgroup:
    | 'colgroup'
    | ((
        props: React.ClassAttributes<HTMLTableColElement> &
          React.ColgroupHTMLAttributes<HTMLTableColElement> &
          ReactMarkdownProps
      ) => ReactNode)
  data:
    | 'data'
    | ((
        props: React.ClassAttributes<HTMLDataElement> &
          React.DataHTMLAttributes<HTMLDataElement> &
          ReactMarkdownProps
      ) => ReactNode)
  datalist:
    | 'datalist'
    | ((
        props: React.ClassAttributes<HTMLDataListElement> &
          React.HTMLAttributes<HTMLDataListElement> &
          ReactMarkdownProps
      ) => ReactNode)
  dd:
    | 'dd'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  del:
    | 'del'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.DelHTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  details:
    | 'details'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.DetailsHTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  dfn:
    | 'dfn'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  dialog:
    | 'dialog'
    | ((
        props: React.ClassAttributes<HTMLDialogElement> &
          React.DialogHTMLAttributes<HTMLDialogElement> &
          ReactMarkdownProps
      ) => ReactNode)
  div:
    | 'div'
    | ((
        props: React.ClassAttributes<HTMLDivElement> &
          React.HTMLAttributes<HTMLDivElement> &
          ReactMarkdownProps
      ) => ReactNode)
  dl:
    | 'dl'
    | ((
        props: React.ClassAttributes<HTMLDListElement> &
          React.HTMLAttributes<HTMLDListElement> &
          ReactMarkdownProps
      ) => ReactNode)
  dt:
    | 'dt'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  em:
    | 'em'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  embed:
    | 'embed'
    | ((
        props: React.ClassAttributes<HTMLEmbedElement> &
          React.EmbedHTMLAttributes<HTMLEmbedElement> &
          ReactMarkdownProps
      ) => ReactNode)
  fieldset:
    | 'fieldset'
    | ((
        props: React.ClassAttributes<HTMLFieldSetElement> &
          React.FieldsetHTMLAttributes<HTMLFieldSetElement> &
          ReactMarkdownProps
      ) => ReactNode)
  figcaption:
    | 'figcaption'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  figure:
    | 'figure'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  footer:
    | 'footer'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  form:
    | 'form'
    | ((
        props: React.ClassAttributes<HTMLFormElement> &
          React.FormHTMLAttributes<HTMLFormElement> &
          ReactMarkdownProps
      ) => ReactNode)
  h1:
    | 'h1'
    | ((
        props: React.ClassAttributes<HTMLHeadingElement> &
          React.HTMLAttributes<HTMLHeadingElement> &
          ReactMarkdownProps
      ) => ReactNode)
  h2:
    | 'h2'
    | ((
        props: React.ClassAttributes<HTMLHeadingElement> &
          React.HTMLAttributes<HTMLHeadingElement> &
          ReactMarkdownProps
      ) => ReactNode)
  h3:
    | 'h3'
    | ((
        props: React.ClassAttributes<HTMLHeadingElement> &
          React.HTMLAttributes<HTMLHeadingElement> &
          ReactMarkdownProps
      ) => ReactNode)
  h4:
    | 'h4'
    | ((
        props: React.ClassAttributes<HTMLHeadingElement> &
          React.HTMLAttributes<HTMLHeadingElement> &
          ReactMarkdownProps
      ) => ReactNode)
  h5:
    | 'h5'
    | ((
        props: React.ClassAttributes<HTMLHeadingElement> &
          React.HTMLAttributes<HTMLHeadingElement> &
          ReactMarkdownProps
      ) => ReactNode)
  h6:
    | 'h6'
    | ((
        props: React.ClassAttributes<HTMLHeadingElement> &
          React.HTMLAttributes<HTMLHeadingElement> &
          ReactMarkdownProps
      ) => ReactNode)
  head:
    | 'head'
    | ((
        props: React.ClassAttributes<HTMLHeadElement> &
          React.HTMLAttributes<HTMLHeadElement> &
          ReactMarkdownProps
      ) => ReactNode)
  header:
    | 'header'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  hgroup:
    | 'hgroup'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  hr:
    | 'hr'
    | ((
        props: React.ClassAttributes<HTMLHRElement> &
          React.HTMLAttributes<HTMLHRElement> &
          ReactMarkdownProps
      ) => ReactNode)
  html:
    | 'html'
    | ((
        props: React.ClassAttributes<HTMLHtmlElement> &
          React.HtmlHTMLAttributes<HTMLHtmlElement> &
          ReactMarkdownProps
      ) => ReactNode)
  i:
    | 'i'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  iframe:
    | 'iframe'
    | ((
        props: React.ClassAttributes<HTMLIFrameElement> &
          React.IframeHTMLAttributes<HTMLIFrameElement> &
          ReactMarkdownProps
      ) => ReactNode)
  img:
    | 'img'
    | ((
        props: React.ClassAttributes<HTMLImageElement> &
          React.ImgHTMLAttributes<HTMLImageElement> &
          ReactMarkdownProps
      ) => ReactNode)
  input:
    | 'input'
    | ((
        props: React.ClassAttributes<HTMLInputElement> &
          React.InputHTMLAttributes<HTMLInputElement> &
          ReactMarkdownProps
      ) => ReactNode)
  ins:
    | 'ins'
    | ((
        props: React.ClassAttributes<HTMLModElement> &
          React.InsHTMLAttributes<HTMLModElement> &
          ReactMarkdownProps
      ) => ReactNode)
  kbd:
    | 'kbd'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  keygen:
    | 'keygen'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.KeygenHTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  label:
    | 'label'
    | ((
        props: React.ClassAttributes<HTMLLabelElement> &
          React.LabelHTMLAttributes<HTMLLabelElement> &
          ReactMarkdownProps
      ) => ReactNode)
  legend:
    | 'legend'
    | ((
        props: React.ClassAttributes<HTMLLegendElement> &
          React.HTMLAttributes<HTMLLegendElement> &
          ReactMarkdownProps
      ) => ReactNode)
  li:
    | 'li'
    | ((
        props: React.ClassAttributes<HTMLLIElement> &
          React.LiHTMLAttributes<HTMLLIElement> &
          ReactMarkdownProps
      ) => ReactNode)
  link:
    | 'link'
    | ((
        props: React.ClassAttributes<HTMLLinkElement> &
          React.LinkHTMLAttributes<HTMLLinkElement> &
          ReactMarkdownProps
      ) => ReactNode)
  main:
    | 'main'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  map:
    | 'map'
    | ((
        props: React.ClassAttributes<HTMLMapElement> &
          React.MapHTMLAttributes<HTMLMapElement> &
          ReactMarkdownProps
      ) => ReactNode)
  mark:
    | 'mark'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  menu:
    | 'menu'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.MenuHTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  menuitem:
    | 'menuitem'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  meta:
    | 'meta'
    | ((
        props: React.ClassAttributes<HTMLMetaElement> &
          React.MetaHTMLAttributes<HTMLMetaElement> &
          ReactMarkdownProps
      ) => ReactNode)
  meter:
    | 'meter'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.MeterHTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  nav:
    | 'nav'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  noindex:
    | 'noindex'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  noscript:
    | 'noscript'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  object:
    | 'object'
    | ((
        props: React.ClassAttributes<HTMLObjectElement> &
          React.ObjectHTMLAttributes<HTMLObjectElement> &
          ReactMarkdownProps
      ) => ReactNode)
  ol:
    | 'ol'
    | ((
        props: React.ClassAttributes<HTMLOListElement> &
          React.OlHTMLAttributes<HTMLOListElement> &
          ReactMarkdownProps
      ) => ReactNode)
  optgroup:
    | 'optgroup'
    | ((
        props: React.ClassAttributes<HTMLOptGroupElement> &
          React.OptgroupHTMLAttributes<HTMLOptGroupElement> &
          ReactMarkdownProps
      ) => ReactNode)
  option:
    | 'option'
    | ((
        props: React.ClassAttributes<HTMLOptionElement> &
          React.OptionHTMLAttributes<HTMLOptionElement> &
          ReactMarkdownProps
      ) => ReactNode)
  output:
    | 'output'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.OutputHTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  p:
    | 'p'
    | ((
        props: React.ClassAttributes<HTMLParagraphElement> &
          React.HTMLAttributes<HTMLParagraphElement> &
          ReactMarkdownProps
      ) => ReactNode)
  param:
    | 'param'
    | ((
        props: React.ClassAttributes<HTMLParamElement> &
          React.ParamHTMLAttributes<HTMLParamElement> &
          ReactMarkdownProps
      ) => ReactNode)
  picture:
    | 'picture'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  pre:
    | 'pre'
    | ((
        props: React.ClassAttributes<HTMLPreElement> &
          React.HTMLAttributes<HTMLPreElement> &
          ReactMarkdownProps
      ) => ReactNode)
  progress:
    | 'progress'
    | ((
        props: React.ClassAttributes<HTMLProgressElement> &
          React.ProgressHTMLAttributes<HTMLProgressElement> &
          ReactMarkdownProps
      ) => ReactNode)
  q:
    | 'q'
    | ((
        props: React.ClassAttributes<HTMLQuoteElement> &
          React.QuoteHTMLAttributes<HTMLQuoteElement> &
          ReactMarkdownProps
      ) => ReactNode)
  rp:
    | 'rp'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  rt:
    | 'rt'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  ruby:
    | 'ruby'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  s:
    | 's'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  samp:
    | 'samp'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  slot:
    | 'slot'
    | ((
        props: React.ClassAttributes<HTMLSlotElement> &
          React.SlotHTMLAttributes<HTMLSlotElement> &
          ReactMarkdownProps
      ) => ReactNode)
  script:
    | 'script'
    | ((
        props: React.ClassAttributes<HTMLScriptElement> &
          React.ScriptHTMLAttributes<HTMLScriptElement> &
          ReactMarkdownProps
      ) => ReactNode)
  section:
    | 'section'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  select:
    | 'select'
    | ((
        props: React.ClassAttributes<HTMLSelectElement> &
          React.SelectHTMLAttributes<HTMLSelectElement> &
          ReactMarkdownProps
      ) => ReactNode)
  small:
    | 'small'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  source:
    | 'source'
    | ((
        props: React.ClassAttributes<HTMLSourceElement> &
          React.SourceHTMLAttributes<HTMLSourceElement> &
          ReactMarkdownProps
      ) => ReactNode)
  span:
    | 'span'
    | ((
        props: React.ClassAttributes<HTMLSpanElement> &
          React.HTMLAttributes<HTMLSpanElement> &
          ReactMarkdownProps
      ) => ReactNode)
  strong:
    | 'strong'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  style:
    | 'style'
    | ((
        props: React.ClassAttributes<HTMLStyleElement> &
          React.StyleHTMLAttributes<HTMLStyleElement> &
          ReactMarkdownProps
      ) => ReactNode)
  sub:
    | 'sub'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  summary:
    | 'summary'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  sup:
    | 'sup'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  table:
    | 'table'
    | ((
        props: React.ClassAttributes<HTMLTableElement> &
          React.TableHTMLAttributes<HTMLTableElement> &
          ReactMarkdownProps
      ) => ReactNode)
  template:
    | 'template'
    | ((
        props: React.ClassAttributes<HTMLTemplateElement> &
          React.HTMLAttributes<HTMLTemplateElement> &
          ReactMarkdownProps
      ) => ReactNode)
  tbody:
    | 'tbody'
    | ((
        props: React.ClassAttributes<HTMLTableSectionElement> &
          React.HTMLAttributes<HTMLTableSectionElement> &
          ReactMarkdownProps
      ) => ReactNode)
  td:
    | 'td'
    | ((
        props: React.ClassAttributes<HTMLTableDataCellElement> &
          React.TdHTMLAttributes<HTMLTableDataCellElement> &
          ReactMarkdownProps
      ) => ReactNode)
  textarea:
    | 'textarea'
    | ((
        props: React.ClassAttributes<HTMLTextAreaElement> &
          React.TextareaHTMLAttributes<HTMLTextAreaElement> &
          ReactMarkdownProps
      ) => ReactNode)
  tfoot:
    | 'tfoot'
    | ((
        props: React.ClassAttributes<HTMLTableSectionElement> &
          React.HTMLAttributes<HTMLTableSectionElement> &
          ReactMarkdownProps
      ) => ReactNode)
  th:
    | 'th'
    | ((
        props: React.ClassAttributes<HTMLTableHeaderCellElement> &
          React.ThHTMLAttributes<HTMLTableHeaderCellElement> &
          ReactMarkdownProps
      ) => ReactNode)
  thead:
    | 'thead'
    | ((
        props: React.ClassAttributes<HTMLTableSectionElement> &
          React.HTMLAttributes<HTMLTableSectionElement> &
          ReactMarkdownProps
      ) => ReactNode)
  time:
    | 'time'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.TimeHTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  title:
    | 'title'
    | ((
        props: React.ClassAttributes<HTMLTitleElement> &
          React.HTMLAttributes<HTMLTitleElement> &
          ReactMarkdownProps
      ) => ReactNode)
  tr:
    | 'tr'
    | ((
        props: React.ClassAttributes<HTMLTableRowElement> &
          React.HTMLAttributes<HTMLTableRowElement> &
          ReactMarkdownProps
      ) => ReactNode)
  track:
    | 'track'
    | ((
        props: React.ClassAttributes<HTMLTrackElement> &
          React.TrackHTMLAttributes<HTMLTrackElement> &
          ReactMarkdownProps
      ) => ReactNode)
  u:
    | 'u'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  ul:
    | 'ul'
    | ((
        props: React.ClassAttributes<HTMLUListElement> &
          React.HTMLAttributes<HTMLUListElement> &
          ReactMarkdownProps
      ) => ReactNode)
  var:
    | 'var'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  video:
    | 'video'
    | ((
        props: React.ClassAttributes<HTMLVideoElement> &
          React.VideoHTMLAttributes<HTMLVideoElement> &
          ReactMarkdownProps
      ) => ReactNode)
  wbr:
    | 'wbr'
    | ((
        props: React.ClassAttributes<HTMLElement> &
          React.HTMLAttributes<HTMLElement> &
          ReactMarkdownProps
      ) => ReactNode)
  webview:
    | 'webview'
    | ((
        props: React.ClassAttributes<HTMLWebViewElement> &
          React.WebViewHTMLAttributes<HTMLWebViewElement> &
          ReactMarkdownProps
      ) => ReactNode)
  svg:
    | 'svg'
    | ((props: React.SVGProps<SVGSVGElement> & ReactMarkdownProps) => ReactNode)
  animate:
    | 'animate'
    | ((props: React.SVGProps<SVGElement> & ReactMarkdownProps) => ReactNode)
  animateMotion:
    | 'animateMotion'
    | ((props: React.SVGProps<SVGElement> & ReactMarkdownProps) => ReactNode)
  animateTransform:
    | 'animateTransform'
    | ((props: React.SVGProps<SVGElement> & ReactMarkdownProps) => ReactNode)
  circle:
    | 'circle'
    | ((
        props: React.SVGProps<SVGCircleElement> & ReactMarkdownProps
      ) => ReactNode)
  clipPath:
    | 'clipPath'
    | ((
        props: React.SVGProps<SVGClipPathElement> & ReactMarkdownProps
      ) => ReactNode)
  defs:
    | 'defs'
    | ((
        props: React.SVGProps<SVGDefsElement> & ReactMarkdownProps
      ) => ReactNode)
  desc:
    | 'desc'
    | ((
        props: React.SVGProps<SVGDescElement> & ReactMarkdownProps
      ) => ReactNode)
  ellipse:
    | 'ellipse'
    | ((
        props: React.SVGProps<SVGEllipseElement> & ReactMarkdownProps
      ) => ReactNode)
  feBlend:
    | 'feBlend'
    | ((
        props: React.SVGProps<SVGFEBlendElement> & ReactMarkdownProps
      ) => ReactNode)
  feColorMatrix:
    | 'feColorMatrix'
    | ((
        props: React.SVGProps<SVGFEColorMatrixElement> & ReactMarkdownProps
      ) => ReactNode)
  feComponentTransfer:
    | 'feComponentTransfer'
    | ((
        props: React.SVGProps<SVGFEComponentTransferElement> &
          ReactMarkdownProps
      ) => ReactNode)
  feComposite:
    | 'feComposite'
    | ((
        props: React.SVGProps<SVGFECompositeElement> & ReactMarkdownProps
      ) => ReactNode)
  feConvolveMatrix:
    | 'feConvolveMatrix'
    | ((
        props: React.SVGProps<SVGFEConvolveMatrixElement> & ReactMarkdownProps
      ) => ReactNode)
  feDiffuseLighting:
    | 'feDiffuseLighting'
    | ((
        props: React.SVGProps<SVGFEDiffuseLightingElement> & ReactMarkdownProps
      ) => ReactNode)
  feDisplacementMap:
    | 'feDisplacementMap'
    | ((
        props: React.SVGProps<SVGFEDisplacementMapElement> & ReactMarkdownProps
      ) => ReactNode)
  feDistantLight:
    | 'feDistantLight'
    | ((
        props: React.SVGProps<SVGFEDistantLightElement> & ReactMarkdownProps
      ) => ReactNode)
  feDropShadow:
    | 'feDropShadow'
    | ((
        props: React.SVGProps<SVGFEDropShadowElement> & ReactMarkdownProps
      ) => ReactNode)
  feFlood:
    | 'feFlood'
    | ((
        props: React.SVGProps<SVGFEFloodElement> & ReactMarkdownProps
      ) => ReactNode)
  feFuncA:
    | 'feFuncA'
    | ((
        props: React.SVGProps<SVGFEFuncAElement> & ReactMarkdownProps
      ) => ReactNode)
  feFuncB:
    | 'feFuncB'
    | ((
        props: React.SVGProps<SVGFEFuncBElement> & ReactMarkdownProps
      ) => ReactNode)
  feFuncG:
    | 'feFuncG'
    | ((
        props: React.SVGProps<SVGFEFuncGElement> & ReactMarkdownProps
      ) => ReactNode)
  feFuncR:
    | 'feFuncR'
    | ((
        props: React.SVGProps<SVGFEFuncRElement> & ReactMarkdownProps
      ) => ReactNode)
  feGaussianBlur:
    | 'feGaussianBlur'
    | ((
        props: React.SVGProps<SVGFEGaussianBlurElement> & ReactMarkdownProps
      ) => ReactNode)
  feImage:
    | 'feImage'
    | ((
        props: React.SVGProps<SVGFEImageElement> & ReactMarkdownProps
      ) => ReactNode)
  feMerge:
    | 'feMerge'
    | ((
        props: React.SVGProps<SVGFEMergeElement> & ReactMarkdownProps
      ) => ReactNode)
  feMergeNode:
    | 'feMergeNode'
    | ((
        props: React.SVGProps<SVGFEMergeNodeElement> & ReactMarkdownProps
      ) => ReactNode)
  feMorphology:
    | 'feMorphology'
    | ((
        props: React.SVGProps<SVGFEMorphologyElement> & ReactMarkdownProps
      ) => ReactNode)
  feOffset:
    | 'feOffset'
    | ((
        props: React.SVGProps<SVGFEOffsetElement> & ReactMarkdownProps
      ) => ReactNode)
  fePointLight:
    | 'fePointLight'
    | ((
        props: React.SVGProps<SVGFEPointLightElement> & ReactMarkdownProps
      ) => ReactNode)
  feSpecularLighting:
    | 'feSpecularLighting'
    | ((
        props: React.SVGProps<SVGFESpecularLightingElement> & ReactMarkdownProps
      ) => ReactNode)
  feSpotLight:
    | 'feSpotLight'
    | ((
        props: React.SVGProps<SVGFESpotLightElement> & ReactMarkdownProps
      ) => ReactNode)
  feTile:
    | 'feTile'
    | ((
        props: React.SVGProps<SVGFETileElement> & ReactMarkdownProps
      ) => ReactNode)
  feTurbulence:
    | 'feTurbulence'
    | ((
        props: React.SVGProps<SVGFETurbulenceElement> & ReactMarkdownProps
      ) => ReactNode)
  filter:
    | 'filter'
    | ((
        props: React.SVGProps<SVGFilterElement> & ReactMarkdownProps
      ) => ReactNode)
  foreignObject:
    | 'foreignObject'
    | ((
        props: React.SVGProps<SVGForeignObjectElement> & ReactMarkdownProps
      ) => ReactNode)
  g:
    | 'g'
    | ((props: React.SVGProps<SVGGElement> & ReactMarkdownProps) => ReactNode)
  image:
    | 'image'
    | ((
        props: React.SVGProps<SVGImageElement> & ReactMarkdownProps
      ) => ReactNode)
  line:
    | 'line'
    | ((
        props: React.SVGProps<SVGLineElement> & ReactMarkdownProps
      ) => ReactNode)
  linearGradient:
    | 'linearGradient'
    | ((
        props: React.SVGProps<SVGLinearGradientElement> & ReactMarkdownProps
      ) => ReactNode)
  marker:
    | 'marker'
    | ((
        props: React.SVGProps<SVGMarkerElement> & ReactMarkdownProps
      ) => ReactNode)
  mask:
    | 'mask'
    | ((
        props: React.SVGProps<SVGMaskElement> & ReactMarkdownProps
      ) => ReactNode)
  metadata:
    | 'metadata'
    | ((
        props: React.SVGProps<SVGMetadataElement> & ReactMarkdownProps
      ) => ReactNode)
  mpath:
    | 'mpath'
    | ((props: React.SVGProps<SVGElement> & ReactMarkdownProps) => ReactNode)
  path:
    | 'path'
    | ((
        props: React.SVGProps<SVGPathElement> & ReactMarkdownProps
      ) => ReactNode)
  pattern:
    | 'pattern'
    | ((
        props: React.SVGProps<SVGPatternElement> & ReactMarkdownProps
      ) => ReactNode)
  polygon:
    | 'polygon'
    | ((
        props: React.SVGProps<SVGPolygonElement> & ReactMarkdownProps
      ) => ReactNode)
  polyline:
    | 'polyline'
    | ((
        props: React.SVGProps<SVGPolylineElement> & ReactMarkdownProps
      ) => ReactNode)
  radialGradient:
    | 'radialGradient'
    | ((
        props: React.SVGProps<SVGRadialGradientElement> & ReactMarkdownProps
      ) => ReactNode)
  rect:
    | 'rect'
    | ((
        props: React.SVGProps<SVGRectElement> & ReactMarkdownProps
      ) => ReactNode)
  stop:
    | 'stop'
    | ((
        props: React.SVGProps<SVGStopElement> & ReactMarkdownProps
      ) => ReactNode)
  switch:
    | 'switch'
    | ((
        props: React.SVGProps<SVGSwitchElement> & ReactMarkdownProps
      ) => ReactNode)
  symbol:
    | 'symbol'
    | ((
        props: React.SVGProps<SVGSymbolElement> & ReactMarkdownProps
      ) => ReactNode)
  text:
    | 'text'
    | ((
        props: React.SVGProps<SVGTextElement> & ReactMarkdownProps
      ) => ReactNode)
  textPath:
    | 'textPath'
    | ((
        props: React.SVGProps<SVGTextPathElement> & ReactMarkdownProps
      ) => ReactNode)
  tspan:
    | 'tspan'
    | ((
        props: React.SVGProps<SVGTSpanElement> & ReactMarkdownProps
      ) => ReactNode)
  use:
    | 'use'
    | ((props: React.SVGProps<SVGUseElement> & ReactMarkdownProps) => ReactNode)
  view:
    | 'view'
    | ((
        props: React.SVGProps<SVGViewElement> & ReactMarkdownProps
      ) => ReactNode)
}
export type Components = Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
>
export type TransformOptions = {
  sourcePos?: boolean | undefined
  rawSourcePos?: boolean | undefined
  skipHtml?: boolean | undefined
  includeElementIndex?: boolean | undefined
  transformLinkUri?: false | TransformLink | null | undefined
  transformImageUri?: TransformImage | undefined
  linkTarget?: string | TransformLinkTarget | undefined
  components?:
    | Partial<
        Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
      >
    | undefined
}
/**
 * @param {Context} context
 * @param {Element} node
 * @param {number} index
 * @param {Element|Root} parent
 */
declare function toReact(
  context: Context,
  node: Element,
  index: number,
  parent: Element | Root
): React.DOMElement<
  {
    [x: string]: unknown
  },
  globalThis.Element
>
/**
 * @param {Context} context
 * @param {Element|Root} node
 */
declare function childrenToReact(
  context: Context,
  node: Element | Root
): React.ReactNode[]
import style = require('style-to-object')
import React = require('react')
export {toReact as hastToReact, childrenToReact as hastChildrenToReact}

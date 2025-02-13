import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import legacyStyle from "./styles/legacyToc.scss"
import modernStyle from "./styles/toc.scss"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/toc.inline"
import { i18n } from "../i18n"


const TableOfContentsCollapsed: QuartzComponent = ({
  fileData,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  if (!fileData.toc) {
    return null
  }
  const collapseToc = true

  return (
    <div class={classNames(displayClass, "toc")}>
      <button
        type="button"
        id="toc"
        class={collapseToc ? "collapsed" : ""}
        aria-controls="toc-content"
        aria-expanded={!collapseToc}
      >
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="fold"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div id="toc-content" class={collapseToc ? "collapsed" : ""}>
        <ul class="overflow">
          {fileData.toc.map((tocEntry) => (
            <li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
              <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
                {tocEntry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
TableOfContentsCollapsed.css = modernStyle
TableOfContentsCollapsed.afterDOMLoaded = script

export default (() => TableOfContentsCollapsed) satisfies QuartzComponentConstructor

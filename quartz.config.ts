import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Duckling Dev",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "umami",
    },
    locale: "en-US",
    baseUrl: "lucabello.github.io",
    ignorePatterns: ["private", "templates", ".obsidian", "archive"],
    defaultDateType: "published",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Comfortaa",
        body: "Comfortaa",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#eff1f5", // page background
          lightgray: "#dce0e8", // borders
          gray: "#9ca0b0", // graph links, heavier borders
          darkgray: "#4c4f69", // body tet
          dark: "#8839ef", // header text and icons
          secondary: "#1e66f5", // link colour, current graph node
          tertiary: "#179299", // hover states and visited graph nodes
          highlight: "rgba(30, 102, 245, 0.07)", // internal link background, highlighted text/lines of code
          textHighlight: "#fff23688", // markdown highlighted text background
        },
        darkMode: {
          light: "#1f2335", // page background
          lightgray: "#3b4261", // borders
          gray: "#565f89", // graph links, heavier borders
          darkgray: "#c0caf5", // body tet
          dark: "#9d7cd8", // header text and icons
          secondary: "#7dcfff", // link colour, current graph node
          tertiary: "#b4f9f8", // hover states and visited graph nodes
          highlight: "rgba(125, 207, 255, 0.1)", // internal link background, highlighted text/lines of code
          textHighlight: "#fff23688", // markdown highlighted text background
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "catppuccin-latte",
          dark: "tokyo-night",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config

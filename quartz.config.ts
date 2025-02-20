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
      host: "https://eu.umami.is",
      websiteId: "0b4ba915-fa05-416d-8cdd-21cdb0060974",
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
        header: "DM Mono",
        body: "DM Mono",
        code: "Azeret Mono",
      },
      colors: {
        lightMode: {
          light: "#fffffe", // page background
          lightgray: "#d6cffa", // borders
          gray: "#b7abf5", // graph links, heavier borders
          darkgray: "#2b2c34", // body text
          dark: "#6246ea", // header text and icons
          secondary: "#586fe4", // link colour, current graph node
          tertiary: "#e45858", // hover states and visited graph nodes
          highlight: "rgba(43, 44, 52, 0.1)", // internal link background, highlighted text/lines of code
          textHighlight: "#fff23688", // markdown highlighted text background
        },
        darkMode: {
          light: "#232946", // page background
          lightgray: "#121629", // borders
          gray: "#7984bc", // graph links, heavier borders
          darkgray: "#b8c1ec", // body text
          dark: "#dceebb", // header text and icons
          secondary: "#bbeee6", // link colour, current graph node
          tertiary: "#eebbc3", // hover states and visited graph nodes
          highlight: "rgba(184, 193, 236, 0.2)", // internal link background, highlighted text/lines of code
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
          light: "solarized-light",
          dark: "dark-plus",
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

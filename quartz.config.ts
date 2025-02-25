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
          light: "#f3ead3", // page background
          lightgray: "#d8d3ba", // borders
          gray: "#d8d3ba", // graph links, heavier borders
          darkgray: "#5c6a72", // body text
          dark: "#5c6a72", // header text and icons
          secondary: "#8da101", // link colour, current graph node
          tertiary: "#93b259", // hover states and visited graph nodes
          highlight: "#8da10126", // internal link background, highlighted text/lines of code
          textHighlight: "#8da10126", // markdown highlighted text background
        },
        darkMode: {
          light: "#1e2326", // page background
          lightgray: "#2e383c", // borders
          gray: "#2e383c", // graph links, heavier borders
          darkgray: "#d3c6aa", // body text
          dark: "#d3c6aa", // header text and icons
          secondary: "#a7c080", // link colour, current graph node
          tertiary: "#a7c080", // hover states and visited graph nodes
          highlight: "#a7c08026", // internal link background, highlighted text/lines of code
          textHighlight: "#a7c08026", // markdown highlighted text background
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
        theme: {  // themes from: https://shikiji.netlify.app/themes
          light: "solarized-light",
          dark: "vitesse-dark",
        },
        keepBackground: true,
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

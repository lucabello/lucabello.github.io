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
          light: "#fdf6e3 ", // page background
          lightgray: "#ede1bf", // borders
          gray: "#d7bc70", // graph links, heavier borders
          darkgray: "#002b36", // body text
          dark: "#cb4b16", // header text and icons
          secondary: "#b58900", // link colour, current graph node
          tertiary: "#6c782e", // hover states and visited graph nodes
          highlight: "rgba(181, 137, 0, 0.07)", // internal link background, highlighted text/lines of code
          textHighlight: "#fff23688", // markdown highlighted text background
        },
        darkMode: {
          light: "#141617", // page background
          lightgray: "#282828", // borders
          gray: "#504945", // graph links, heavier borders
          darkgray: "#ddc7a1", // body text
          dark: "#e78a4e", // header text and icons
          secondary: "#d8a657", // link colour, current graph node
          tertiary: "#a9b665", // hover states and visited graph nodes
          highlight: "rgba(216, 166, 87, 0.12)", // internal link background, highlighted text/lines of code
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

import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.LinksHeader(),
  ],
  afterBody: [],
  footer: Component.FooterCustom({
    links: {
      GitHub: "https://github.com/lucabello/lucabello.github.io",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta({excludeSlugs: "index,pages/"}),
    Component.TagList(),
    Component.TableOfContentsCollapsed()
  ],
  left: [],
  right: [],
  afterBody: [
    Component.FeaturedNotesOnDemand({showTags: false}),
    Component.RecentNotesOnDemand({showTags: false}),
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'lucabello/lucabello.github.io',
        repoId: 'R_kgDOLT_yAA',
        category: 'Announcements',
        categoryId: 'DIC_kwDOLT_yAM4CnUuw',
        reactionsEnabled: true,
      }
    }),
  ]
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ContentMeta()],
  left: [],
  right: [],
}

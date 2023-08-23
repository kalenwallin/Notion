import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '46511b6d397446e18aa16ebe85a40499',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: 'cd70831b-555b-4b5b-8a91-01b5143fa3c2',

  // basic site info (required)
  name: 'Portfolio.v3 ',
  domain: 'kalenwallin.com',
  author: 'Kalen Wallin',

  // open graph metadata (optional)
  description: "Projects I've worked on.",

  // social usernames (optional)
  // twitter: 'transitive_bs',
  github: 'kalenwallin',
  linkedin: 'kalenwallin',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  newsletter: 'mailto:kalenwallin1@gmail.com', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  // navigationStyle: 'default',
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'About',
      pageId: '748c0c59bc7d45df8fca9c550d6422d0'
    },
    {
      title: 'Contact',
      pageId: '661e609eb47345fe881463c6ba600abc'
    }
  ]
})

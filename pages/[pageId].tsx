import * as React from 'react'
import { GetStaticProps } from 'next'
import { useEffect } from 'react'

import { NotionPage } from '@/components/NotionPage'
import { domain, isDev } from '@/lib/config'
import { getSiteMap } from '@/lib/get-site-map'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { PageProps, Params } from '@/lib/types'

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  context
) => {
  const rawPageId = context.params.pageId as string

  try {
    const props = await resolveNotionPage(domain, rawPageId)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, rawPageId, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const siteMap = await getSiteMap()

  const staticPaths = {
    paths: Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
      params: {
        pageId
      }
    })),
    // paths: [],
    fallback: true
  }

  console.log(staticPaths.paths)
  return staticPaths
}

export default function NotionDomainDynamicPage(props) {
  useEffect(() => {
    // Client-side-only code
    const url =
      window.location != window.parent.location
        ? document.referrer
        : document.location.href
    console.log(url)
    if (url.includes('v1.kalenwallin.com')) {
      const iframe = document.querySelector(
        'iframe[src^="https://v3.kalenwallin.com/portfoliov1"]'
      )
      if (iframe) {
        const parent = iframe.parentElement
        parent.style.height = '0px'
      }
    } else if (url.includes('v2.kalenwallin.com')) {
      const iframe = document.querySelector(
        'iframe[src^="https://v3.kalenwallin.com/portfoliov2"]'
      )
      if (iframe) {
        const parent = iframe.parentElement
        parent.style.height = '0px'
      }
    } else if (url.includes('v3.kalenwallin.com')) {
      const iframe = document.querySelector(
        'iframe[src^="https://v3.kalenwallin.com/portfoliov3-development"]'
      )
      if (iframe) {
        const parent = iframe.parentElement
        parent.style.height = '0px'
      }
    }
  })
  return <NotionPage {...props} />
}

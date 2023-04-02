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
    // Prevent sites from referencing themselves in an iframe
    const url =
      window.location != window.parent.location
        ? document.referrer
        : document.location.href
    if (url.includes('v1.kalenwallin.com')) {
      const iframe = document.querySelector(
        'iframe[src^="https://v1.kalenwallin.com"]'
      )
      if (iframe) {
        const parent = iframe.parentElement
        parent.style.height = '0px'
      }
    } else if (url.includes('v2.kalenwallin.com')) {
      const iframe = document.querySelector(
        'iframe[src^="https://v2.kalenwallin.com"]'
      )
      if (iframe) {
        const parent = iframe.parentElement
        parent.style.height = '0px'
      }
    } else if (url.includes('v3.kalenwallin.com')) {
      const iframe = document.querySelector(
        'iframe[src^="https://v3.kalenwallin.com/"]'
      )
      if (iframe) {
        const parent = iframe.parentElement
        parent.style.height = '0px'
      }
    }
    // find resume pdf and rerender it as an iframe
    const resume = document.querySelector('div[class^="react-pdf__Document"]')
    if (resume) {
      const parent = resume.parentElement
      parent.setAttribute(
        'style',
        'position: relative; overflow: hidden; width: 100%; height: 800px;'
      )
      parent.innerHTML =
        '<iframe src="https://v1.kalenwallin.com/Documents/Resume.pdf" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%;"></iframe>'
    }
  })
  return <NotionPage {...props} />
}

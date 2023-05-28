import { Block } from 'notion-types'
import { defaultMapImageUrl } from 'react-notion-x'

import { defaultPageCover, defaultPageIcon, rootNotionSpaceId } from './config'

export const mapImageUrl = (url: string, block: Block) => {
  if (url !== null) {
    if (url.includes('file.notion.so')) {
      url = url.concat('&spaceId=', rootNotionSpaceId)
    }
  }
  if (url === defaultPageCover || url === defaultPageIcon) {
    return url
  }

  return defaultMapImageUrl(url, block)
}

import {useEffect} from 'react'
import Popper from 'popper.js'

export default function usePosition(options) {
  const {
    anchorRef: {current: $anchor},
    contentRef: {current: $content}
  } = options

  return useEffect(() => {
    if (!$anchor || !$content) {
      return
    }

    const popper = new Popper($anchor, $content, {
      modifiers: {
        flip: {
          behavior: ['bottom', '']
        },

        hide: {
          enabled: false
        },

        preventOverflow: {
          enabled: false
        }
      },

      placement: 'bottom-end'
    })

    return () => {
      popper.destroy()
    }
  }, [$anchor, $content])
}

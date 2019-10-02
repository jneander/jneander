import {useLayoutEffect, useRef} from 'react'
import Popper from 'popper.js'

export default function usePosition(options) {
  const {anchorRef, contentRef} = options

  const anchorRefMemo = useRef(anchorRef.current)
  const contentRefMemo = useRef(contentRef.current)
  const teardownMemo = useRef(() => {})

  return useLayoutEffect(() => {
    if (
      anchorRef.current === anchorRefMemo.current &&
      contentRef.current === contentRefMemo.current
    ) {
      return
    }

    if (!anchorRef.current || !contentRef.current) {
      teardownMemo.current()
      teardownMemo.current = () => {}
      return
    }

    const popper = new Popper(anchorRef.current, contentRef.current, {
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

    teardownMemo.current = () => {
      popper.destroy()
    }
  })
}

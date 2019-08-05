import {useEffect} from 'react'
import Popper from 'popper.js'

export default function usePosition(options) {
  const {anchorRef, contentRef} = options

  return useEffect(() => {
    if (!anchorRef.current || !contentRef.current) {
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

    return () => {
      popper.destroy()
    }
  }, [anchorRef, contentRef])
}

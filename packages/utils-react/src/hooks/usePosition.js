import {createPopper} from '@popperjs/core'

import {useRefEffect} from '.'

export default function usePosition(options) {
  const {anchorRef, contentRef, popperOptions} = options

  return useRefEffect(() => {
    if (!anchorRef.current || !contentRef.current) {
      return
    }

    const popper = createPopper(anchorRef.current, contentRef.current, popperOptions)

    return () => {
      popper.destroy()
    }
  }, [anchorRef, contentRef])
}

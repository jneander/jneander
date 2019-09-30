import {useEffect} from 'react'

export const DEFAULT_DURATION = 300

export default function useDebouncedEffect(callback, dependencies, delay = DEFAULT_DURATION) {
  return useEffect(() => {
    const timeoutId = window.setTimeout(callback, delay)

    return () => {
      window.clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies])
}

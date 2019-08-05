import {useEffect, useRef, useState} from 'react'

export const DEFAULT_DURATION = 100

export default function useDelay(shouldDelay, delayDuration = DEFAULT_DURATION) {
  const [isDelayed, setIsDelayed] = useState(true)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (shouldDelay) {
      timeoutRef.current = setTimeout(() => {
        setIsDelayed(false)
      }, delayDuration)
    }

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [delayDuration, shouldDelay])

  return shouldDelay && isDelayed
}

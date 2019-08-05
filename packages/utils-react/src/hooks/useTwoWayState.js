import {useMemo, useRef, useState} from 'react'

export default function useTwoWayState(externalValue) {
  const canonicalRef = useRef(externalValue)
  const [, setInternalValue] = useState(externalValue)

  useMemo(() => {
    canonicalRef.current = externalValue
  }, [externalValue])

  function setValue(value) {
    canonicalRef.current = value
    setInternalValue(value)
  }

  return [canonicalRef.current, setValue]
}

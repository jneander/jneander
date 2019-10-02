import {useLayoutEffect, useRef} from 'react'

function refsChanged(currentsBefore, refsAfter) {
  if (currentsBefore.length !== refsAfter.length) {
    return true
  }

  return currentsBefore.some((current, index) => refsAfter[index].current !== current)
}

function maybe(fn) {
  if (typeof fn === 'function') {
    fn()
  }
}

export default function useRefEffect(callbackFn, refs) {
  const currentsMemo = useRef([])
  const teardownMemo = useRef(null)

  useLayoutEffect(() => {
    return () => {
      if (!refsChanged(currentsMemo.current, refs)) {
        maybe(teardownMemo.current)
      }
    }
  }, [])

  useLayoutEffect(() => {
    if (refsChanged(currentsMemo.current, refs)) {
      teardownMemo.current = callbackFn() || (() => {})
    }

    currentsMemo.current = refs.map(ref => ref.current)

    return () => {
      if (refsChanged(currentsMemo.current, refs)) {
        maybe(teardownMemo.current)
      }
    }
  })
}

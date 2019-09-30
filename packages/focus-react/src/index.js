import React, {createContext, useContext, useLayoutEffect, useState} from 'react'
import {Focus} from '@jneander/focus-dom'

import FocusRegion from './FocusRegion'

const focusContext = createContext()
const {Provider} = focusContext

export function FocusProvider({children}) {
  const [focus] = useState(() => new Focus())

  return (
    <Provider value={focus}>
      {children}
    </Provider>
  )
}

export function useFocusRegion(options) {
  const focus = useContext(focusContext)
  const [focusRegion] = useState(() => new FocusRegion(focus, options))

  useLayoutEffect(() => {
    return () => {
      focusRegion.remove()
    }
  }, [])

  useLayoutEffect(() => {
    focusRegion.reconcile()
  })

  return focusRegion
}

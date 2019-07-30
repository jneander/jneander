import React from 'react'
import {render as rtlRender} from '@testing-library/react'

import ErrorBoundary from './components/ErrorBoundary'

export default async function render(element, options = {}) {
  const wrappedElement = <ErrorBoundary>{element}</ErrorBoundary>

  const {$container, ...rest} = options
  const {container, ...component} = rtlRender(wrappedElement, {
    container: $container,
    ...rest
  })

  return {
    $container: container,
    ...component
  }
}

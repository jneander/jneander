import React from 'react'

import {createContainer} from '@jneander/spec-utils-dom'

import render from '../../render'
import ErrorBoundary from '../ErrorBoundary'

describe('Spec Utils React > Components > ErrorBoundary', () => {
  let $container
  let component
  let originalOnError

  beforeEach(() => {
    $container = createContainer()
    originalOnError = window.onerror
    window.onerror = () => {}
  })

  afterEach(() => {
    component.unmount()
    $container.remove()
    window.onerror = originalOnError
  })

  function OkayComponent() {
    return <span>Okay</span>
  }

  function BrokenComponent() {
    throw new Error('BROKEN')
  }

  /* eslint-disable react/prop-types */
  function SpecComponent({broken}) {
    return <ErrorBoundary>{broken ? <BrokenComponent /> : <OkayComponent />}</ErrorBoundary>
  }
  /* eslint-enable react/prop-types */

  describe('when an error is thrown during render', () => {
    it('includes the error content in the render', async () => {
      component = await render(<SpecComponent broken />, {$container})
      expect($container.textContent.trim()).to.include('BROKEN')
    })
  })

  describe('when the render succeeds', () => {
    it('renders the child component', async () => {
      component = await render(<SpecComponent />, {$container})
      expect($container.textContent.trim()).to.equal('Okay')
    })
  })
})

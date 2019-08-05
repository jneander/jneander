import React from 'react'
import sinon from 'sinon'

import {createContainer} from '@jneander/spec-utils-dom'
import {render} from '@jneander/spec-utils-react'

import DelayedContent from '../DelayedContent'

describe('Components > DelayedContent', () => {
  let $container
  let props
  let timeoutFn

  beforeEach(async () => {
    sinon.stub(window, 'setTimeout').callsFake(fn => {
      timeoutFn = fn
      return 123
    })
    sinon.spy(window, 'clearTimeout')

    $container = createContainer()

    props = {
      duration: 100,
      shouldDelay: true
    }

    await renderComponent()
  })

  afterEach(() => {
    $container.remove()

    window.setTimeout.restore()
    window.clearTimeout.restore()
  })

  async function renderComponent() {
    const element = (
      <DelayedContent {...props}>
        <span id="content">Content</span>
      </DelayedContent>
    )

    await render(element, {$container})
  }

  describe('when initially rendered', () => {
    it('does not render the given .children', () => {
      expect($container.querySelector('#content')).to.equal(null)
    })

    it('sets a timeout', () => {
      expect(timeoutFn).not.to.equal(null)
    })
  })

  describe('when the delay duration has elapsed', () => {
    it('renders the given .children', () => {
      timeoutFn()
      expect($container.querySelector('#content')).not.to.equal(null)
    })
  })

  describe('when the .shouldDelay prop changes from `true` to `false`', () => {
    beforeEach(async () => {
      props.shouldDelay = false
      await renderComponent()
    })

    it('renders the given .children immediately', () => {
      expect($container.querySelector('#content')).not.to.equal(null)
    })

    it('clears the timeout', () => {
      expect(window.clearTimeout.callCount).to.equal(1)
    })

    it('clears the timeout using the id of the timeout', () => {
      const [timeoutId] = window.clearTimeout.lastCall.args
      expect(timeoutId).to.equal(123)
    })
  })
})

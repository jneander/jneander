import sinon from 'sinon'

import {act, renderHook} from '@jneander/spec-utils-react'

import useDebouncedEffect, {DEFAULT_DURATION} from '../useDebouncedEffect'

describe('Hooks > .useDebouncedEffect()', () => {
  let component
  let options
  let timeoutFn

  beforeEach(() => {
    sinon.stub(window, 'setTimeout').callsFake(fn => {
      timeoutFn = fn
      return 123
    })
    sinon.stub(window, 'clearTimeout')

    options = {
      callback: sinon.spy(),
      dependencies: ['example'],
      duration: 100
    }

    component = null
  })

  afterEach(() => {
    window.setTimeout.restore()
    window.clearTimeout.restore()
  })

  function render() {
    if (component == null) {
      component = renderHook(() =>
        useDebouncedEffect(options.callback, options.dependencies, options.duration)
      )
    } else {
      component.rerender()
    }
  }

  describe('when initially called', () => {
    it('does not call the callback', () => {
      render()
      expect(options.callback.callCount).to.equal(0)
    })

    it('sets a timeout', () => {
      render()
      expect(timeoutFn).not.to.equal(null)
    })

    it('sets the timeout using the given duration', () => {
      render()
      const [, duration] = window.setTimeout.lastCall.args
      expect(duration).to.equal(100)
    })

    it('sets the timeout using a default duration when given no duration', () => {
      delete options.duration
      render()
      const [, duration] = window.setTimeout.lastCall.args
      expect(duration).to.equal(DEFAULT_DURATION)
    })
  })

  describe('when the delay duration has elapsed', () => {
    it('calls the callback function', () => {
      render()
      act(() => timeoutFn())
      expect(options.callback.callCount).to.equal(1)
    })
  })

  describe('when the dependencies change before the delay duration has elapsed', () => {
    beforeEach(() => {
      render()
      options.dependencies = ['changed']
      render()
    })

    it('clears the current timeout', () => {
      expect(window.clearTimeout.callCount).to.equal(1)
    })

    it('clears the current timeout using the id of the timeout', () => {
      const [timeoutId] = window.clearTimeout.lastCall.args
      expect(timeoutId).to.equal(123)
    })

    it('sets another timeout', () => {
      expect(timeoutFn).not.to.equal(null)
    })

    it('sets the timeout using the given duration', () => {
      const [, duration] = window.setTimeout.lastCall.args
      expect(duration).to.equal(100)
    })
  })

  describe('when the consuming component is unmounted', () => {
    beforeEach(() => {
      render()
      component.unmount()
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

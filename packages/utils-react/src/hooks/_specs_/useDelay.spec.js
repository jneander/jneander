import sinon from 'sinon'

import {act, renderHook} from '@jneander/spec-utils-react'
import useDelay from '../useDelay'

describe('Hooks > .useDelay()', () => {
  let component
  let options
  let result
  let timeoutFn

  beforeEach(() => {
    sinon.stub(window, 'setTimeout').callsFake(fn => {
      timeoutFn = fn
      return 123
    })
    sinon.spy(window, 'clearTimeout')

    options = {
      duration: 100,
      shouldDelay: true
    }

    component = null
    render()
  })

  afterEach(() => {
    component.unmount()
    window.setTimeout.restore()
    window.clearTimeout.restore()
  })

  function render() {
    if (component == null) {
      component = renderHook(() => useDelay(options.shouldDelay, options.duration))
    } else {
      component.rerender()
    }
    result = component.result.current
  }

  describe('when initially called', () => {
    it('returns true', () => {
      expect(result).to.equal(true)
    })

    it('sets a timeout', () => {
      expect(timeoutFn).not.to.equal(null)
    })
  })

  describe('when the delay duration has elapsed', () => {
    it('returns false', () => {
      act(() => timeoutFn())
      render()
      expect(result).to.equal(false)
    })
  })

  describe('when the .shouldDelay prop changes from `true` to `false`', () => {
    beforeEach(() => {
      options.shouldDelay = false
      render()
    })

    it('returns false', () => {
      expect(result).to.equal(false)
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

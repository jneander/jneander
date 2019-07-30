import React, {useRef} from 'react'

import {createContainer, fireEvent} from '@jneander/spec-utils-dom'
import {render} from '@jneander/spec-utils-react'

import useFocusScope from '../useFocusScope'

describe('Component using .useFocusScope()', () => {
  let $container

  beforeEach(() => {
    $container = createContainer()
  })

  afterEach(() => {
    $container.remove()
  })

  function Component() {
    const containerRef = useRef(null)
    const defaultFocusRef = useRef(null)

    useFocusScope({containerRef, defaultFocusRef})

    return (
      <div>
        <div id="sibling-container">
          <button id="button-0">Button</button>
        </div>

        <div ref={containerRef}>
          <button id="button-1">Button 1</button>
          <button id="button-2" ref={defaultFocusRef}>
            Button 1
          </button>
          <button id="button-3">Button 3</button>
        </div>

        <button id="button-4">Button</button>
      </div>
    )
  }

  async function renderComponent() {
    await render(<Component />, {$container})
  }

  function getButton(num) {
    return $container.querySelector(`#button-${num}`)
  }

  describe('when initially rendered', () => {
    it('sets focus on the default focus element', async () => {
      await renderComponent()
      expect(document.activeElement).to.equal(getButton(2))
    })
  })

  describe('when handling Tab', () => {
    beforeEach(renderComponent)

    function tab() {
      return fireEvent.keyDown(document.activeElement, {keyCode: 9, shiftKey: false})
    }

    describe('when focus is on the last tabbable element in the container', () => {
      it('prevents the default browser behavior', () => {
        getButton(3).focus()
        expect(tab()).to.equal(false)
      })

      it('sets focus on the first tabbable element in the container', () => {
        getButton(3).focus()
        tab()
        expect(document.activeElement).to.equal(getButton(1))
      })
    })

    describe('when focus is not on the last tabbable element in the container', () => {
      it('does not prevent the default browser behavior', () => {
        getButton(2).focus()
        expect(tab()).to.equal(true)
      })

      it('does not change focus', () => {
        getButton(2).focus()
        tab()
        expect(document.activeElement).to.equal(getButton(2))
      })
    })
  })

  describe('when handling Shift+Tab', () => {
    beforeEach(renderComponent)

    function shiftTab() {
      return fireEvent.keyDown(document.activeElement, {keyCode: 9, shiftKey: true})
    }

    describe('when focus is on the first tabbable element in the container', () => {
      it('prevents the default browser behavior', () => {
        getButton(1).focus()
        expect(shiftTab()).to.equal(false)
      })

      it('sets focus on the last tabbable element in the container', () => {
        getButton(1).focus()
        shiftTab()
        expect(document.activeElement).to.equal(getButton(3))
      })
    })

    describe('when focus is not on the first tabbable element in the container', () => {
      it('does not prevent the default browser behavior', () => {
        getButton(2).focus()
        expect(shiftTab()).to.equal(true)
      })

      it('does not change focus', () => {
        getButton(2).focus()
        shiftTab()
        expect(document.activeElement).to.equal(getButton(2))
      })
    })
  })
})

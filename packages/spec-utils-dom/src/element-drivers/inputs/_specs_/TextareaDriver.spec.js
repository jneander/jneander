import sinon from 'sinon'

import {createContainer, renderString} from '../../..'
import TextareaDriver from '../TextareaDriver'

describe('Element Drivers > Inputs > TextareaDriver', () => {
  let $container
  let driver

  beforeEach(() => {
    $container = createContainer()
  })

  afterEach(() => {
    $container.remove()
  })

  function render(string) {
    renderString(string, $container)
    driver = new TextareaDriver(getInput())
  }

  function getInput() {
    return document.body.querySelector(`#input-1`)
  }

  describe('.findWithLabelText()', () => {
    it('matches `textarea` elements', () => {
      render(`
        <label>Input 2<textarea id="input-2"></textarea></label>
        <label>Input 1<textarea id="input-1"></textarea></label>
      `)
      driver = TextareaDriver.findWithLabelText('Input 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <label>Input 1<textarea id="input-2"></textarea></label>
        </div>
        <div id="container-2">
          <label>Input 1<textarea id="input-1"></textarea></label>
        </div>
      `)
      const $parent = $container.querySelector('#container-2')
      driver = TextareaDriver.findWithLabelText('Input 1', $parent)
      expect(driver.$element).to.equal(getInput())
    })

    it('matches deeply-nested text', () => {
      render('<label><span>Input 1</span><textarea id="input-1"></textarea></label>')
      driver = TextareaDriver.findWithLabelText('Input 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('ignores surrouding whitespace', () => {
      render(`
        <label>
          Input 1
          <textarea id="input-1"></textarea>
        </label>
      `)
      driver = TextareaDriver.findWithLabelText('Input 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('ignores the content in the `textarea` element', () => {
      render('<label><span>Input 1</span><textarea id="input-1">Content</textarea></label>')
      driver = TextareaDriver.findWithLabelText('Input 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('returns null when nothing matches', () => {
      driver = TextareaDriver.findWithLabelText('Input 1')
      expect(driver).to.equal(null)
    })
  })

  describe('#$element', () => {
    it('is the `input` element', () => {
      render('<textarea id="input-1"></textarea>')
      expect(driver.$element).to.equal(getInput())
    })
  })

  describe('#labelTexts', () => {
    it('is the list of label texts for the `textarea`', () => {
      render(`
        <label id="label-1">
          Label 1
          <textarea id="input-1"></textarea>
        </label>
      `)
      expect(driver.labelTexts).to.have.members(['Label 1'])
    })
  })

  describe('#$labels', () => {
    it('is the list of `label` elements for the `textarea`', () => {
      render(`
        <label id="label-1">
          Label 1
          <textarea id="input-1"></textarea>
        </label>
      `)
      expect(driver.$labels).to.have.members([$container.querySelector('label')])
    })
  })

  describe('#focused', () => {
    it('is true when the `textarea` has focus', () => {
      render('<textarea id="input-1"></textarea>')
      getInput().focus()
      expect(driver.focused).to.equal(true)
    })

    it('is false when the `textarea` does not have focus', () => {
      render('<textarea id="input-1"></textarea>')
      expect(driver.focused).to.equal(false)
    })
  })

  describe('#placeholder', () => {
    it('is the placeholder of the `textarea` element', () => {
      render('<textarea id="input-1" placeholder="Placeholder">Content</textarea>')
      expect(driver.placeholder).to.equal('Placeholder')
    })

    it('is null when the `textarea` has no placeholder', () => {
      render('<textarea id="input-1"></textarea>')
      expect(driver.placeholder).to.equal(null)
    })
  })

  describe('#value', () => {
    it('is the content of the `textarea` element', () => {
      render('<textarea id="input-1">Content</textarea>')
      expect(driver.value).to.equal('Content')
    })

    it('is an empty string when the `textarea` has no content', () => {
      render('<textarea id="input-1"></textarea>')
      expect(driver.value).to.equal('')
    })
  })

  describe('#focus()', () => {
    let eventSpy

    beforeEach(() => {
      render('<textarea id="input-1"></textarea>')
      listenForFocus()
    })

    function listenForFocus() {
      eventSpy = sinon.spy()
      getInput().addEventListener('focus', eventSpy, false)
    }

    it('sets focus on the `textarea` element', () => {
      driver.focus()
      expect(document.activeElement).to.equal(getInput())
    })

    it('propagates a "focus" event', () => {
      driver.focus()
      const specCaveat =
        'When running this spec locally in a browser with devtools open, ' +
        'this behavior will not occur.'
      expect(eventSpy.callCount).to.equal(1, specCaveat)
    })

    it('does nothing when the `textarea` already has focus', () => {
      getInput().focus()
      listenForFocus()
      driver.focus()
      expect(eventSpy.callCount).to.equal(0)
    })
  })

  describe('#keyDown()', () => {
    let eventSpy

    beforeEach(() => {
      render('<textarea id="input-1"></textarea>')
      eventSpy = sinon.spy()
      getInput().addEventListener('keydown', eventSpy, false)
    })

    it('propagates a "keydown" event', () => {
      driver.keyDown(13, {altKey: true})
      expect(eventSpy.callCount).to.equal(1)
    })

    it('includes the given keycode', () => {
      driver.keyDown(13, {altKey: true})
      const [event] = eventSpy.lastCall.args
      expect(event.keyCode).to.equal(13)
    })

    it('assigns the given keyDown options', () => {
      driver.keyDown(13, {altKey: true})
      const [event] = eventSpy.lastCall.args
      expect(event.altKey).to.equal(true)
    })
  })

  describe('#setValue()', () => {
    let eventSpy

    beforeEach(() => {
      eventSpy = sinon.spy()
      $container.addEventListener('input', eventSpy, false)
      render('<textarea id="input-1">Content</textarea>')
    })

    it('sets the content in the `textarea` element', () => {
      driver.setValue('Updated Content')
      expect(driver.value).to.equal('Updated Content')
    })

    it('propagates an "input" event when setting the content', () => {
      driver.setValue('Updated Content')
      expect(eventSpy.callCount).to.equal(1)
    })

    it('does nothing when setting the content with the same value', () => {
      driver.setValue('Content')
      expect(eventSpy.callCount).to.equal(0)
    })
  })
})

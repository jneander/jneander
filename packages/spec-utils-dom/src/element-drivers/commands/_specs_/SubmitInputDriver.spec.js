import sinon from 'sinon'

import {createContainer, renderString} from '../../..'
import SubmitInputDriver from '../SubmitInputDriver'

describe('Element Drivers > Commands > SubmitInputDriver', () => {
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
    driver = new SubmitInputDriver(getInput())
  }

  function getInput(idNumber = 1) {
    return document.body.querySelector(`#input-${idNumber}`)
  }

  describe('.findAll()', () => {
    let inputs

    it('matches `input` elements with type "submit"', () => {
      render(`
        <input id="input-2" type="submit" value="Submit 2" />
        <input id="input-1" type="submit" value="Submit 1" />
      `)
      inputs = SubmitInputDriver.findAll()
      expect(inputs.map(input => input.id)).to.have.members(['input-1', 'input-2'])
    })

    it('does not match `input` elements without type "submit"', () => {
      render(`
        <input id="input-2" type="text" value="Submit 2" />
        <input id="input-1" type="submit" value="Submit 1" />
      `)
      inputs = SubmitInputDriver.findAll()
      expect(inputs.map(input => input.id)).to.have.members(['input-1'])
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <input id="input-2" type="submit" value="Submit 2" />
        </div>
        <div id="container-2">
          <input id="input-1" type="submit" value="Submit 1" />
        </div>
      `)
      inputs = SubmitInputDriver.findAll($container.querySelector('#container-2'))
      expect(inputs.map(input => input.id)).to.have.members(['input-1'])
    })
  })

  describe('.findWithText()', () => {
    it('matches `input` elements with type "submit"', () => {
      render(`
        <input id="input-2" type="submit" value="Submit 2" />
        <input id="input-1" type="submit" value="Submit 1" />
      `)
      driver = SubmitInputDriver.findWithText('Submit 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('does not match `input` elements without type "submit"', () => {
      render(`
        <input id="input-2" type="submit" value="Submit 2" />
        <input id="input-1" type="text" value="Submit 1" />
      `)
      driver = SubmitInputDriver.findWithText('Submit 1')
      expect(driver).to.be.null
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <input id="input-2" type="submit" value="Submit 2" />
        </div>
        <div id="container-2">
          <input id="input-1" type="submit" value="Submit 1" />
        </div>
      `)
      driver = SubmitInputDriver.findWithText('Submit 1', $container.querySelector('#container-2'))
      expect(driver.$element).to.equal(getInput())
    })

    it('ignores surrouding whitespace', () => {
      render(`
        <input id="input-1" type="submit" value="
          Submit 1
        " />
      `)
      driver = SubmitInputDriver.findWithText('Submit 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('returns null when nothing matches', () => {
      driver = SubmitInputDriver.findWithText('Submit 1')
      expect(driver).to.equal(null)
    })
  })

  describe('#$element', () => {
    it('is the `input` element', () => {
      render('<input id="input-1" type="submit" value="Submit 1" />')
      expect(driver.$element).to.equal(getInput())
    })
  })

  describe('#id', () => {
    it('is the id the `input`', () => {
      render('<input id="input-1" type="submit" value="Submit 1" />')
      expect(driver.id).to.equal('input-1')
    })

    it('is null when the `input` has no id', () => {
      render('<input id="input-1" type="submit" value="Submit 1" />')
      getInput().removeAttribute('id')
      expect(driver.id).to.be.null
    })
  })

  describe('#text', () => {
    it('is the value of the `input`', () => {
      render('<input id="input-1" type="submit" value="Submit 1" />')
      expect(driver.text).to.equal('Submit 1')
    })

    it('trims surrounding whitespace', () => {
      render(`
        <input id="input-1" type="submit" value="
          Submit 1
        " />
      `)
      expect(driver.text).to.equal('Submit 1')
    })
  })

  describe('#disabled', () => {
    it('is true when the `input` is disabled', () => {
      render('<input disabled id="input-1" type="submit" value="Submit 1" />')
      expect(driver.disabled).to.equal(true)
    })

    it('is false when the `input` is not disabled', () => {
      render('<input id="input-1" type="submit" value="Submit 1" />')
      expect(driver.disabled).to.equal(false)
    })
  })

  describe('#focused', () => {
    it('is true when the `input` has focus', () => {
      render('<input id="input-1" type="submit" value="Submit 1" />')
      getInput().focus()
      expect(driver.focused).to.equal(true)
    })

    it('is false when the `input` does not have focus', () => {
      render('<input id="input-1" type="submit" value="Submit 1" />')
      expect(driver.focused).to.equal(false)
    })
  })

  describe('#click()', () => {
    it('propagates a "click" event', () => {
      const eventSpy = sinon.spy()
      $container.addEventListener('click', eventSpy, false)
      render('<input id="input-1" type="submit" value="Submit 1" />')
      driver.click()
      expect(eventSpy.callCount).to.equal(1)
    })
  })

  describe('#focus()', () => {
    let eventSpy

    beforeEach(() => {
      render('<input id="input-1" type="submit" value="Submit 1" />')
      listenForFocus()
    })

    function listenForFocus() {
      eventSpy = sinon.spy()
      getInput().addEventListener('focus', eventSpy, false)
    }

    it('sets focus on the `input`', () => {
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

    it('does nothing when the `input` already has focus', () => {
      getInput().focus()
      listenForFocus()
      driver.focus()
      expect(eventSpy.callCount).to.equal(0)
    })
  })

  describe('#keyDown()', () => {
    let eventSpy

    beforeEach(() => {
      render('<input id="input-1" type="submit" value="Submit 1" />')
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
})

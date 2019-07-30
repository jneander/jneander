import sinon from 'sinon'

import {createContainer, renderString} from '../../..'
import ButtonDriver from '../ButtonDriver'

describe('Element Drivers > Commands > ButtonDriver', () => {
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
    driver = new ButtonDriver(getButton())
  }

  function getButton(idNumber = 1) {
    return document.body.querySelector(`#button-${idNumber}`)
  }

  describe('.findAll()', () => {
    let buttons

    it('matches `button` elements', () => {
      render(`
        <button id="button-2">Button 2</button>
        <button id="button-1">Button 1</button>
      `)
      buttons = ButtonDriver.findAll()
      expect(buttons.map(button => button.id)).to.have.members(['button-1', 'button-2'])
    })

    it('matches elements with the "button" role', () => {
      render(`
        <div>
          <span id="button-1" role="button">Button 1</span>
          <span id="button-2" role="button">Button 1</span>
        </div>
      `)
      buttons = ButtonDriver.findAll()
      expect(buttons.map(button => button.id)).to.have.members(['button-1', 'button-2'])
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <button id="button-2">Button 1</button>
        </div>
        <div id="container-2">
          <button id="button-1">Button 1</button>
        </div>
      `)
      buttons = ButtonDriver.findAll($container.querySelector('#container-2'))
      expect(buttons.map(button => button.id)).to.have.members(['button-1'])
    })
  })

  describe('.findWithText()', () => {
    it('matches `button` elements', () => {
      render(`
        <button id="button-2">Button 2</button>
        <button id="button-1">Button 1</button>
      `)
      driver = ButtonDriver.findWithText('Button 1')
      expect(driver.$element).to.equal(getButton())
    })

    it('matches elements with the "button" role', () => {
      render(`
        <div>
          <span id="button-1" role="button">Button 1</span>
        </div>
      `)
      driver = ButtonDriver.findWithText('Button 1')
      expect(driver.$element).to.equal(getButton())
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <button id="button-2">Button 1</button>
        </div>
        <div id="container-2">
          <button id="button-1">Button 1</button>
        </div>
      `)
      driver = ButtonDriver.findWithText('Button 1', $container.querySelector('#container-2'))
      expect(driver.$element).to.equal(getButton())
    })

    it('matches deeply-nested text', () => {
      render('<button id="button-1"><span><span>Button 1</span></span></button>')
      driver = ButtonDriver.findWithText('Button 1')
      expect(driver.$element).to.equal(getButton())
    })

    it('ignores surrouding whitespace', () => {
      render(`
        <button id="button-1">
          Button 1
        </button>
      `)
      driver = ButtonDriver.findWithText('Button 1')
      expect(driver.$element).to.equal(getButton())
    })

    it('returns null when nothing matches', () => {
      driver = ButtonDriver.findWithText('Button 1')
      expect(driver).to.equal(null)
    })
  })

  describe('#$element', () => {
    it('is the `button` element', () => {
      render('<button id="button-1">Button 1</button>')
      expect(driver.$element).to.equal(getButton())
    })
  })

  describe('#id', () => {
    it('is the id the `button`', () => {
      render('<button id="button-1">Button 1</button>')
      expect(driver.id).to.equal('button-1')
    })

    it('is null when the `button` has no id', () => {
      render('<button id="button-1"><span><span>Button 1</span></span></button>')
      getButton().removeAttribute('id')
      expect(driver.id).to.be.null
    })
  })

  describe('#text', () => {
    it('is the text content of the `button`', () => {
      render('<button id="button-1">Button 1</button>')
      expect(driver.text).to.equal('Button 1')
    })

    it('includes deeply-nested text', () => {
      render('<button id="button-1"><span><span>Button 1</span></span></button>')
      expect(driver.text).to.equal('Button 1')
    })

    it('trims surrounding whitespace', () => {
      render(`
        <button id="button-1">
          Button 1
        </button>
      `)
      expect(driver.text).to.equal('Button 1')
    })
  })

  describe('#disabled', () => {
    it('is true when the `button` is disabled', () => {
      render('<button disabled id="button-1">Button 1</button>')
      expect(driver.disabled).to.equal(true)
    })

    it('is false when the `button` is not disabled', () => {
      render('<button id="button-1">Button 1</button>')
      expect(driver.disabled).to.equal(false)
    })
  })

  describe('#focused', () => {
    it('is true when the `button` has focus', () => {
      render('<button id="button-1">Button 1</button>')
      getButton().focus()
      expect(driver.focused).to.equal(true)
    })

    it('is false when the `button` does not have focus', () => {
      render('<button id="button-1">Button 1</button>')
      expect(driver.focused).to.equal(false)
    })
  })

  describe('#click()', () => {
    it('propagates a "click" event', () => {
      const eventSpy = sinon.spy()
      $container.addEventListener('click', eventSpy, false)
      render('<button id="button-1">Button 1</button>')
      driver.click()
      expect(eventSpy.callCount).to.equal(1)
    })
  })

  describe('#focus()', () => {
    let eventSpy

    beforeEach(() => {
      render('<button id="button-1">Button 1</button>')
      listenForFocus()
    })

    function listenForFocus() {
      eventSpy = sinon.spy()
      getButton().addEventListener('focus', eventSpy, false)
    }

    it('sets focus on the `button`', () => {
      driver.focus()
      expect(document.activeElement).to.equal(getButton())
    })

    it('propagates a "focus" event', () => {
      driver.focus()
      const specCaveat =
        'When running this spec locally in a browser with devtools open, ' +
        'this behavior will not occur.'
      expect(eventSpy.callCount).to.equal(1, specCaveat)
    })

    it('does nothing when the `button` already has focus', () => {
      getButton().focus()
      listenForFocus()
      driver.focus()
      expect(eventSpy.callCount).to.equal(0)
    })
  })

  describe('#keyDown()', () => {
    let eventSpy

    beforeEach(() => {
      render('<button id="button-1">Button 1</button>')
      eventSpy = sinon.spy()
      getButton().addEventListener('keydown', eventSpy, false)
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

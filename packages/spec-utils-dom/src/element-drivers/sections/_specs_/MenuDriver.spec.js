import sinon from 'sinon'

import {createContainer, renderString} from '../../..'
import MenuDriver from '../MenuDriver'

describe('Element Drivers > Sections > MenuDriver', () => {
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
    driver = new MenuDriver(getMenu())
  }

  function getMenu() {
    return document.body.querySelector(`#menu-1`)
  }

  describe('.findWithLabelText()', () => {
    it('matches elements with the "menu" rule', () => {
      render(`
        <div aria-label="Menu 1" id="menu-1" role="menu" tabindex="0"></div>
        <div aria-label="Menu 2" id="menu-2" role="menu" tabindex="0"></div>
      `)
      driver = MenuDriver.findWithLabelText('Menu 1')
      expect(driver.$element).to.equal(getMenu())
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <div aria-label="Menu 1" id="menu-2" role="menu" tabindex="0"></div>
        </div>
        <div id="container-2">
          <div aria-label="Menu 1" id="menu-1" role="menu" tabindex="0"></div>
        </div>
      `)
      const $parent = $container.querySelector('#container-2')
      driver = MenuDriver.findWithLabelText('Menu 1', $parent)
      expect(driver.$element).to.equal(getMenu())
    })

    it('ignores surrouding whitespace', () => {
      render(`
        <div aria-label="  Menu 1  " id="menu-1" role="menu" tabindex="0"></div>
      `)
      driver = MenuDriver.findWithLabelText('Menu 1')
      expect(driver.$element).to.equal(getMenu())
    })

    it('returns null when nothing matches', () => {
      driver = MenuDriver.findWithLabelText('Menu 1')
      expect(driver).to.equal(null)
    })
  })

  describe('#$element', () => {
    it('is the `input` element', () => {
      render('<div aria-label="Menu 1" id="menu-1" role="menu" tabindex="0"></div>')
      expect(driver.$element).to.equal(getMenu())
    })
  })

  describe('#labelTexts', () => {
    it('is the list of label texts for the `textarea`', () => {
      render('<div aria-label="Menu 1" id="menu-1" role="menu" tabindex="0"></div>')
      expect(driver.labelTexts).to.have.members(['Menu 1'])
    })
  })

  describe('#focused', () => {
    it('is true when the `textarea` has focus', () => {
      render('<div aria-label="Menu 1" id="menu-1" role="menu" tabindex="0"></div>')
      getMenu().focus()
      expect(driver.focused).to.equal(true)
    })

    it('is false when the `textarea` does not have focus', () => {
      render('<div aria-label="Menu 1" id="menu-1" role="menu" tabindex="0"></div>')
      expect(driver.focused).to.equal(false)
    })
  })

  describe('#keyDown()', () => {
    let eventSpy

    beforeEach(() => {
      render('<div aria-label="Menu 1" id="menu-1" role="menu" tabindex="0"></div>')
      eventSpy = sinon.spy()
      getMenu().addEventListener('keydown', eventSpy, false)
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

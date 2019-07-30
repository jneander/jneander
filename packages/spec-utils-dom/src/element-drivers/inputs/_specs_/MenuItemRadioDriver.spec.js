import sinon from 'sinon'

import {createContainer, renderString} from '../../..'
import MenuItemRadioDriver from '../MenuItemRadioDriver'

describe('Element Drivers > Commands > MenuItemRadioDriver', () => {
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
    driver = new MenuItemRadioDriver(getItem())
  }

  function getItem(idNumber = 1) {
    return document.body.querySelector(`#item-${idNumber}`)
  }

  describe('.findAll()', () => {
    let items

    it('matches elements with the "menuitemradio" role', () => {
      render(`
        <div id="container-1">
          <span id="item-1" role="menuitemradio">Item 1</span>
          <span id="item-2" role="menuitemradio">Item 1</span>
        </div>
      `)
      items = MenuItemRadioDriver.findAll($container.querySelector('#container-1'))
      expect(items.map(item => item.id)).to.have.members(['item-1', 'item-2'])
    })

    it('ignores elements outside the given parent element', () => {
      render(`
        <div id="container-1">
          <button id="item-2" role="menuitemradio">Item 1</button>
        </div>
        <div id="container-2">
          <button id="item-1" role="menuitemradio">Item 1</button>
        </div>
      `)
      items = MenuItemRadioDriver.findAll($container.querySelector('#container-2'))
      expect(items.map(item => item.id)).to.have.members(['item-1'])
    })
  })

  describe('.findWithText()', () => {
    it('matches elements with the "menuitemradio" role', () => {
      render(`
        <div>
          <span id="item-1" role="menuitemradio">Item 1</span>
        </div>
      `)
      driver = MenuItemRadioDriver.findWithText('Item 1')
      expect(driver.$element).to.equal(getItem())
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <button id="item-2" role="menuitemradio">Item 1</button>
        </div>
        <div id="container-2">
          <button id="item-1" role="menuitemradio">Item 1</button>
        </div>
      `)
      driver = MenuItemRadioDriver.findWithText('Item 1', $container.querySelector('#container-2'))
      expect(driver.$element).to.equal(getItem())
    })

    it('matches deeply-nested text', () => {
      render('<button id="item-1" role="menuitemradio"><span><span>Item 1</span></span></button>')
      driver = MenuItemRadioDriver.findWithText('Item 1')
      expect(driver.$element).to.equal(getItem())
    })

    it('ignores surrouding whitespace', () => {
      render(`
        <button id="item-1" role="menuitemradio">
          Item 1
        </button>
      `)
      driver = MenuItemRadioDriver.findWithText('Item 1')
      expect(driver.$element).to.equal(getItem())
    })

    it('returns null when nothing matches', () => {
      driver = MenuItemRadioDriver.findWithText('Item 1')
      expect(driver).to.equal(null)
    })
  })

  describe('#$element', () => {
    it('is the element with the "menuitemradio" role', () => {
      render('<button id="item-1" role="menuitemradio">Item 1</button>')
      expect(driver.$element).to.equal(getItem())
    })
  })

  describe('#id', () => {
    it('is the id the element', () => {
      render('<button id="item-1" "menuitemradio">Item 1</button>')
      expect(driver.text).to.equal('Item 1')
    })

    it('is null when the element has no id', () => {
      render('<button id="item-1" "menuitemradio"><span><span>Item 1</span></span></button>')
      getItem().removeAttribute('id')
      expect(driver.id).to.be.null
    })
  })

  describe('#text', () => {
    it('is the text content of the element', () => {
      render('<button id="item-1" role="menuitemradio">Item 1</button>')
      expect(driver.text).to.equal('Item 1')
    })

    it('includes deeply-nested text', () => {
      render('<button id="item-1" role="menuitemradio"><span><span>Item 1</span></span></button>')
      expect(driver.text).to.equal('Item 1')
    })

    it('trims surrounding whitespace', () => {
      render(`
        <button id="item-1" role="menuitemradio">
          Item 1
        </button>
      `)
      expect(driver.text).to.equal('Item 1')
    })
  })

  describe('#disabled', () => {
    it('is true when the element is disabled', () => {
      render('<button disabled id="item-1" role="menuitemradio">Item 1</button>')
      expect(driver.disabled).to.equal(true)
    })

    it('is false when the element is not disabled', () => {
      render('<button id="item-1" role="menuitemradio">Item 1</button>')
      expect(driver.disabled).to.equal(false)
    })
  })

  describe('#focused', () => {
    it('is true when the element has focus', () => {
      render('<button id="item-1" role="menuitemradio">Item 1</button>')
      getItem().focus()
      expect(driver.focused).to.equal(true)
    })

    it('is false when the element does not have focus', () => {
      render('<button id="item-1" role="menuitemradio">Item 1</button>')
      expect(driver.focused).to.equal(false)
    })
  })

  describe('#click()', () => {
    it('propagates a "click" event', () => {
      const eventSpy = sinon.spy()
      $container.addEventListener('click', eventSpy, false)
      render('<button id="item-1" role="menuitemradio">Item 1</button>')
      driver.click()
      expect(eventSpy.callCount).to.equal(1)
    })
  })

  describe('#focus()', () => {
    let eventSpy

    beforeEach(() => {
      render('<button id="item-1" role="menuitemradio">Item 1</button>')
      listenForFocus()
    })

    function listenForFocus() {
      eventSpy = sinon.spy()
      getItem().addEventListener('focus', eventSpy, false)
    }

    it('sets focus on the element', () => {
      driver.focus()
      expect(document.activeElement).to.equal(getItem())
    })

    it('propagates a "focus" event', () => {
      driver.focus()
      const specCaveat =
        'When running this spec locally in a browser with devtools open, ' +
        'this behavior will not occur.'
      expect(eventSpy.callCount).to.equal(1, specCaveat)
    })

    it('does nothing when the element already has focus', () => {
      getItem().focus()
      listenForFocus()
      driver.focus()
      expect(eventSpy.callCount).to.equal(0)
    })
  })
})

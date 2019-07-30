import sinon from 'sinon'

import {createContainer, renderString} from '../../..'
import LinkDriver from '../LinkDriver'

describe('Element Drivers > Commands > LinkDriver', () => {
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
    driver = new LinkDriver(getLink())
  }

  function getLink() {
    return document.body.querySelector(`#link-1`)
  }

  describe('.findAll()', () => {
    let links

    it('matches `a` elements', () => {
      render(`
        <a id="link-2">Link 2</a>
        <a id="link-1">Link 1</a>
      `)
      links = LinkDriver.findAll()
      expect(links.map(link => link.id)).to.have.members(['link-1', 'link-2'])
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <a href="http://localhost" id="link-2">Link 1</a>
        </div>
        <div id="container-2">
          <a href="http://localhost" id="link-1">Link 1</a>
        </div>
      `)
      links = LinkDriver.findAll($container.querySelector('#container-2'))
      expect(links.map(link => link.id)).to.have.members(['link-1'])
    })
  })

  describe('.findWithText()', () => {
    it('matches `a` elements', () => {
      render(`
        <a href="http://localhost" id="link-2">Link 2</a>
        <a href="http://localhost" id="link-1">Link 1</a>
      `)
      driver = LinkDriver.findWithText('Link 1')
      expect(driver.$element).to.equal(getLink())
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <a href="http://localhost" id="link-2">Link 1</a>
        </div>
        <div id="container-2">
          <a href="http://localhost" id="link-1">Link 1</a>
        </div>
      `)
      driver = LinkDriver.findWithText('Link 1', $container.querySelector('#container-2'))
      expect(driver.$element).to.equal(getLink())
    })

    it('matches deeply-nested text', () => {
      render('<a href="http://localhost" id="link-1"><span><span>Link 1</span></span></a>')
      driver = LinkDriver.findWithText('Link 1')
      expect(driver.$element).to.equal(getLink())
    })

    it('ignores surrouding whitespace', () => {
      render(`
        <a href="http://localhost" id="link-1">
          Link 1
        </a>
      `)
      driver = LinkDriver.findWithText('Link 1')
      expect(driver.$element).to.equal(getLink())
    })

    it('returns null when nothing matches', () => {
      driver = LinkDriver.findWithText('Link 1')
      expect(driver).to.equal(null)
    })
  })

  describe('#$element', () => {
    it('is the anchor element element', () => {
      render('<a href="http://localhost" id="link-1">Link 1</a>')
      expect(driver.$element).to.equal(getLink())
    })
  })

  describe('#id', () => {
    it('is the id the `a`', () => {
      render('<a href="http://localhost" id="link-1">Link 1</a>')
      expect(driver.text).to.equal('Link 1')
    })

    it('is null when the `a` has no id', () => {
      render('<a href="http://localhost" id="link-1"><span><span>Link 1</span></span></a>')
      getLink().removeAttribute('id')
      expect(driver.id).to.be.null
    })
  })

  describe('#text', () => {
    it('is the text content the anchor element', () => {
      render('<a href="http://localhost" id="link-1">Link 1</a>')
      expect(driver.text).to.equal('Link 1')
    })

    it('includes deeply-nested text', () => {
      render('<a href="http://localhost" id="link-1"><span><span>Link 1</span></span></a>')
      expect(driver.text).to.equal('Link 1')
    })

    it('trims surrounding whitespace', () => {
      render(`
        <a href="http://localhost" id="link-1">
          Link 1
        </a>
      `)
      expect(driver.text).to.equal('Link 1')
    })
  })

  describe('#href', () => {
    it('is the value of the "href" attribute', () => {
      render('<a href="http://localhost/" id="link-1">Link 1</a>')
      expect(driver.href).to.equal('http://localhost/')
    })

    it('trims surrounding whitespace', () => {
      render('<a href=" http://localhost/ " id="link-1">Link 1</a>')
      expect(driver.href).to.equal('http://localhost/')
    })

    it('is null when the anchor has no "href" attribute', () => {
      render('<a id="link-1">Link 1</a>')
      expect(driver.href).to.be.null
    })
  })

  describe('#focused', () => {
    it('is true when the anchor element has focus', () => {
      render('<a href="http://localhost/" id="link-1">Link 1</a>')
      getLink().focus()
      expect(driver.focused).to.equal(true)
    })

    it('is false when the anchor element does not have focus', () => {
      render('<a href="http://localhost/" id="link-1">Link 1</a>')
      expect(driver.focused).to.equal(false)
    })

    it('is false when the anchor element does not have an "href" attribute', () => {
      render('<a id="link-1">Link 1</a>')
      getLink().focus()
      expect(driver.focused).to.equal(false)
    })
  })

  describe('#click()', () => {
    it('propagates a "click" event', () => {
      const onClick = sinon.stub().callsFake(event => {
        event.preventDefault()
      })
      $container.addEventListener('click', onClick, false)
      render('<a href="http://localhost/" id="link-1">Link 1</a>')
      driver.click()
      expect(onClick.callCount).to.equal(1)
    })
  })

  describe('#focus()', () => {
    let eventSpy

    function listenForFocus() {
      eventSpy = sinon.spy()
      getLink().addEventListener('focus', eventSpy, false)
    }

    describe('when the anchor element has an "href" attribute', () => {
      beforeEach(() => {
        render('<a href="http://localhost/" id="link-1">Link 1</a>')
        listenForFocus()
      })

      it('sets focus on the anchor element', () => {
        driver.focus()
        expect(document.activeElement).to.equal(getLink())
      })

      it('propagates a "focus" event', () => {
        driver.focus()
        const specCaveat =
          'When running this spec locally in a browser with devtools open, ' +
          'this behavior will not occur.'
        expect(eventSpy.callCount).to.equal(1, specCaveat)
      })

      it('does nothing when the anchor element already has focus', () => {
        getLink().focus()
        listenForFocus()
        driver.focus()
        expect(eventSpy.callCount).to.equal(0)
      })
    })

    describe('when the anchor element does not have an "href" attribute', () => {
      beforeEach(() => {
        render('<a id="link-1">Link 1</a>')
        listenForFocus()
      })

      it('does not set focus on the anchor element', () => {
        driver.focus()
        expect(document.activeElement).not.to.equal(getLink())
      })

      it('does not propagate a "focus" event', () => {
        driver.focus()
        expect(eventSpy.callCount).to.equal(0)
      })
    })
  })
})

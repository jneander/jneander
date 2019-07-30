import {createContainer, renderString} from '../../..'
import HeadingDriver from '../HeadingDriver'

describe('Element Drivers > Sectionheads > HeadingDriver', () => {
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
    driver = new HeadingDriver(getHeading())
  }

  function getHeading() {
    return document.body.querySelector(`#heading-1`)
  }

  describe('.find()', () => {
    it('matches `h1` elements', () => {
      render(`<h1 id="heading-1">Heading 1</h1>`)
      driver = HeadingDriver.find()
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches `h2` elements', () => {
      render(`<h2 id="heading-1">Heading 1</h2>`)
      driver = HeadingDriver.find()
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches `h3` elements', () => {
      render(`<h3 id="heading-1">Heading 1</h3>`)
      driver = HeadingDriver.find()
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches `h4` elements', () => {
      render(`<h4 id="heading-1">Heading 1</h4>`)
      driver = HeadingDriver.find()
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches `h5` elements', () => {
      render(`<h5 id="heading-1">Heading 1</h5>`)
      driver = HeadingDriver.find()
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches `h6` elements', () => {
      render(`<h6 id="heading-1">Heading 1</h6>`)
      driver = HeadingDriver.find()
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches the first element when multiple matches exist', () => {
      render(`
        <h3 id="heading-1">Heading 3</h1>
        <h2 id="heading-2">Heading 1</h1>
      `)
      driver = HeadingDriver.find()
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches elements with the "heading" role', () => {
      render(`
        <div>
          <span id="heading-1" role="heading">Heading 1</span>
        </div>
      `)
      driver = HeadingDriver.find()
      expect(driver.$element).to.equal(getHeading())
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <h1 id="heading-2">Heading 1</h1>
        </div>
        <div id="container-2">
          <h1 id="heading-1">Heading 1</h1>
        </div>
      `)
      driver = HeadingDriver.find($container.querySelector('#container-2'))
      expect(driver.$element).to.equal(getHeading())
    })

    it('returns null when nothing matches', () => {
      driver = HeadingDriver.find()
      expect(driver).to.equal(null)
    })
  })

  describe('.findWithText()', () => {
    it('matches `h1` elements', () => {
      render(`
        <h1 id="heading-2">Heading 2</h1>
        <h1 id="heading-1">Heading 1</h1>
      `)
      driver = HeadingDriver.findWithText('Heading 1')
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches `h2` elements', () => {
      render(`
        <h2 id="heading-2">Heading 2</h2>
        <h2 id="heading-1">Heading 1</h2>
      `)
      driver = HeadingDriver.findWithText('Heading 1')
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches `h3` elements', () => {
      render(`
        <h3 id="heading-2">Heading 2</h3>
        <h3 id="heading-1">Heading 1</h3>
      `)
      driver = HeadingDriver.findWithText('Heading 1')
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches `h4` elements', () => {
      render(`
        <h4 id="heading-2">Heading 2</h4>
        <h4 id="heading-1">Heading 1</h4>
      `)
      driver = HeadingDriver.findWithText('Heading 1')
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches `h5` elements', () => {
      render(`
        <h5 id="heading-2">Heading 2</h5>
        <h5 id="heading-1">Heading 1</h5>
      `)
      driver = HeadingDriver.findWithText('Heading 1')
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches `h6` elements', () => {
      render(`
        <h6 id="heading-2">Heading 2</h6>
        <h6 id="heading-1">Heading 1</h6>
      `)
      driver = HeadingDriver.findWithText('Heading 1')
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches elements with the "heading" role', () => {
      render(`
        <div>
          <span id="heading-1" role="heading">Heading 1</span>
        </div>
      `)
      driver = HeadingDriver.findWithText('Heading 1')
      expect(driver.$element).to.equal(getHeading())
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <h1 id="heading-2">Heading 1</h1>
        </div>
        <div id="container-2">
          <h1 id="heading-1">Heading 1</h1>
        </div>
      `)
      driver = HeadingDriver.findWithText('Heading 1', $container.querySelector('#container-2'))
      expect(driver.$element).to.equal(getHeading())
    })

    it('matches deeply-nested text', () => {
      render('<h1 id="heading-1"><span><span>Heading 1</span></span></h1>')
      driver = HeadingDriver.findWithText('Heading 1')
      expect(driver.$element).to.equal(getHeading())
    })

    it('ignores surrouding whitespace', () => {
      render(`
        <h1 id="heading-1">
          Heading 1
        </h1>
      `)
      driver = HeadingDriver.findWithText('Heading 1')
      expect(driver.$element).to.equal(getHeading())
    })

    it('returns null when nothing matches', () => {
      driver = HeadingDriver.findWithText('Heading 1')
      expect(driver).to.equal(null)
    })
  })

  describe('#$element', () => {
    it('is the `h1` element', () => {
      render('<h1 id="heading-1">Heading 1</h1>')
      expect(driver.$element).to.equal(getHeading())
    })

    it('is the `h2` element', () => {
      render('<h2 id="heading-1">Heading 1</h2>')
      expect(driver.$element).to.equal(getHeading())
    })

    it('is the `h3` element', () => {
      render('<h3 id="heading-1">Heading 1</h3>')
      expect(driver.$element).to.equal(getHeading())
    })

    it('is the `h4` element', () => {
      render('<h4 id="heading-1">Heading 1</h4>')
      expect(driver.$element).to.equal(getHeading())
    })

    it('is the `h5` element', () => {
      render('<h5 id="heading-1">Heading 1</h5>')
      expect(driver.$element).to.equal(getHeading())
    })

    it('is the `h6` element', () => {
      render('<h6 id="heading-1">Heading 1</h6>')
      expect(driver.$element).to.equal(getHeading())
    })

    it('is the element with the "heading" role', () => {
      render('<span id="heading-1" role="heading" aria-level="1">Heading 1</span>')
      expect(driver.$element).to.equal(getHeading())
    })
  })

  describe('#text', () => {
    it('is the text content the heading', () => {
      render('<h1 id="heading-1">Heading 1</h1>')
      expect(driver.text).to.equal('Heading 1')
    })

    it('includes deeply-nested text', () => {
      render('<h1 id="heading-1"><span><span>Heading 1</span></span></h1>')
      expect(driver.text).to.equal('Heading 1')
    })

    it('trims surrounding whitespace', () => {
      render(`
        <h1 id="heading-1">
          Heading 1
        </h1>
      `)
      expect(driver.text).to.equal('Heading 1')
    })
  })

  describe('#level', () => {
    it('is 1 when the heading is an `h1`', () => {
      render('<h1 id="heading-1">Heading 1</h1>')
      expect(driver.level).to.equal(1)
    })

    it('is 2 when the heading is an `h2`', () => {
      render('<h2 id="heading-1">Heading 2</h2>')
      expect(driver.level).to.equal(2)
    })

    it('is 3 when the heading is an `h3`', () => {
      render('<h3 id="heading-1">Heading 3</h3>')
      expect(driver.level).to.equal(3)
    })

    it('is 4 when the heading is an `h4`', () => {
      render('<h4 id="heading-1">Heading 4</h4>')
      expect(driver.level).to.equal(4)
    })

    it('is 5 when the heading is an `h5`', () => {
      render('<h5 id="heading-1">Heading 5</h5>')
      expect(driver.level).to.equal(5)
    })

    it('is 6 when the heading is an `h6`', () => {
      render('<h6 id="heading-1">Heading 6</h6>')
      expect(driver.level).to.equal(6)
    })

    describe('when the element uses the "heading" role', () => {
      it('returns the value of the aria-level attribute', () => {
        render('<span id="heading-1" role="heading" aria-level="2">Heading 2</span>')
        expect(driver.level).to.equal(2)
      })

      it('returns undefined when the aria-level is not specified', () => {
        render('<span id="heading-1" role="heading">Heading 2</span>')
        expect(driver.level).to.be.undefined
      })
    })
  })
})

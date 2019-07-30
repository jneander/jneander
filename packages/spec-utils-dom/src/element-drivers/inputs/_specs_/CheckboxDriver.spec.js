import sinon from 'sinon'

import {createContainer, renderString} from '../../..'
import CheckboxDriver from '../CheckboxDriver'

describe('Element Drivers > Inputs > CheckboxDriver', () => {
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
    driver = new CheckboxDriver(getInput())
  }

  function getInput() {
    return document.body.querySelector(`#input-1`)
  }

  describe('.findWithLabelText()', () => {
    it('matches `input` elements with the "checkbox" type', () => {
      render(`
        <label>Input 2<input id="input-2" type="checkbox" /></label>
        <label>Input 1<input id="input-3" type="text" /></label>
        <label>Input 1<input id="input-1" type="checkbox" /></label>
      `)
      driver = CheckboxDriver.findWithLabelText('Input 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('optionally searches within the given parent element', () => {
      render(`
        <div id="container-1">
          <label>Input 1<input id="input-2" type="checkbox" /></label>
        </div>
        <div id="container-2">
          <label>Input 1<input id="input-1" type="checkbox" /></label>
        </div>
      `)
      const $parent = $container.querySelector('#container-2')
      driver = CheckboxDriver.findWithLabelText('Input 1', $parent)
      expect(driver.$element).to.equal(getInput())
    })

    it('matches deeply-nested text', () => {
      render('<label><span>Input 1</span><input id="input-1" type="checkbox" /></label>')
      driver = CheckboxDriver.findWithLabelText('Input 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('ignores surrouding whitespace', () => {
      render(`
        <label>
          Input 1
          <input id="input-1" type="checkbox" />
        </label>
      `)
      driver = CheckboxDriver.findWithLabelText('Input 1')
      expect(driver.$element).to.equal(getInput())
    })

    it('returns null when nothing matches', () => {
      driver = CheckboxDriver.findWithLabelText('Input 1')
      expect(driver).to.equal(null)
    })
  })

  describe('#$element', () => {
    it('is the `input` element', () => {
      render('<input id="input-1" type="checkbox" />')
      expect(driver.$element).to.equal(getInput())
    })
  })

  describe('#labelTexts', () => {
    it('is the list of label texts for the `checkbox`', () => {
      render(`
        <label id="label-1">
          Label 1
          <input id="input-1" type="checkbox" />
        </label>
      `)
      expect(driver.labelTexts).to.have.members(['Label 1'])
    })
  })

  describe('#$labels', () => {
    it('is the list of `label` elements for the `checkbox`', () => {
      render(`
        <label id="label-1">
          Label 1
          <input id="input-1" type="checkbox" />
        </label>
      `)
      expect(driver.$labels).to.have.members([$container.querySelector('label')])
    })
  })

  describe('#focused', () => {
    it('is true when the `checkbox` has focus', () => {
      render('<input id="input-1" type="checkbox" />')
      getInput().focus()
      expect(driver.focused).to.equal(true)
    })

    it('is false when the `checkbox` does not have focus', () => {
      render('<input id="input-1" type="checkbox" />')
      expect(driver.focused).to.equal(false)
    })
  })

  describe('#checked', () => {
    it('is true when the `checkbox` is checked', () => {
      render('<input id="input-1" type="checkbox" checked />')
      expect(driver.checked).to.equal(true)
    })

    it('is false when the `checkbox` is unchecked', () => {
      render('<input id="input-1" type="checkbox" />')
      expect(driver.checked).to.equal(false)
    })
  })

  describe('#setChecked()', () => {
    let changeSpy
    let clickSpy
    let inputSpy

    beforeEach(() => {
      changeSpy = sinon.spy()
      $container.addEventListener('change', changeSpy, false)
      clickSpy = sinon.spy()
      $container.addEventListener('click', clickSpy, false)
      inputSpy = sinon.spy()
      $container.addEventListener('input', inputSpy, false)
    })

    describe('when the `checkbox` is unchecked', () => {
      beforeEach(() => {
        render('<input id="input-1" type="checkbox" />')
      })

      describe('when checking the checkbox', () => {
        beforeEach(() => {
          driver.setChecked(true)
        })

        it('sets the checkbox as checked', () => {
          expect(driver.checked).to.equal(true)
        })

        it('propagates a "change" event', () => {
          expect(changeSpy.callCount).to.equal(1)
        })

        it('propagates a "click" event', () => {
          expect(clickSpy.callCount).to.equal(1)
        })

        it('propagates an "input" event', () => {
          expect(inputSpy.callCount).to.equal(1)
        })
      })

      describe('when attempting to uncheck the checkbox', () => {
        beforeEach(() => {
          driver.setChecked(false)
        })

        it('does not change the checked state', () => {
          expect(driver.checked).to.equal(false)
        })

        it('does not propagate a "change" event', () => {
          expect(changeSpy.callCount).to.equal(0)
        })

        it('does not propagate a "click" event', () => {
          expect(clickSpy.callCount).to.equal(0)
        })

        it('does not propagate an "input" event', () => {
          expect(inputSpy.callCount).to.equal(0)
        })
      })
    })

    describe('when the `checkbox` is checked', () => {
      beforeEach(() => {
        render('<input id="input-1" type="checkbox" checked />')
      })

      describe('when unchecking the checkbox', () => {
        beforeEach(() => {
          driver.setChecked(false)
        })

        it('sets the checkbox as unchecked', () => {
          expect(driver.checked).to.equal(false)
        })

        it('propagates a "change" event', () => {
          expect(changeSpy.callCount).to.equal(1)
        })

        it('propagates a "click" event', () => {
          expect(clickSpy.callCount).to.equal(1)
        })

        it('propagates an "input" event', () => {
          expect(inputSpy.callCount).to.equal(1)
        })
      })

      describe('when attempting to check the checkbox', () => {
        beforeEach(() => {
          driver.setChecked(true)
        })

        it('does not change the checked state', () => {
          expect(driver.checked).to.equal(true)
        })

        it('does not propagate a "change" event', () => {
          expect(changeSpy.callCount).to.equal(0)
        })

        it('does not propagate a "click" event', () => {
          expect(clickSpy.callCount).to.equal(0)
        })

        it('does not propagate an "input" event', () => {
          expect(inputSpy.callCount).to.equal(0)
        })
      })
    })
  })

  describe('#click()', () => {
    it('checks the `checkbox` when unchecked', () => {
      render('<input id="input-1" type="checkbox" />')
      driver.click()
      expect(getInput().checked).to.equal(true)
    })

    it('unchecks the `checkbox` when checked', () => {
      render('<input id="input-1" type="checkbox" checked />')
      driver.click()
      expect(getInput().checked).to.equal(false)
    })
  })

  describe('#focus()', () => {
    let eventSpy

    beforeEach(() => {
      render('<input id="input-1" type="checkbox" />')
      listenForFocus()
    })

    function listenForFocus() {
      eventSpy = sinon.spy()
      getInput().addEventListener('focus', eventSpy, false)
    }

    it('sets focus on the `checkbox`', () => {
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

    it('does nothing when the `checkbox` already has focus', () => {
      getInput().focus()
      listenForFocus()
      driver.focus()
      expect(eventSpy.callCount).to.equal(0)
    })
  })
})

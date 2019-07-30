import {createContainer, renderString} from '../..'
import * as labels from '..'

describe('Properties > Labels', () => {
  let $container

  beforeEach(() => {
    $container = createContainer()
  })

  afterEach(() => {
    $container.remove()
  })

  function render(string) {
    return renderString(string, $container)
  }

  function getLabel(idNum) {
    return document.body.querySelector(`#label-${idNum}`)
  }

  function getInput(idNum) {
    return document.body.querySelector(`#input-${idNum}`)
  }

  describe('.labelElementsFor()', () => {
    function labelElementsFor(inputNum) {
      return labels.labelElementsFor(getInput(inputNum))
    }

    it('includes a parent `label` element', () => {
      render(`
        <label id="label-1">
          Label 1
          <input id="input-1" type="text" />
        </label>
      `)
      expect(labelElementsFor(1)).to.have.members([getLabel(1)])
    })

    it('includes `label` elements referencing the given element', () => {
      render(`
        <label for="input-1" id="label-1">Label 1</label>
        <input id="input-1" type="text" />
        <label id="label-2">Label 2</label>
        <label for="input-1" id="label-3">Label 3</label>
      `)
      expect(labelElementsFor(1)).to.have.members([getLabel(1), getLabel(3)])
    })

    it('includes elements associated using `aria-labelledby`', () => {
      render(`
        <div id="label-1">Label 1</div>
        <input aria-labelledby="label-1" id="input-1" type="text" />
      `)
      expect(labelElementsFor(1)).to.have.members([getLabel(1)])
    })

    it('excludes the element itself when labeled with `aria-label`', () => {
      render(`
        <input aria-label="Label 1" id="input-1" type="text" />
      `)
      expect(labelElementsFor(1)).to.have.members([])
    })

    it('includes all related labels', () => {
      // a11y Tip: Do not use these in combination. Pick one or the other.
      render(`
        <div id="label-1">Label 1</div>
        <div id="label-2">Label 2</div>
        <label for="input-1" id="label-3">Label 3</label>
        <input aria-labelledby="label-1 label-2" id="input-1" type="text" />
      `)
      expect(labelElementsFor(1)).to.have.members([getLabel(1), getLabel(2), getLabel(3)])
    })

    it('ignores `aria-labelledby` values without associated elements', () => {
      render(`
        <div id="label-1">Label 1</div>
        <input aria-labelledby="label-1 label-2" id="input-1" type="text" />
      `)
      expect(labelElementsFor(1)).to.have.members([getLabel(1)])
    })

    it('trims whitespace in `aria-labelledby` values', () => {
      render(`
        <div id="label-1">Label 1</div>
        <div id="label-2">Label 2</div>
        <input aria-labelledby=" label-1   label-2  " id="input-1" type="text" />
      `)
      expect(labelElementsFor(1)).to.have.members([getLabel(1), getLabel(2)])
    })
  })

  describe('.labelTextsFor()', () => {
    function labelTextsFor(inputNum) {
      return labels.labelTextsFor(getInput(inputNum))
    }

    it('includes a parent `label` element', () => {
      render(`
        <label id="label-1">
          Label 1
          <input id="input-1" type="text" />
        </label>
      `)
      expect(labelTextsFor(1)).to.have.members(['Label 1'])
    })

    it('includes `label` elements referencing the given element', () => {
      render(`
        <label for="input-1" id="label-1">Label 1</label>
        <input id="input-1" type="text" />
        <label id="label-2">Label 2</label>
        <label for="input-1" id="label-3">Label 3</label>
      `)
      expect(labelTextsFor(1)).to.have.members(['Label 1', 'Label 3'])
    })

    it('includes elements associated using `aria-labelledby`', () => {
      render(`
        <div id="label-1">Label 1</div>
        <input aria-labelledby="label-1" id="input-1" type="text" />
      `)
      expect(labelTextsFor(1)).to.have.members(['Label 1'])
    })

    it('includes the content of `aria-label` on the element itself', () => {
      render(`
        <input aria-label="Label 1" id="input-1" type="text" />
      `)
      expect(labelTextsFor(1)).to.have.members(['Label 1'])
    })

    it('trims the content of `aria-label`', () => {
      render(`
        <input aria-label="  Label 1  " id="input-1" type="text" />
      `)
      expect(labelTextsFor(1)).to.have.members(['Label 1'])
    })

    it('includes all related labels', () => {
      // a11y Tip: Do not use these in combination. Pick one or the other.
      render(`
        <div id="label-1">Label 1</div>
        <div id="label-2">Label 2</div>
        <label for="input-1" id="label-3">Label 3</label>
        <input aria-labelledby="label-1 label-2" id="input-1" type="text" />
      `)
      expect(labelTextsFor(1)).to.have.members(['Label 1', 'Label 2', 'Label 3'])
    })

    it('ignores `aria-labelledby` values without associated elements', () => {
      render(`
        <div id="label-1">Label 1</div>
        <input aria-labelledby="label-1 label-2" id="input-1" type="text" />
      `)
      expect(labelTextsFor(1)).to.have.members(['Label 1'])
    })

    it('trims whitespace in `aria-labelledby` values', () => {
      render(`
        <div id="label-1">Label 1</div>
        <div id="label-2">Label 2</div>
        <input aria-labelledby=" label-1   label-2  " id="input-1" type="text" />
      `)
      expect(labelTextsFor(1)).to.have.members(['Label 1', 'Label 2'])
    })

    it('ignores text content in nested elements', () => {
      render(`
        <label id="label-1">
          Label 1
          <textarea id="input-1">Textarea Content</textarea>
        </label>
      `)
      expect(labelTextsFor(1)).to.have.members(['Label 1'])
    })
  })
})

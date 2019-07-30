import {createContainer} from '@jneander/spec-utils-dom'

import * as queries from '../queries'

describe('Queries', () => {
  let $container

  beforeEach(() => {
    $container = createContainer()

    $container.innerHTML = `
      <div>
        <a id="link" href="http://localhost">Link</a>
        <button id="button">Button</button>

        <input id="text-input" type="text" />
        <input id="hidden-input" type="hidden" />
        <input id="checkbox-input" type="checkbox" />
        <input id="radio-input" type="radio" />
        <input id="submit-input" type="submit" />
        <input id="search-input" type="search" />

        <select id="select">
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </select>

        <textarea id="textarea"></textarea>

        <iframe id="iframe"></iframe>

        <span id="tabindex-container" tabindex="0">Content</span>
      </div>
    `
  })

  afterEach(() => {
    $container.remove()
  })

  function getById(id) {
    return $container.querySelector(`#${id}`)
  }

  describe('.findFocusable()', () => {
    function findFocusable() {
      return queries.findFocusable($container)
    }

    it('returns a list of elements', async () => {
      expect(findFocusable()).to.be.an('array').that.is.not.empty
    })

    it('includes links', () => {
      expect(findFocusable()).to.include(getById('link'))
    })

    it('excludes anchor tags without an href', () => {
      const $anchor = getById('link')
      $anchor.removeAttribute('href')
      expect(findFocusable()).not.to.include($anchor)
    })

    it('includes buttons', () => {
      expect(findFocusable()).to.include(getById('button'))
    })

    it('excludes disabled buttons', () => {
      const $button = getById('button')
      $button.disabled = true
      expect(findFocusable()).not.to.include($button)
    })

    it('includes text inputs', () => {
      expect(findFocusable()).to.include(getById('text-input'))
    })

    it('excludes disabled text inputs', () => {
      const $input = getById('text-input')
      $input.disabled = true
      expect(findFocusable()).not.to.include($input)
    })

    it('excludes hidden inputs', () => {
      expect(findFocusable()).not.to.include(getById('hidden-input'))
    })

    it('excludes disabled hidden inputs', () => {
      const $input = getById('hidden-input')
      $input.disabled = true
      expect(findFocusable()).not.to.include($input)
    })

    it('includes search inputs', () => {
      expect(findFocusable()).to.include(getById('search-input'))
    })

    it('excludes disabled search inputs', () => {
      const $input = getById('search-input')
      $input.disabled = true
      expect(findFocusable()).not.to.include($input)
    })

    it('includes select fields', () => {
      expect(findFocusable()).to.include(getById('select'))
    })

    it('excludes disabled select fields', () => {
      const $field = getById('select')
      $field.disabled = true
      expect(findFocusable()).not.to.include($field)
    })

    it('includes textarea fields', () => {
      expect(findFocusable()).to.include(getById('textarea'))
    })

    it('excludes disabled textarea fields', () => {
      const $field = getById('textarea')
      $field.disabled = true
      expect(findFocusable()).not.to.include($field)
    })

    it('includes iframes', () => {
      expect(findFocusable()).to.include(getById('iframe'))
    })

    it('includes containers with non-negative tabindex', () => {
      expect(findFocusable()).to.include(getById('tabindex-container'))
    })

    it('includes containers with negative tabindex', () => {
      const $el = getById('tabindex-container')
      $el.setAttribute('tabindex', '-1')
      expect(findFocusable()).to.include($el)
    })

    it('excludes containers with no tabindex', () => {
      const $el = getById('tabindex-container')
      $el.removeAttribute('tabindex')
      expect(findFocusable()).not.to.include($el)
    })
  })

  describe('.findTabbable()', () => {
    function findTabbable() {
      return queries.findTabbable($container)
    }

    it('returns a list of elements', async () => {
      expect(findTabbable()).to.be.an('array').that.is.not.empty
    })

    it('includes links', () => {
      expect(findTabbable()).to.include(getById('link'))
    })

    it('excludes anchor tags without an href', () => {
      const $anchor = getById('link')
      $anchor.removeAttribute('href')
      expect(findTabbable()).not.to.include($anchor)
    })

    it('includes buttons', () => {
      expect(findTabbable()).to.include(getById('button'))
    })

    it('excludes disabled buttons', () => {
      const $button = getById('button')
      $button.disabled = true
      expect(findTabbable()).not.to.include($button)
    })

    it('includes text inputs', () => {
      expect(findTabbable()).to.include(getById('text-input'))
    })

    it('excludes disabled text inputs', () => {
      const $input = getById('text-input')
      $input.disabled = true
      expect(findTabbable()).not.to.include($input)
    })

    it('excludes hidden inputs', () => {
      expect(findTabbable()).not.to.include(getById('hidden-input'))
    })

    it('excludes disabled hidden inputs', () => {
      const $input = getById('hidden-input')
      $input.disabled = true
      expect(findTabbable()).not.to.include($input)
    })

    it('includes search inputs', () => {
      expect(findTabbable()).to.include(getById('search-input'))
    })

    it('excludes disabled search inputs', () => {
      const $input = getById('search-input')
      $input.disabled = true
      expect(findTabbable()).not.to.include($input)
    })

    it('includes select fields', () => {
      expect(findTabbable()).to.include(getById('select'))
    })

    it('excludes disabled select fields', () => {
      const $field = getById('select')
      $field.disabled = true
      expect(findTabbable()).not.to.include($field)
    })

    it('includes textarea fields', () => {
      expect(findTabbable()).to.include(getById('textarea'))
    })

    it('excludes disabled textarea fields', () => {
      const $field = getById('textarea')
      $field.disabled = true
      expect(findTabbable()).not.to.include($field)
    })

    it('includes iframes', () => {
      expect(findTabbable()).to.include(getById('iframe'))
    })

    it('includes containers with non-negative tabindex', () => {
      expect(findTabbable()).to.include(getById('tabindex-container'))
    })

    it('excludes containers with negative tabindex', () => {
      const $el = getById('tabindex-container')
      $el.setAttribute('tabindex', '-1')
      expect(findTabbable()).not.to.include($el)
    })

    it('excludes containers with no tabindex', () => {
      const $el = getById('tabindex-container')
      $el.removeAttribute('tabindex')
      expect(findTabbable()).not.to.include($el)
    })
  })
})

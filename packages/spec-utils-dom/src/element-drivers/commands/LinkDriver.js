export default class LinkDriver {
  static findAll($parent = document.body) {
    return [...$parent.querySelectorAll('a')].map($el => new LinkDriver($el))
  }

  static findWithText(text, $parent = document.body) {
    const $element = [...$parent.querySelectorAll('a')].find($el => $el.textContent.includes(text))

    if (!$element) {
      return null
    }

    return new LinkDriver($element)
  }

  constructor($element) {
    this.$element = $element
  }

  get id() {
    return this.$element.id || null
  }

  get text() {
    return this.$element.textContent.trim()
  }

  get href() {
    return this.$element.href.trim() || null
  }

  get focused() {
    return this.$element === document.activeElement
  }

  click() {
    this.$element.click()
  }

  focus() {
    this.$element.focus()
  }

  getAttribute(attributeName) {
    return this.$element.getAttribute(attributeName)
  }
}

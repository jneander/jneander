import {keyboard} from '../..'

export default class ButtonDriver {
  static findAll($parent = document.body) {
    return [...$parent.querySelectorAll('button,[role="button"]')].map($el => new ButtonDriver($el))
  }

  static findWithText(text, $parent = document.body) {
    const $element = [...$parent.querySelectorAll('button,[role="button"]')].find($el =>
      $el.textContent.includes(text)
    )

    if (!$element) {
      return null
    }

    return new ButtonDriver($element)
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

  get disabled() {
    return this.$element.disabled
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

  keyDown(key, options) {
    keyboard.keyDown(this.$element, key, options)
  }

  getAttribute(attributeName) {
    return this.$element.getAttribute(attributeName)
  }
}

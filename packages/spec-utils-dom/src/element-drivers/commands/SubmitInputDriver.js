import {keyboard} from '../..'

export default class SubmitInputDriver {
  static findAll($parent = document.body) {
    return [...$parent.querySelectorAll('input[type="submit"]')].map(
      $el => new SubmitInputDriver($el)
    )
  }

  static findWithText(text, $parent = document.body) {
    const $element = [...$parent.querySelectorAll('input[type="submit"]')].find($el =>
      $el.value.includes(text)
    )

    if (!$element) {
      return null
    }

    return new SubmitInputDriver($element)
  }

  constructor($element) {
    this.$element = $element
  }

  get id() {
    return this.$element.id || null
  }

  get text() {
    return this.$element.value.trim()
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

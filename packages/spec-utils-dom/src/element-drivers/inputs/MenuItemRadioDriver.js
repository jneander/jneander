import {keyboard} from '../..'

export default class MenuItemRadioDriver {
  static findAll($parent) {
    return [...$parent.querySelectorAll('[role="menuitemradio"]')].map(
      $el => new MenuItemRadioDriver($el)
    )
  }

  static findWithText(text, $parent = document.body) {
    const $element = [...$parent.querySelectorAll('[role="menuitemradio"]')].find($el =>
      $el.textContent.includes(text)
    )

    if (!$element) {
      return null
    }

    return new MenuItemRadioDriver($element)
  }

  constructor($element) {
    this.$element = $element
  }

  get checked() {
    return this.$element.getAttribute('aria-checked') === 'true'
  }

  get disabled() {
    return this.$element.disabled
  }

  get focused() {
    return this.$element === document.activeElement
  }

  get id() {
    return this.$element.id || null
  }

  get text() {
    return this.$element.textContent.trim()
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
}

import {labelTextsFor, labelElementsFor} from '../../properties'
import {events, keyboard} from '../..'

export default class TextInputDriver {
  static findAll($parent = document.body) {
    return [...$parent.querySelectorAll('input[type="text"]')].map($el => new TextInputDriver($el))
  }

  static findWithLabelText(text, $parent = document.body) {
    const $element = [...$parent.querySelectorAll('input[type="text"]')].find($el =>
      labelTextsFor($el).includes(text)
    )

    if (!$element) {
      return null
    }

    return new TextInputDriver($element)
  }

  constructor($element) {
    this.$element = $element
  }

  get labelTexts() {
    return labelTextsFor(this.$element)
  }

  get $labels() {
    return labelElementsFor(this.$element)
  }

  get focused() {
    return this.$element === document.activeElement
  }

  get id() {
    return this.$element.id || null
  }

  get placeholder() {
    return this.$element.placeholder || null
  }

  get value() {
    return this.$element.value
  }

  click() {
    this.$element.click()
  }

  getAttribute(attributeName) {
    return this.$element.getAttribute(attributeName)
  }

  focus() {
    this.$element.focus()
  }

  keyDown(key, options) {
    keyboard.keyDown(this.$element, key, options)
  }

  changeValue(value) {
    if (this.value !== value) {
      events.dispatch.change(this.$element, {target: {value}})
    }
  }

  inputValue(value) {
    if (this.value !== value) {
      events.input(this.$element, {target: {value}})
    }
  }
}

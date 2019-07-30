import {labelTextsFor, labelElementsFor} from '../../properties'
import {events, keyboard} from '../..'

export default class SearchInputDriver {
  static findAll($parent = document.body) {
    return [...$parent.querySelectorAll('input[type="search"]')].map(
      $el => new SearchInputDriver($el)
    )
  }

  static findWithLabelText(text, $parent = document.body) {
    const $input = [...$parent.querySelectorAll('input[type="search"]')].find($el =>
      labelTextsFor($el).includes(text)
    )

    if (!$input) {
      return null
    }

    return new SearchInputDriver($input)
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
      events.change(this.$element, {target: {value}})
    }
  }

  inputValue(value) {
    if (this.value !== value) {
      events.input(this.$element, {target: {value}})
    }
  }
}

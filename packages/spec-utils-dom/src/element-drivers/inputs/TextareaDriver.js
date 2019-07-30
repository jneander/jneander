import {labelTextsFor, labelElementsFor} from '../../properties'
import {events, keyboard} from '../..'

export default class TextareaDriver {
  static findWithLabelText(text, $parent = document.body) {
    const element = [...$parent.querySelectorAll('textarea')].find($el =>
      labelTextsFor($el).includes(text)
    )

    if (!element) {
      return null
    }

    return new TextareaDriver(element)
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

  get placeholder() {
    return this.$element.placeholder || null
  }

  get value() {
    return this.$element.value
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

  setValue(value) {
    if (this.value !== value) {
      events.input(this.$element, {target: {value}})
    }
  }
}

import {events, labelElementsFor, labelTextsFor} from '../..'

export default class CheckboxDriver {
  static findWithLabelText(text, $parent = document.body) {
    const $element = [...$parent.querySelectorAll('input[type="checkbox"]')].find($el =>
      labelTextsFor($el).includes(text)
    )

    if (!$element) {
      return null
    }

    return new CheckboxDriver($element)
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

  get checked() {
    return this.$element.checked
  }

  setChecked(checked) {
    if (this.checked !== checked) {
      this.click()
    }
  }

  click() {
    events.click(this.$element)
  }

  focus() {
    events.focus(this.$element)
  }
}

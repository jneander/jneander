import {labelTextsFor} from '../../properties'
import {keyboard} from '../..'

export default class MenuDriver {
  static findWithLabelText(text, $parent = document.body) {
    const $element = [...$parent.querySelectorAll('[role="menu"]')].find($el =>
      labelTextsFor($el).includes(text)
    )

    if (!$element) {
      return null
    }

    return new MenuDriver($element)
  }

  constructor($element) {
    this.$element = $element
  }

  get focused() {
    return this.$element === document.activeElement
  }

  get labelTexts() {
    return labelTextsFor(this.$element)
  }

  keyDown(key, options) {
    keyboard.keyDown(this.$element, key, options)
  }
}

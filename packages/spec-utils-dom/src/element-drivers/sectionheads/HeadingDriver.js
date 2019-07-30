const headingSelector = 'h1,h2,h3,h4,h5,h6,[role="heading"]'

export default class HeadingDriver {
  static findWithText(text, $parent = document.body) {
    const $element = [...$parent.querySelectorAll(headingSelector)].find($el =>
      $el.textContent.includes(text)
    )

    if ($element == null) {
      return null
    }

    return new HeadingDriver($element)
  }

  static find($parent = document.body) {
    const $element = $parent.querySelectorAll(headingSelector)[0]

    if ($element == null) {
      return null
    }

    return new HeadingDriver($element)
  }

  constructor($element) {
    this.$element = $element
  }

  get level() {
    let level = undefined

    const matches = this.$element.tagName.match(/H([1-6])/)
    if (matches) {
      level = matches[1]
    } else {
      level = this.$element.getAttribute('aria-level') || undefined
    }

    if (level) {
      return Number.parseInt(level, 10)
    }

    return level
  }

  get text() {
    return this.$element.textContent.trim()
  }
}

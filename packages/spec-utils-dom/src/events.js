import {fireEvent as dispatch} from '@testing-library/dom'

const events = {
  change: dispatch.change,

  click($element, eventProperties = {}) {
    if ($element.disabled) {
      return
    }

    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: $element.ownerDocument.defaultView,
      ...eventProperties
    })

    return $element.dispatchEvent(event)
  },

  focus($element) {
    $element.focus()
  },

  input($element, eventProperties) {
    Object.assign($element, eventProperties.target)
    $element.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        ...eventProperties
      })
    )
  },

  dispatch
}

export default events

import {fireEvent} from '@testing-library/dom'
import keycodes from 'keycodes'

const keyboard = {}

function withDefaults(options = {}) {
  return {
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    ...options
  }
}

keyboard.keyDown = function($element, key, options) {
  return fireEvent.keyDown($element, {
    keyCode: isNaN(key) ? keycodes(key) : key,
    ...withDefaults(options)
  })
}

keyboard.keyPress = function($element, key, options) {
  return fireEvent.keyPress($element, {
    keyCode: isNaN(key) ? keycodes(key) : key,
    ...withDefaults(options)
  })
}

keyboard.keyUp = function($element, key, options) {
  return fireEvent.keyUp($element, {
    keyCode: isNaN(key) ? keycodes(key) : key,
    ...withDefaults(options)
  })
}

export default keyboard

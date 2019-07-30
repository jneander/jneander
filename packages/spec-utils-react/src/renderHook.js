import {renderHook as tlRenderHook} from '@testing-library/react-hooks'

export default function renderHook(callback, options) {
  let error = null

  const component = tlRenderHook(() => {
    try {
      return callback()
    } catch (e) {
      error = e
    }
  }, options)

  if (error) {
    component.unmount
    throw error
  }

  return component
}

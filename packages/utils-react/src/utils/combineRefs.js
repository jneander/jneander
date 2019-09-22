export default function combineRefs(...refs) {
  return _ref => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(_ref)
      } else if (ref != null) {
        ref.current = _ref
      }
    })
  }
}

function inputsMatch(memoInputs, givenInputs) {
  return (
    memoInputs != null &&
    memoInputs.length === givenInputs.length &&
    givenInputs.every((givenInput, index) => givenInput === memoInputs[index])
  )
}

export default function memo(fn) {
  let inputs = null
  let memoResult = undefined

  function memoizedFunction(...args) {
    if (inputsMatch(inputs, args)) {
      return memoResult
    }
    inputs = [...args]
    memoResult = fn(...args)
    return memoResult
  }

  const [initial, ...letters] = fn.name || 'Function'
  Object.defineProperty(memoizedFunction, 'name', {
    value: `memoized${initial.toUpperCase()}${letters.join('')}`
  })

  return memoizedFunction
}

import findLastIndex from '../findLastIndex'

describe('Arrays > .findLastIndex()', () => {
  function isEven(item) {
    return item % 2 === 0
  }

  it('returns the index of the last item matching the condition function', () => {
    const items = [3, 4, 5, 6, 7]
    expect(findLastIndex(items, isEven)).to.equal(3)
  })

  it('returns `-1` when no items match the condition function', () => {
    const items = [3, 5, 7]
    expect(findLastIndex(items, isEven)).to.equal(-1)
  })

  it('returns `-1` when the given array is empty', () => {
    expect(findLastIndex([], isEven)).to.equal(-1)
  })
})

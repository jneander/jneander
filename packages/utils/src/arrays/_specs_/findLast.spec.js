import findLast from '../findLast'

describe('Arrays > .findLast()', () => {
  function isEven(item) {
    return item % 2 === 0
  }

  it('returns the last item matching the condition function', () => {
    const items = [3, 4, 5, 6, 7]
    expect(findLast(items, isEven)).to.equal(6)
  })

  it('returns `undefined` when no items match the condition function', () => {
    const items = [3, 5, 7]
    expect(findLast(items, isEven)).to.be.undefined
  })

  it('returns `undefined` when the given array is empty', () => {
    expect(findLast([], isEven)).to.be.undefined
  })
})

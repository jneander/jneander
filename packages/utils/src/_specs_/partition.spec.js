import partition from '../partition'

describe('.partition()', () => {
  it('splits the array into two equal parts when partition size is half of the array length', () => {
    const array = [1, 2, 3, 4, 5, 6]
    expect(partition(array, 3)).to.deep.equal([[1, 2, 3], [4, 5, 6]])
  })

  it('splits the array unevenly when the array is not divisible by the partition size', () => {
    const array = [1, 2, 3, 4, 5, 6, 7]
    expect(partition(array, 3)).to.deep.equal([[1, 2, 3], [4, 5, 6], [7]])
  })

  it('does not split the array when partition size is 0', () => {
    const array = [1, 2, 3, 4, 5]
    expect(partition(array, 0)).to.deep.equal([array])
  })

  it('does not split the array when partition size is less than 0', () => {
    const array = [1, 2, 3, 4, 5]
    expect(partition(array, -1)).to.deep.equal([array])
  })

  it('does not split the array when partition size is larger than the array', () => {
    const array = [1, 2, 3, 4, 5]
    expect(partition(array, 6)).to.deep.equal([array])
  })

  it('returns an empty array when given an empty array', () => {
    expect(partition([], 2)).to.deep.equal([])
  })

  it('does not split the array when not given a partition size', () => {
    const array = [1, 2, 3, 4, 5]
    expect(partition(array)).to.deep.equal([array])
  })

  it('does not explode when given a non-numerical partition size', () => {
    const array = [1, 2, 3, 4, 5]
    expect(partition(array, 'invalid')).to.deep.equal([array])
  })
})

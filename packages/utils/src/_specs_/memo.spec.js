import memo from '../memo'

describe('.memo()', () => {
  let memoFn

  function exampleFn(...inputs) {
    return {value: inputs.reduce((sum, item) => sum + item.value, 0)}
  }

  beforeEach(() => {
    memoFn = memo(exampleFn)
  })

  it('returns a function with a memoized name', () => {
    expect(memoFn.name).to.equal('memoizedExampleFn')
  })

  describe('memoized function', () => {
    it('returns the result of calling the given function with the given arguments', () => {
      expect(memoFn({value: 1}, {value: 2})).to.deep.equal({value: 3})
    })

    it('returns the same result when called with the same argument instances', () => {
      const args = [{value: 1}, {value: 2}]
      const result = memoFn(...args)
      result.value = 'three'
      expect(memoFn(...args)).to.deep.equal({value: 'three'})
    })

    it('recomputes the result when called with a different number of arguments', () => {
      const args = [{value: 1}, {value: 2}]
      const result = memoFn(...args)
      result.value = 'three'
      expect(memoFn(args[0], args[1], {value: 3})).to.deep.equal({value: 6})
    })

    it('recomputes the result when called with different argument instances', () => {
      const result = memoFn({value: 1}, {value: 2})
      result.value = 'three'
      expect(memoFn({value: 1}, {value: 2})).to.deep.equal({value: 3})
    })

    describe('when given no arguments', () => {
      it('returns the result of calling the given function with no arguments', () => {
        expect(memoFn()).to.deep.equal({value: 0})
      })

      it('returns the same result on every subsequent call with no arguments', () => {
        const result = memoFn()
        result.value = 'three'
        expect(memoFn()).to.deep.equal({value: 'three'})
      })
    })
  })
})

import ClientStorage from '../ClientStorage'

describe('ClientStorage', () => {
  let clientStorage

  beforeEach(() => {
    clientStorage = new ClientStorage()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('#getData()', () => {
    beforeEach(() => {
      clientStorage.setData('unrelated', 'unrelated value')
    })

    it('returns the value saved with the given key', () => {
      clientStorage.setData('example', 'example value')
      expect(clientStorage.getData('example')).to.equal('example value')
    })

    describe('when no data is saved with the given key', () => {
      it('returns the given default value', () => {
        expect(clientStorage.getData('example', 'default value')).to.equal('default value')
      })

      it('returns undefined when not given a default value', () => {
        expect(clientStorage.getData('example')).to.be.undefined
      })
    })

    describe('when not scoped', () => {
      it('does not return data saved with a scope', () => {
        const scopedStorage = new ClientStorage('example-scope')
        scopedStorage.setData('example', 'example value')
        expect(clientStorage.getData('example')).to.be.undefined
      })
    })

    describe('when scoped', () => {
      it('returns the data saved in the configured scope', () => {
        const scopedStorage = new ClientStorage('example-scope')
        scopedStorage.setData('example', 'example value')
        expect(scopedStorage.getData('example')).to.equal('example value')
      })

      it('does not return data saved in a different scope', () => {
        const storageA = new ClientStorage('scope-a')
        const storageB = new ClientStorage('scope-b')
        storageA.setData('example', 'example value')
        expect(storageB.getData('example')).to.be.undefined
      })

      it('does not return data saved without a scope', () => {
        const scopedStorage = new ClientStorage('example-scope')
        expect(scopedStorage.getData('unrelated')).to.be.undefined
      })
    })
  })

  describe('serialization', () => {
    it('preserves undefined data', () => {
      clientStorage.setData('example', undefined)
      expect(clientStorage.getData('example')).to.equal(undefined)
    })

    it('preserves null data', () => {
      clientStorage.setData('example', null)
      expect(clientStorage.getData('example')).to.equal(null)
    })

    it('preserves boolean data', () => {
      clientStorage.setData('example', true)
      expect(clientStorage.getData('example')).to.equal(true)
    })

    it('preserves string data', () => {
      clientStorage.setData('example', 'true')
      expect(clientStorage.getData('example')).to.equal('true')
    })

    it('preserves numerical data', () => {
      clientStorage.setData('example', 12345.6789)
      expect(clientStorage.getData('example')).to.equal(12345.6789)
    })

    it('preserves object data', () => {
      const object = Object.freeze({
        one: 1,
        two: {
          deeper: true,
          data: 'yes',
          'even-deeper': {
            nil: null
          }
        }
      })
      clientStorage.setData('example', object)
      expect(clientStorage.getData('example')).to.deep.equal(object)
    })
  })

  describe('#removeData()', () => {
    it('removes the data saved with the given key', () => {
      clientStorage.setData('example', 'example value')
      clientStorage.removeData('example')
      expect(clientStorage.getData('example', 'default value')).to.equal('default value')
    })

    it('has no effect when no data is saved with the given key', () => {
      expect(() => {
        clientStorage.removeData('example')
      }).not.to.throw
    })

    describe('when scoped', () => {
      it('removes the data saved in the configured scope', () => {
        const scopedStorage = new ClientStorage('example-scope')
        scopedStorage.setData('example', 'example value')
        scopedStorage.removeData('example')
        expect(scopedStorage.getData('example')).to.be.undefined
      })

      it('does not remove data saved in a different scope', () => {
        const storageA = new ClientStorage('scope-a')
        const storageB = new ClientStorage('scope-b')
        storageA.setData('example', 'value a')
        storageB.setData('example', 'value b')
        storageA.removeData('example')
        expect(storageB.getData('example')).to.equal('value b')
      })

      it('does not remove data saved without a scope', () => {
        clientStorage.setData('example', 'client value')
        const scopedStorage = new ClientStorage('example-scope')
        scopedStorage.removeData('example')
        expect(clientStorage.getData('example')).to.equal('client value')
      })
    })
  })
})

import sinon from 'sinon'

import uid from '../uid'

describe('.uid()', () => {
  let randomNumbers
  let numberIndex

  beforeEach(() => {
    randomNumbers = [0, 0.999999999]
    numberIndex = 0

    sinon.stub(Math, 'random').callsFake(() => {
      const randomValue = randomNumbers[numberIndex++]
      numberIndex = numberIndex % randomNumbers.length
      return randomValue
    })
  })

  afterEach(() => {
    Math.random.restore()
  })

  it('returns a string prefixed with "uid_"', () => {
    expect(uid().startsWith('uid_')).to.be.true
  })

  it('appends 12 characters as a suffix on the string', () => {
    const suffix = uid().replace('uid_', '')
    expect(suffix).to.have.length(12)
  })

  it('randomly chooses the suffix characters', () => {
    randomNumbers = [0, 0.25, 0.5, 0.75, 0.999999]
    const suffix = uid().replace('uid_', '')
    expect([...new Set([...suffix])]).to.have.length(5)
  })
})

import sinon from 'sinon'

export default function reactEventSpy() {
  return sinon.stub().callsFake(event => {
    event.persist()
  })
}

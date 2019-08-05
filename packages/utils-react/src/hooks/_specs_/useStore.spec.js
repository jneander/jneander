import React from 'react'
import sinon from 'sinon'

import {createContainer} from '@jneander/spec-utils-dom'
import {act, render} from '@jneander/spec-utils-react'
import {Store} from '@jneander/utils-state'

import {useStore} from '../..'

describe('Hooks > .useStore()', () => {
  let $container
  let component
  let specStore
  let unsubscribeSpy

  beforeEach(async () => {
    $container = createContainer()

    specStore = new Store({currentValue: 0})

    const subscribe = specStore.subscribe.bind(specStore)
    unsubscribeSpy = null
    sinon.stub(specStore, 'subscribe').callsFake((...args) => {
      const unsubscribe = subscribe(...args)
      unsubscribeSpy = sinon.spy(unsubscribe)
      return unsubscribeSpy
    })

    await renderComponent()
  })

  afterEach(() => {
    component.unmount()
    $container.remove()
  })

  function SpecComponent() {
    const [state, setState] = useStore(specStore)

    function handleIncrement() {
      setState({currentValue: state.currentValue + 1})
    }

    return (
      <div>
        <span id="current-value">{state.currentValue}</span>

        <button id="increment-button" onClick={handleIncrement}>
          Increment
        </button>
      </div>
    )
  }

  async function renderComponent() {
    const element = <SpecComponent />
    component = await render(element, {$container})
  }

  function setCurrentValue(currentValue) {
    act(() => {
      specStore.setState({currentValue})
    })
  }

  describe('when called', () => {
    it('includes the current state', () => {
      expect($container.querySelector('#current-value').textContent).to.equal('0')
    })

    it('includes a state update function', () => {
      $container.querySelector('#increment-button').click()
      expect(specStore.getState().currentValue).to.equal(1)
    })
  })

  it('preserves unrelated state when updating the store', () => {
    specStore.setState({unrelated: true})
    $container.querySelector('#increment-button').click()
    expect(specStore.getState().unrelated).to.equal(true)
  })

  describe('when the consumer is initially rendered', () => {
    it('subscribes to updates in the store', () => {
      expect(specStore.subscribe.callCount).to.equal(1)
    })

    it('rerenders with updates to the store', () => {
      setCurrentValue(10)
      expect($container.querySelector('#current-value').textContent).to.equal('10')
    })
  })

  describe('when the consumer is updated', () => {
    it('does not unsubscribe from the store', async () => {
      await renderComponent()
      expect(unsubscribeSpy.callCount).to.equal(0)
    })

    it('does not re-subscribe to the store', async () => {
      await renderComponent()
      expect(specStore.subscribe.callCount).to.equal(1)
    })
  })

  describe('when the consumer is unmounted', () => {
    it('unsubscribes from the store', () => {
      component.unmount()
      expect(unsubscribeSpy.callCount).to.equal(1)
    })
  })
})

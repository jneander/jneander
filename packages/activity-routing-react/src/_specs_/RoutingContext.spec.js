import React from 'react'
import sinon from 'sinon'

import {Routing, createMemoryHistory} from '@jneander/activity-routing-history'
import {createContainer} from '@jneander/spec-utils-dom'
import {render} from '@jneander/spec-utils-react'

import createRoutingContext from '../createRoutingContext'
import exampleRouter from './exampleRouter'

describe('RoutingContext', () => {
  let $container
  let childFn
  let component
  let history
  let routing
  let RoutingConsumer
  let RoutingProvider

  beforeEach(() => {
    $container = createContainer()

    history = createMemoryHistory()
    routing = new Routing({history, router: exampleRouter})
    const context = createRoutingContext()
    RoutingProvider = context.RoutingProvider
    RoutingConsumer = context.RoutingConsumer

    /* eslint-disable-next-line react/display-name */
    childFn = routing => <h1>{routing.getCurrentActivity().name}</h1>
  })

  afterEach(() => {
    component.unmount()
    $container.remove()
  })

  async function renderComponent() {
    const element = (
      <RoutingProvider routing={routing}>
        <RoutingConsumer>{childFn}</RoutingConsumer>
      </RoutingProvider>
    )
    component = await render(element, {$container})
  }

  it('passes the router to the "children" render prop', async () => {
    let childArgs
    childFn = (...args) => {
      childArgs = args
    }
    await renderComponent()
    expect(childArgs).to.have.ordered.members([routing])
  })

  it('displays the result of the children prop render function', async () => {
    await renderComponent()
    const $activity = $container.querySelector('h1')
    expect($activity.textContent).to.equal('home')
  })

  it('re-renders when the current activity changes', async () => {
    await renderComponent()
    history.push('/users')
    const $activity = $container.querySelector('h1')
    expect($activity.textContent).to.equal('listUsers')
  })

  it('disconnects from activity changes when unmounting', async () => {
    const unsubscribe = sinon.spy()
    sinon.stub(routing, 'subscribe').returns(unsubscribe)
    await renderComponent()
    component.unmount()
    expect(unsubscribe.callCount).to.equal(1)
  })
})

import React from 'react'

import {Routing, createMemoryHistory} from '@jneander/activity-routing-history'
import {createContainer} from '@jneander/spec-utils-dom'
import {render} from '@jneander/spec-utils-react'

import createRoutingContext from '../createRoutingContext'
import createRoutingView from '../createRoutingView'
import exampleRouter from './exampleRouter'

describe('RoutingView', () => {
  let $container
  let component
  let history
  let props
  let routing
  let RoutingProvider
  let RoutingView

  beforeEach(() => {
    $container = createContainer()

    history = createMemoryHistory()
    routing = new Routing({history, router: exampleRouter})
    const context = createRoutingContext()
    RoutingProvider = context.RoutingProvider
    RoutingView = createRoutingView(context.RoutingConsumer)

    props = {
      name: 'listUsers'
    }
  })

  afterEach(() => {
    component.unmount()
    $container.remove()
  })

  async function renderComponent() {
    const element = (
      <RoutingProvider routing={routing}>
        <RoutingView {...props} />
      </RoutingProvider>
    )
    component = await render(element, {$container})
  }

  context('when given a "children" prop', () => {
    beforeEach(() => {
      props.children = <p>Children Content</p>
    })

    context('when navigated to the url for the activity', () => {
      it('renders the children', async () => {
        history.push('/users')
        await renderComponent()
        const $content = $container.querySelector('p')
        expect($content.textContent).to.equal('Children Content')
      })
    })

    context('when navigated to the url for a different activity', () => {
      it('does not render the children', async () => {
        history.push('/')
        await renderComponent()
        const $content = $container.querySelector('p')
        expect($content).to.be.null
      })
    })
  })

  context('when given an "as" component prop', () => {
    function Content() {
      return <p>Component Content</p>
    }

    beforeEach(() => {
      props.as = Content
    })

    context('when navigated to the url for the activity', () => {
      it('renders the children', async () => {
        history.push('/users')
        await renderComponent()
        const $content = $container.querySelector('p')
        expect($content.textContent).to.equal('Component Content')
      })
    })

    context('when navigated to the url for a different activity', () => {
      it('does not render the children', async () => {
        history.push('/')
        await renderComponent()
        const $content = $container.querySelector('p')
        expect($content).to.be.null
      })
    })
  })
})

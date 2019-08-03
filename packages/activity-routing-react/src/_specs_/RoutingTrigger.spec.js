import React from 'react'

import {Routing, createMemoryHistory} from '@jneander/activity-routing-history'
import {createContainer, events} from '@jneander/spec-utils-dom'
import {render} from '@jneander/spec-utils-react'

import createRoutingContext from '../createRoutingContext'
import exampleRouter from './exampleRouter'

describe('Routing Trigger', () => {
  let $container
  let component
  let defaultPrevented
  let history
  let options
  let routing
  let routingContext
  let RoutingProvider

  beforeEach(() => {
    $container = createContainer()
    defaultPrevented = null

    history = createMemoryHistory()
    routing = new Routing({history, router: exampleRouter})

    options = {
      activityName: 'listUsers'
    }

    routingContext = createRoutingContext()
  })

  afterEach(() => {
    component.unmount()
    $container.remove()
  })

  function SpecComponent() {
    const {activityName, params, query, method} = options
    const {href, onClick} = routingContext.useRoutingTrigger(activityName, params, query, method)
    return (
      <a href={href} onClick={onClick}>
        Link
      </a>
    )
  }

  async function renderComponent() {
    RoutingProvider = routingContext.RoutingProvider

    const element = (
      <div onClick={interceptClick}>
        <RoutingProvider routing={routing}>
          <SpecComponent />
        </RoutingProvider>
      </div>
    )
    component = await render(element, {$container})
  }

  function interceptClick(event) {
    defaultPrevented = event.defaultPrevented
    event.preventDefault()
  }

  function getLink() {
    return $container.querySelector('a')
  }

  describe('.href property', () => {
    beforeEach(() => {
      options = {
        activityName: 'listUsers'
      }
    })

    function getActivityFromLink() {
      const href = getLink().getAttribute('href')
      const [path, query] = href.split('?')
      return exampleRouter.buildActivityFromLocation(path, query)
    }

    it('links to the url of the activity', async () => {
      await renderComponent()
      const activity = getActivityFromLink()
      expect(activity.name).to.equal('listUsers')
    })

    it('uses the given params for the activity', async () => {
      options = {
        activityName: 'showUser',
        params: {
          id: '123'
        }
      }
      await renderComponent()
      const activity = getActivityFromLink()
      expect(activity.params).to.deep.equal({id: '123'})
    })

    it('uses the given query for the activity', async () => {
      options = {
        activityName: 'listUsers',
        query: {
          page: 1,
          perPage: 10
        }
      }
      await renderComponent()
      const activity = getActivityFromLink()
      expect(activity.query).to.deep.equal({page: '1', perPage: '10'})
    })
  })

  describe('.onClick property', () => {
    it('prevents the default browser behavior', async () => {
      await renderComponent()
      events.click(getLink())
      expect(defaultPrevented).to.be.true
    })

    it('navigates to the linked activity', async () => {
      await renderComponent()
      getLink().click()
      const activity = routing.getCurrentActivity()
      expect(activity.name).to.equal('listUsers')
    })

    it('pushes the url into history by default', async () => {
      await renderComponent()
      getLink().click()
      expect(history.entries).to.have.length(2)
    })

    describe('when the .method prop is "push"', () => {
      it('pushes the url into history', async () => {
        options.method = 'push'
        await renderComponent()
        getLink().click()
        expect(history.entries).to.have.length(2)
      })
    })

    describe('when the .method prop is "replace"', () => {
      it('replaces the current entry in history', async () => {
        options.method = 'replace'
        await renderComponent()
        getLink().click()
        expect(history.entries).to.have.length(1)
      })
    })

    describe('when handling a click with the meta key', () => {
      beforeEach(renderComponent)

      it('does not navigate to the linked activity', () => {
        const activity = routing.getCurrentActivity()
        events.click(getLink(), {metaKey: true})
        expect(routing.getCurrentActivity()).to.deep.equal(activity)
      })

      it('does not prevent the default browser behavior', () => {
        events.click(getLink(), {metaKey: true})
        expect(defaultPrevented).to.be.false
      })
    })

    describe('when handling a click with the alt key', () => {
      beforeEach(renderComponent)

      it('does not navigate to the linked activity', () => {
        const activity = routing.getCurrentActivity()
        events.click(getLink(), {altKey: true})
        expect(routing.getCurrentActivity()).to.deep.equal(activity)
      })

      it('does not prevent the default browser behavior', () => {
        events.click(getLink(), {altKey: true})
        expect(defaultPrevented).to.be.false
      })
    })

    describe('when handling a click with the ctrl key', () => {
      beforeEach(renderComponent)

      it('does not navigate to the linked activity', () => {
        const activity = routing.getCurrentActivity()
        events.click(getLink(), {ctrlKey: true})
        expect(routing.getCurrentActivity()).to.deep.equal(activity)
      })

      it('does not prevent the default browser behavior', () => {
        events.click(getLink(), {ctrlKey: true})
        expect(defaultPrevented).to.be.false
      })
    })

    describe('when handling a click with the shift key', () => {
      beforeEach(renderComponent)

      it('does not navigate to the linked activity', () => {
        const activity = routing.getCurrentActivity()
        events.click(getLink(), {shiftKey: true})
        expect(routing.getCurrentActivity()).to.deep.equal(activity)
      })

      it('does not prevent the default browser behavior', () => {
        events.click(getLink(), {shiftKey: true})
        expect(defaultPrevented).to.be.false
      })
    })
  })
})

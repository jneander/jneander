import sinon from 'sinon'

import createHistory from '../createMemoryHistory'
import Routing from '../Routing'
import exampleRouter from './exampleRouter'

describe('Routing', () => {
  let history
  let routing

  beforeEach(() => {
    history = createHistory()
    routing = new Routing({history, router: exampleRouter})
  })

  describe('#history', () => {
    it('is the history used by the Routing instance', () => {
      expect(routing.history).to.equal(history)
    })
  })

  describe('#router', () => {
    it('is the router used by the Routing instance', () => {
      expect(routing.router).to.equal(exampleRouter)
    })
  })

  describe('#getCurrentActivity()', () => {
    it('returns the activity for the current browser location', () => {
      expect(routing.getCurrentActivity().name).to.equal('home')
    })

    it('includes an empty params map when the path has no parameters', () => {
      expect(routing.getCurrentActivity().params).to.be.an('object').and.empty
    })

    it('includes an empty query map when the location has no query parameters', () => {
      expect(routing.getCurrentActivity().query).to.be.an('object').and.empty
    })

    context('when at a parameterized route', () => {
      it('returns the activity for the parameterized location', () => {
        history.push('/users/123')
        expect(routing.getCurrentActivity().name).to.equal('showUser')
      })

      it('includes the parameter values in the params map on the activity', () => {
        history.push('/users/123')
        expect(routing.getCurrentActivity().params).to.deep.equal({id: '123'})
      })
    })

    context('when query parameters are present', () => {
      it('includes the query values in the query map on the activity', () => {
        history.push('/users/123?querying=true&data=example')
        const expected = {data: 'example', querying: 'true'}
        expect(routing.getCurrentActivity().query).to.deep.equal(expected)
      })
    })

    it('returns the "notFound" activity when the current browser location does not match a route', () => {
      history.push('/unknown-path')
      expect(routing.getCurrentActivity().name).to.equal('notFound')
    })
  })

  describe('#setActivity()', () => {
    let updateSpy

    beforeEach(() => {
      const activity = routing.router.buildActivity('showUser', {id: '123'}, {details: 'all'})
      routing.history.replace(activity.url)
      updateSpy = sinon.spy()
      routing.subscribe(updateSpy)
    })

    describe('when the method is "push"', () => {
      it('updates the current activity', () => {
        const activity = routing.router.buildActivity('listUsers')
        routing.setActivity(activity)
        expect(routing.getCurrentActivity().name).to.equal('listUsers')
      })

      it('updates subscribers', () => {
        const activity = routing.router.buildActivity('listUsers')
        routing.setActivity(activity)
        expect(updateSpy.callCount).to.equal(1)
      })

      it('pushes the path for the activity onto the history', () => {
        const activity = routing.router.buildActivity('listUsers')
        routing.setActivity(activity)
        expect(history.length).to.equal(2)
      })

      it('updates the current activity when parameters are different', () => {
        const activity = routing.router.buildActivity('showUser', {id: '456'}, {details: 'all'})
        routing.setActivity(activity)
        expect(history.length).to.equal(2)
      })

      it('updates the current activity when the search query is different', () => {
        const activity = routing.router.buildActivity('showUser', {id: '456'}, {details: 'limited'})
        routing.setActivity(activity)
        expect(history.length).to.equal(2)
      })

      it('has no effect when the given path is the current path in the history', () => {
        const activity = routing.router.buildActivity('showUser', {id: '123'}, {details: 'all'})
        routing.setActivity(activity)
        expect(updateSpy.callCount).to.equal(0)
      })
    })

    describe('when the method is "replace"', () => {
      it('updates the current activity', () => {
        const activity = routing.router.buildActivity('listUsers')
        routing.setActivity(activity, 'replace')
        expect(routing.getCurrentActivity().name).to.equal('listUsers')
      })

      it('updates subscribers', () => {
        const activity = routing.router.buildActivity('listUsers')
        routing.setActivity(activity, 'replace')
        expect(updateSpy.callCount).to.equal(1)
      })

      it('updates the current activity when parameters are different', () => {
        const activity = routing.router.buildActivity('showUser', {id: '456'}, {details: 'all'})
        routing.setActivity(activity, 'replace')
        expect(updateSpy.callCount).to.equal(1)
      })

      it('updates the current activity when the search query is different', () => {
        const activity = routing.router.buildActivity('showUser', {id: '456'}, {details: 'limited'})
        routing.setActivity(activity, 'replace')
        expect(updateSpy.callCount).to.equal(1)
      })

      it('has no effect when the given path is the current path in the history', () => {
        const activity = routing.router.buildActivity('showUser', {id: '123'}, {details: 'all'})
        routing.setActivity(activity, 'replace')
        expect(updateSpy.callCount).to.equal(0)
      })
    })
  })

  describe('#setQuery()', () => {
    it('updates the query of the current activity', () => {
      routing.setQuery({data: 'example'})
      expect(routing.getCurrentActivity().query.data).to.equal('example')
    })

    it('preserves the current activity name', () => {
      routing.setQuery({data: 'example'})
      expect(routing.getCurrentActivity().name).to.equal('home')
    })

    it('preserves the current activity params', () => {
      history.push('/users/123')
      routing.setQuery({data: 'example'})
      expect(routing.getCurrentActivity().params).to.deep.equal({id: '123'})
    })

    it('replaces the current activity query', () => {
      history.push('/users?sort=ascending')
      routing.setQuery({data: 'example'})
      expect(routing.getCurrentActivity().query).to.deep.equal({data: 'example'})
    })

    describe('when using the "push" method', () => {
      it('pushes the updated activity into the history', () => {
        routing.setQuery({data: 'example'})
        expect(history.length).to.equal(2)
      })

      it('has no effect when the given path is the current path in the history', () => {
        routing.setQuery({}, 'push')
        expect(history.length).to.equal(1)
      })
    })

    it('optionally replaces the current activity in the history', () => {
      routing.setQuery({data: 'example'}, 'replace')
      expect(history.length).to.equal(1)
    })

    it('pushes the updated activity into the history by default', () => {
      routing.setQuery({data: 'example'})
      expect(history.length).to.equal(2)
    })
  })

  describe('#updateQuery()', () => {
    it('updates the query of the current activity', () => {
      routing.updateQuery({data: 'example'})
      expect(routing.getCurrentActivity().query.data).to.equal('example')
    })

    it('preserves the current activity name', () => {
      routing.updateQuery({data: 'example'})
      expect(routing.getCurrentActivity().name).to.equal('home')
    })

    it('preserves the current activity params', () => {
      history.push('/users/123')
      routing.updateQuery({data: 'example'})
      expect(routing.getCurrentActivity().params).to.deep.equal({id: '123'})
    })

    it('amends the current activity query', () => {
      history.push('/users?sort=ascending')
      routing.updateQuery({data: 'example'})
      expect(routing.getCurrentActivity().query).to.deep.equal({
        data: 'example',
        sort: 'ascending'
      })
    })

    describe('when using the "push" method', () => {
      it('pushes the updated activity into the history', () => {
        routing.updateQuery({data: 'example'})
        expect(history.length).to.equal(2)
      })

      it('has no effect when the given path is the current path in the history', () => {
        routing.updateQuery({}, 'push')
        expect(history.length).to.equal(1)
      })
    })

    it('optionally replaces the current activity in the history', () => {
      routing.updateQuery({data: 'example'}, 'replace')
      expect(history.length).to.equal(1)
    })

    it('pushes the updated activity into the history by default', () => {
      routing.updateQuery({data: 'example'})
      expect(history.length).to.equal(2)
    })
  })

  describe('subscription', () => {
    let currentActivity
    let unsubscribe

    beforeEach(() => {
      currentActivity = null
      unsubscribe = routing.subscribe(activity => {
        currentActivity = activity
      })
    })

    it('updates the subscriber when the browser location changes', () => {
      history.push('/users')
      expect(currentActivity.name).to.equal('listUsers')
    })

    it('is ended by calling the function returned from #subscribe()', () => {
      unsubscribe()
      history.push('/users')
      expect(currentActivity).to.be.null
    })
  })
})

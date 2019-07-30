import Route from '../Route'

describe('Route', () => {
  let route

  beforeEach(() => {
    route = new Route('showUserMessage', '/users/:userId/messages/:messageId')
  })

  describe('#activityName', () => {
    it('is the name of the activity', () => {
      expect(route.activityName).to.equal('showUserMessage')
    })
  })

  describe('#buildActivity()', () => {
    it('includes the name on the returned activity', () => {
      route = new Route('listUsers', '/users')
      const activity = route.buildActivity()
      expect(activity.name).to.equal('listUsers')
    })

    it('includes the url on the returned activity', () => {
      route = new Route('listUsers', '/users')
      const activity = route.buildActivity()
      expect(activity.url).to.equal('/users')
    })

    it('assigns empty params to the returned activity', () => {
      route = new Route('listUsers', '/users')
      const activity = route.buildActivity()
      expect(activity.params).to.deep.equal({})
    })

    it('assigns an empty query to the returned activity', () => {
      route = new Route('listUsers', '/users')
      const activity = route.buildActivity()
      expect(activity.query).to.deep.equal({})
    })

    describe('when given matching params', () => {
      function buildActivity() {
        return route.buildActivity({
          messageId: '456',
          userId: '123'
        })
      }

      it('incorporates the params into the url', () => {
        expect(buildActivity().url).to.equal('/users/123/messages/456')
      })

      it('assigns the params to the activity', () => {
        expect(buildActivity().params).to.deep.equal({
          messageId: '456',
          userId: '123'
        })
      })
    })

    describe('when given extra, unrecognized params', () => {
      function buildActivity() {
        return route.buildActivity({
          accountId: '789',
          messageId: '456',
          userId: '123'
        })
      }

      it('ignores the unrecognized params for the url', () => {
        expect(buildActivity().url).to.equal('/users/123/messages/456')
      })

      it('excludes the unrecognized params from the activity params', () => {
        expect(buildActivity().params).to.deep.equal({
          messageId: '456',
          userId: '123'
        })
      })
    })

    describe('when given incomplete params', () => {
      it('throws an exception', () => {
        expect(() => {
          route.buildActivity('showUser', {}, {})
        }).to.throw()
      })
    })

    describe('when given a query', () => {
      it('incorporates the query into the url', () => {
        route = new Route('help', '/help')
        const activity = route.buildActivity({}, {topic: 'books'})
        expect(activity.url).to.equal('/help?topic=books')
      })

      it('assigns the query to the activity', () => {
        route = new Route('help', '/help')
        const activity = route.buildActivity({}, {topic: 'books'})
        expect(activity.query).to.deep.equal({topic: 'books'})
      })
    })
  })

  describe('#buildActivityFromLocation()', () => {
    it('returns an activity for the route', () => {
      const activity = route.buildActivityFromLocation('/users/123/messages/456')
      expect(activity.name).to.equal('showUserMessage')
    })

    it('includes the url on the returned activity', () => {
      const activity = route.buildActivityFromLocation('/users/123/messages/456')
      expect(activity.url).to.equal('/users/123/messages/456')
    })

    it('includes the parameter values in the params map on the activity', () => {
      const activity = route.buildActivityFromLocation('/users/123/messages/456')
      expect(activity.params).to.deep.equal({messageId: '456', userId: '123'})
    })

    it('includes an empty params map when the path has no parameters', () => {
      route = new Route('showAllUserMessages', '/users/messages')
      const activity = route.buildActivityFromLocation('/users/messages')
      expect(activity.params).to.be.an('object').and.empty
    })

    it('ignores trailing slashes on route paths', () => {
      const activity = route.buildActivityFromLocation('/users/123/messages/456/')
      expect(activity.name).to.equal('showUserMessage')
    })
  })

  describe('#match()', () => {
    it('returns 1 for the root route (/)', () => {
      route = new Route('home', '/')
      expect(route.match('/')).to.equal(1)
    })

    it('returns a 1 for an exact match on a non-parameterized route', () => {
      route = new Route('showAdminHome', '/users/admin/home')
      expect(route.match('/users/admin/home')).to.equal(1)
    })

    it('returns a higher value for an exact match on a parameterized route', () => {
      expect(route.match('/users/123/messages/456/')).to.equal(11)
    })

    it('returns null when the given path does not match', () => {
      expect(route.match('/users/123/message')).to.be.null
    })
  })
})

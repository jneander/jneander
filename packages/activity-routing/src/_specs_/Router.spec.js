import Router from '../Router'

describe('Router', () => {
  let router

  beforeEach(() => {
    router = new Router()

    router.add('home', '/')

    router.add('help', '/help/') // Defined with trailing slash, which is ignored.

    router.add('listIssues', 'help/issues')

    router.within('/contact/', contactContext => {
      contactContext.add('showContact', '/show')
    })

    router.within('/auth', authContext => {
      authContext.add('signIn', '/sign-in')

      authContext.within('/google', googleContext => {
        googleContext.add('signInWithGoogle', '/sign-in')
      })
    })

    router.within('links/sponsors', sponsorsContext => {
      sponsorsContext.add('listSponsors', '/')
    })

    router.within('links/technologies/', sponsorsContext => {
      sponsorsContext.add('listTechnologies', '/')
    })

    router.within('/users', usersContext => {
      usersContext.add('showUser', '/:id')

      usersContext.add('listUsers', '/')

      usersContext.within('/admins', adminsContext => {
        adminsContext.add('listAdmins', '/')
      })

      usersContext.within('guests', guestsContext => {
        guestsContext.add('listGuests', '/')
      })
    })

    router.within('/topics', topicsContext => {
      topicsContext.within('/:topic', topicContext => {
        topicContext.add('actOnTopic', '/:action')

        topicContext.add('createTopic', '/new')
      })

      topicsContext.within('/books', topicContext => {
        topicContext.add('actOnBook', '/:action')

        topicContext.add('writeBook', '/write')
      })
    })
  })

  describe('#buildActivity()', () => {
    it('returns the activity with the given name', () => {
      const activity = router.buildActivity('home')
      expect(activity.name).to.equal('home')
    })

    it('includes the url on the activity', () => {
      const activity = router.buildActivity('home')
      expect(activity.url).to.equal('/')
    })

    it('assigns empty params to the activity', () => {
      const activity = router.buildActivity('home')
      expect(activity.params).to.deep.equal({})
    })

    it('assigns an empty query to the activity', () => {
      const activity = router.buildActivity('home')
      expect(activity.query).to.deep.equal({})
    })

    describe('when given matching params', () => {
      it('incorporates the params into the url', () => {
        const activity = router.buildActivity('actOnTopic', {
          action: 'publish',
          topic: 'magazine'
        })
        expect(activity.url).to.equal('/topics/magazine/publish')
      })

      it('assigns the params to the activity', () => {
        const activity = router.buildActivity('actOnTopic', {
          action: 'publish',
          topic: 'magazine'
        })
        expect(activity.params).to.deep.equal({action: 'publish', topic: 'magazine'})
      })
    })

    describe('when given unrecognized params', () => {
      it('ignores the unrecognized params for the url', () => {
        const activity = router.buildActivity('showUser', {
          id: '123',
          name: 'Adam'
        })
        expect(activity.url).to.equal('/users/123')
      })

      it('excludes the unrecognized params from the activity params', () => {
        const activity = router.buildActivity('showUser', {
          id: '123',
          name: 'Adam'
        })
        expect(activity.params).to.deep.equal({id: '123'})
      })
    })

    describe('when given incomplete params', () => {
      it('throws an exception', () => {
        expect(() => {
          router.buildActivity('showUser', {}, {})
        }).to.throw()
      })
    })

    describe('when given a query', () => {
      it('incorporates the query into the url', () => {
        const activity = router.buildActivity(
          'help',
          {},
          {
            topic: 'books'
          }
        )
        expect(activity.url).to.equal('/help?topic=books')
      })

      it('assigns the query to the activity', () => {
        const activity = router.buildActivity(
          'help',
          {},
          {
            topic: 'books'
          }
        )
        expect(activity.query).to.deep.equal({topic: 'books'})
      })
    })

    it('returns null when no route is defined with the given activity name', () => {
      const activity = router.buildActivity('unknownActivityName')
      expect(activity).to.be.null
    })
  })

  describe('#buildActivityFromLocation()', () => {
    it('returns an activity for the matching route', () => {
      const activity = router.buildActivityFromLocation('/')
      expect(activity.name).to.equal('home')
    })

    it('includes an empty params map when the path has no parameters', () => {
      const activity = router.buildActivityFromLocation('/')
      expect(activity.params).to.be.an('object').and.empty
    })

    it('ignores trailing slashes on route paths', () => {
      const activity = router.buildActivityFromLocation('/help')
      expect(activity.name).to.equal('help')
    })

    it('ignores trailing slashes on the given url', () => {
      const activity = router.buildActivityFromLocation('/help/')
      expect(activity.name).to.equal('help')
    })

    it('ignores trailing slashes on context paths', () => {
      const activity = router.buildActivityFromLocation('/contact/show')
      expect(activity.name).to.equal('showContact')
    })

    it('supports defining deep paths without explicit contexts', () => {
      const activity = router.buildActivityFromLocation('/help/issues')
      expect(activity.name).to.equal('listIssues')
    })

    it('supports defining deep paths in contexts', () => {
      const activity = router.buildActivityFromLocation('/links/sponsors')
      expect(activity.name).to.equal('listSponsors')
    })

    it('prunes trailing slashes with deep context paths', () => {
      const activity = router.buildActivityFromLocation('/links/technologies')
      expect(activity.name).to.equal('listTechnologies')
    })

    context('when matching with a variable parameter', () => {
      it('matches the activity with the parameter', () => {
        const activity = router.buildActivityFromLocation('/users/123')
        expect(activity.name).to.equal('showUser')
      })

      it('includes the parameter value in the params map on the activity', () => {
        const activity = router.buildActivityFromLocation('/users/123')
        expect(activity.params).to.deep.equal({id: '123'})
      })
    })

    context('when query parameters are present', () => {
      it('includes the query values in the query map on the activity', () => {
        const query = {data: 'example', querying: 'true'}
        const activity = router.buildActivityFromLocation(
          '/users/123',
          'data=example&querying=true'
        )
        expect(activity.query).to.deep.equal(query)
      })
    })

    it('matches activities defined within one level of context', () => {
      const activity = router.buildActivityFromLocation('/auth/sign-in')
      expect(activity.name).to.equal('signIn')
    })

    it('matches activities defined within multiple levels of context', () => {
      const activity = router.buildActivityFromLocation('/auth/google/sign-in')
      expect(activity.name).to.equal('signInWithGoogle')
    })

    it('matches activities defined at an intermediate context', () => {
      const activity = router.buildActivityFromLocation('/users')
      expect(activity.name).to.equal('listUsers')
    })

    it('matches activities defined with explicit paths overloading parameterized paths', () => {
      const activity = router.buildActivityFromLocation('/users/admins')
      expect(activity.name).to.equal('listAdmins')
    })

    it('implicitly separates contexts defined without leading slash', () => {
      const activity = router.buildActivityFromLocation('/users/guests')
      expect(activity.name).to.equal('listGuests')
    })

    it('prioritizes early path parameters when multiple parameters are overloaded', () => {
      const activity = router.buildActivityFromLocation('/topics/books/new')
      expect(activity.name).to.equal('actOnBook')
    })

    it('returns null when given an unknown path', () => {
      expect(router.buildActivityFromLocation('/unknown')).to.be.null
    })

    it('returns null when given a path with a missing parameter', () => {
      expect(router.buildActivityFromLocation('/topics//new')).to.be.null
    })
  })
})

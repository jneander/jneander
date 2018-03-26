import "core-js/modules/es6.regexp.match";
import Router from './Router';
describe('Router', function () {
  var router;
  beforeEach(function () {
    router = new Router();
    router.add('showPerson', '/people/:id');
    router.add('listPeople', '/people/');
  });
  describe('#match()', function () {
    it('returns the name of the matching route', function () {
      expect(router.match('/people/123')).toEqual('showPerson');
    });
  });
});
"use strict";

require("core-js/modules/es6.regexp.match");

var _Router = _interopRequireDefault(require("./Router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Router', function () {
  var router;
  beforeEach(function () {
    router = new _Router.default();
    router.add('showPerson', '/people/:id');
    router.add('listPeople', '/people/');
  });
  describe('#match()', function () {
    it('returns the name of the matching route', function () {
      expect(router.match('/people/123')).toEqual('showPerson');
    });
  });
});
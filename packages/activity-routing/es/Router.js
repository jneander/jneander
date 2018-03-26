import "core-js/modules/es6.array.from";
import "core-js/modules/es6.regexp.match";
import "core-js/modules/es6.symbol";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.assign";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import Route from './Route';

var Router =
/*#__PURE__*/
function () {
  function Router() {
    var contexts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Router);

    this.internals = {
      contexts: contexts,
      routeList: []
    };
    this.urls = {};
  }

  _createClass(Router, [{
    key: "add",
    value: function add(name, path) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var contextPaths = this.internals.contexts.map(function (context) {
        return context.path;
      });

      var fullPath = _toConsumableArray(contextPaths).concat([path]).join(''); // maybe trim slashes to ensure presence


      var route = new Route(name, this.internals.contexts, fullPath, details);
      this.internals.routeList.push(route);
      this.urls["".concat(name, "Url")] = route.buildUrl.bind(route);
    }
  }, {
    key: "context",
    value: function context(name, path, defineFn) {
      var context = new Router(_toConsumableArray(this.internals.contexts).concat([{
        name: name,
        path: path
      }]));
      defineFn(context);
      this.internals.routeList = this.internals.routeList.concat(context.internals.routeList);
      Object.assign(this.urls, context.urls);
    }
  }, {
    key: "match",
    value: function match(path, query) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.internals.routeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _route = _step.value;

          if (_route.match(path)) {
            return _route.buildActivity(path, query);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }]);

  return Router;
}();

export { Router as default };
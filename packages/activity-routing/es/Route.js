import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.regexp.match";
import "core-js/modules/es6.function.name";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import qs from 'qs';
import UrlPattern from 'url-pattern';

var Route =
/*#__PURE__*/
function () {
  function Route(name, contexts, path) {
    var details = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Route);

    this.internals = {
      urlPattern: new UrlPattern(path)
    };
    this.name = name;
    this.contexts = contexts;
    this.path = path;
    this.details = details;
  }

  _createClass(Route, [{
    key: "buildActivity",
    value: function buildActivity(path, query) {
      return _extends({
        name: this.name,
        contexts: this.contexts.map(function (context) {
          return context.name;
        })
      }, this.internals.urlPattern.match(path), {
        query: query
      });
    }
  }, {
    key: "buildHelpers",
    value: function buildHelpers() {
      return {
        url: function url(pathValues) {
          var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var pathString = this.internals.urlPattern.stringify(pathValues);
          var queryString = Object.keys(query).length > 0 ? "?".concat(qs.stringify(query)) : '';
          return pathString + queryString;
        }
      };
    }
  }, {
    key: "match",
    value: function match(path) {
      return !!this.internals.urlPattern.match(path);
    }
  }, {
    key: "buildUrl",
    value: function buildUrl() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var pathValueMap = {};
      this.internals.urlPattern.names.forEach(function (name, index) {
        pathValueMap[name] = args[index] || 'undefined';

        if (!args[index]) {
          console.warn("no value given for ".concat(name, " in path ").concat(_this.internals.urlPattern.regex));
        }
      });
      var pathString = this.internals.urlPattern.stringify(pathValueMap);
      var query = args[this.internals.urlPattern.names.length] || {};
      var queryString = Object.keys(query).length > 0 ? "?".concat(qs.stringify(query)) : '';
      return pathString + queryString;
    }
  }]);

  return Route;
}();

export { Route as default };
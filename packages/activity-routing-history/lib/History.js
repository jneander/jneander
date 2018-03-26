"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.replace");

var _history = _interopRequireDefault(require("history"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createHistory;

if (process.env.NODE_ENV === 'test') {
  createHistory = require('history/createMemoryHistory').default;
} else {
  createHistory = require('history/createHashHistory').default;
}

function parseLocation(location) {
  var search = location.search.replace(/^\?/, '');
  return {
    path: location.pathname,
    query: _qs.default.parse(search)
  };
}

function buildLocation(location) {
  if (typeof location === 'string') {
    return location;
  }

  var path = location.path,
      _location$query = location.query,
      query = _location$query === void 0 ? {} : _location$query;
  return Object.keys(query).length > 0 ? "".concat(path, "?").concat(_qs.default.stringify(query)) : path;
}

var History =
/*#__PURE__*/
function () {
  function History() {
    _classCallCheck(this, History);

    this.internals = {
      history: createHistory()
    };
  }

  _createClass(History, [{
    key: "listen",
    value: function listen(callback) {
      this.unlisten();
      this.internals.unlisten = this.internals.history.listen(function (location, action) {
        callback(parseLocation(location));
      });
    }
  }, {
    key: "unlisten",
    value: function unlisten() {
      if (this.internals.unlisten) {
        this.internals.unlisten();
        this.internals.unlisten = null;
      }
    }
  }, {
    key: "pushLocation",
    value: function pushLocation(location) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        external: false,
        confirmation: null
      };
      // TODO: support external navigation with conditional confirmation (unsaved)
      var fullPath = buildLocation(location);

      if (this.internals.history.location.pathname !== fullPath) {
        this.internals.history.push(fullPath);
      }
    }
  }, {
    key: "replaceLocation",
    value: function replaceLocation(location) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        external: false,
        confirmation: null
      };
      // TODO: support external navigation with conditional confirmation (unsaved)
      var fullPath = buildLocation(location);

      if (this.internals.history.location.pathname !== fullPath) {
        this.internals.history.replace(fullPath);
      }
    }
  }, {
    key: "pushQuery",
    value: function pushQuery(query) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        merge: false
      };
    }
  }, {
    key: "replaceQuery",
    value: function replaceQuery(query) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        merge: false
      };
    }
  }, {
    key: "getCurrentLocation",
    value: function getCurrentLocation() {
      return parseLocation(this.internals.history.location);
    }
  }, {
    key: "setConfirmation",
    value: function setConfirmation(message) {// TODO: implement this
      // TODO: is the `once` option necessary? it would likely be used only for
      // explicit (push|replace)Location confirmations

      var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }
  }, {
    key: "removeConfirmation",
    value: function removeConfirmation() {// TODO: implement this
    }
  }]);

  return History;
}();

exports.default = History;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concat = concat;
exports.get = get;
exports.merge = merge;
exports.push = push;
exports.set = set;
exports.unset = unset;
exports.thread = thread;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.from");

var _fp = _interopRequireDefault(require("lodash/fp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function concat(state, path, data) {
  if (data.length > 0) {
    var currentData = _fp.default.get(path, state) || [];

    var updatedData = _toConsumableArray(currentData).concat(_toConsumableArray(data));

    return _fp.default.set(path, updatedData, state);
  }

  return state;
}

function get(state, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _fp.default.getOr(defaultValue, path, state);
}

function merge(state, path, datum) {
  if (Object.keys(datum).length > 0) {
    var currentData = _fp.default.get(path, state) || {};

    var updatedData = _extends({}, currentData, datum);

    return _fp.default.set(path, updatedData, state);
  }

  return state;
}

function push(state, path, datum) {
  var currentData = _fp.default.get(path, state) || [];

  var updatedData = _toConsumableArray(currentData).concat([datum]);

  return _fp.default.set(path, updatedData, state);
}

function set(state, path, data) {
  return _fp.default.set(path, data, state);
}

function unset(state, path) {
  return _fp.default.unset(path, state);
}

function thread(state) {
  for (var _len = arguments.length, accessors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    accessors[_key - 1] = arguments[_key];
  }

  return accessors.reduce(function (updatedState, accessor) {
    return accessor(updatedState);
  }, state);
}
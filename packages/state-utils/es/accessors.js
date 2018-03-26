import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.array.from";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import _ from 'lodash/fp';
export function concat(state, path, data) {
  if (data.length > 0) {
    var currentData = _.get(path, state) || [];

    var updatedData = _toConsumableArray(currentData).concat(_toConsumableArray(data));

    return _.set(path, updatedData, state);
  }

  return state;
}
export function get(state, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _.getOr(defaultValue, path, state);
}
export function merge(state, path, datum) {
  if (Object.keys(datum).length > 0) {
    var currentData = _.get(path, state) || {};

    var updatedData = _extends({}, currentData, datum);

    return _.set(path, updatedData, state);
  }

  return state;
}
export function push(state, path, datum) {
  var currentData = _.get(path, state) || [];

  var updatedData = _toConsumableArray(currentData).concat([datum]);

  return _.set(path, updatedData, state);
}
export function set(state, path, data) {
  return _.set(path, data, state);
}
export function unset(state, path) {
  return _.unset(path, state);
}
export function thread(state) {
  for (var _len = arguments.length, accessors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    accessors[_key - 1] = arguments[_key];
  }

  return accessors.reduce(function (updatedState, accessor) {
    return accessor(updatedState);
  }, state);
}
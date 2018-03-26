"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Activity(props) {
  if ('name' in props) {
    if (props.name === props.currentActivity.name) {
      return props.children;
    }
  }

  if ('names' in props) {
    if (props.names.includes(props.currentActivity.name)) {
      return props.children;
    }
  }

  if ('context' in props) {
    if (props.currentActivity.contexts.includes(props.context)) {
      return props.children;
    }
  }

  return null;
}

function mapStateToProps(state, ownProps) {
  return {
    currentActivity: state.activity
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(Activity);

exports.default = _default;
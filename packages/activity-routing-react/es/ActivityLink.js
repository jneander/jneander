import "core-js/modules/es6.symbol";
import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.regexp.replace";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import Button from 'instructure-ui/lib/components/Button';
import Link from 'instructure-ui/lib/components/Link';

var ActivityLink =
/*#__PURE__*/
function (_Component) {
  _inherits(ActivityLink, _Component);

  function ActivityLink(props, context) {
    var _this;

    _classCallCheck(this, ActivityLink);

    _this = _possibleConstructorReturn(this, (ActivityLink.__proto__ || Object.getPrototypeOf(ActivityLink)).call(this, props, context));

    _this.handleClick = function (event) {
      event.preventDefault();

      if (props.replace) {
        context.routing.replaceLocation(_this.props.href);
      } else {
        context.routing.pushLocation(_this.props.href);
      }
    };

    return _this;
  }

  _createClass(ActivityLink, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          as = _props.as,
          children = _props.children,
          props = _objectWithoutProperties(_props, ["as", "children"]);

      if (as === 'button') {
        return React.createElement(Button, _extends({}, props, {
          onClick: this.handleClick
        }), children);
      } else {
        return React.createElement(Link, _extends({}, props, {
          onClick: this.handleClick
        }), children);
      }
    }
  }]);

  ActivityLink.displayName = "ActivityLink"
  ;
  return ActivityLink;
}(Component);

Object.defineProperty(ActivityLink, "contextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    routing: shape({
      getActivity: func.isRequired,
      pushLocation: func.isRequired,
      replaceLocation: func.isRequired
    })
  }
});
export { ActivityLink as default };
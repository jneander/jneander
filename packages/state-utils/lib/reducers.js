"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildReducer = buildReducer;
exports.composeReducer = composeReducer;

function validateHandlers(handlers) {
  // eslint-disable-next no-console
  console.assert(!(undefined in handlers), '"undefined" is not a valid action type');
}

function buildReducer(handlers) {
  validateHandlers(handlers);
  return function (state, action) {
    try {
      if (!action.type) {
        console.debug('dispatched action has no type');
        return state;
      }

      var handler = handlers[action.type];

      if (handler) {
        return handler(state, action);
      }
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }

    return state;
  };
}

function composeReducer(reducers) {
  return function composedReducer(state, action) {
    return reducers.reduce(function (updatedState, reducer) {
      return reducer(updatedState, action);
    }, state);
  };
}
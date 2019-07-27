import history from 'history'
import qs from 'qs'

let createHistory

if (process.env.NODE_ENV === 'test') {
  createHistory = require('history/createMemoryHistory').default
} else {
  createHistory = require('history/createHashHistory').default
}

function parseLocation (location) {
  const search = location.search.replace(/^\?/, '')
  return {
    path: location.pathname,
    query: qs.parse(search)
  }
}

function buildLocation (location) {
  if (typeof location === 'string') {
    return location
  }
  const { path, query = {} } = location
  return Object.keys(query).length > 0 ? `${path}?${qs.stringify(query)}` : path
}

export default class History {
  constructor () {
    this.internals = {
      history: createHistory()
    }
  }

  listen (callback) {
    this.unlisten()
    this.internals.unlisten = this.internals.history.listen((location, action) => {
      callback(parseLocation(location))
    })
  }

  unlisten () {
    if (this.internals.unlisten) {
      this.internals.unlisten()
      this.internals.unlisten = null
    }
  }

  pushLocation (location, options = { external: false, confirmation: null }) {
    // TODO: support external navigation with conditional confirmation (unsaved)
    const fullPath = buildLocation(location)
    if (this.internals.history.location.pathname !== fullPath) {
      this.internals.history.push(fullPath)
    }
  }

  replaceLocation (location, options = { external: false, confirmation: null }) {
    // TODO: support external navigation with conditional confirmation (unsaved)
    const fullPath = buildLocation(location)
    if (this.internals.history.location.pathname !== fullPath) {
      this.internals.history.replace(fullPath)
    }
  }

  pushQuery (query, options = { merge: false }) {

  }

  replaceQuery (query, options = { merge: false }) {

  }

  getCurrentLocation () {
    return parseLocation(this.internals.history.location)
  }

  setConfirmation (message, once = false) {
    // TODO: implement this
    // TODO: is the `once` option necessary? it would likely be used only for
    // explicit (push|replace)Location confirmations
  }

  removeConfirmation () {
    // TODO: implement this
  }
}

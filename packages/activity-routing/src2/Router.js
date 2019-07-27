import qs from 'qs'

import Route from './Route'

function pathParts(path) {
  return path.split('/').filter(part => part)
}

function cleanPath(path) {
  return `/${path.replace(/^\//, '')}`
}

export default class Router {
  constructor(contexts = []) {
    this._contexts = [...contexts]
    this._routeList = []
  }

  add(name, path) {
    const contextPaths = this._contexts.map(context => context.path)
    const paths = pathParts(path).map(cleanPath)
    const fullPath = [...contextPaths, ...paths].join('')
    const route = new Route(name, fullPath)
    this._routeList.push(route)
  }

  within(path, defineFn) {
    const context = new Router([...this._contexts, {path: cleanPath(path)}])
    defineFn(context)
    this._routeList = this._routeList.concat(context._routeList)
  }

  buildActivity(activityName, params, query) {
    const route = this._routeList.find(route => route.activityName === activityName)

    if (route == null) {
      return null
    }

    return route.buildActivity(params, query)
  }

  buildActivityFromLocation(path, query) {
    const matchingRoutes = this._routeList.filter(route => route.match(path))

    if (matchingRoutes.length === 0) {
      return null
    }

    matchingRoutes.sort((routeA, routeB) => routeA.match(path) - routeB.match(path))
    return matchingRoutes[0].buildActivityFromLocation(path, qs.parse(query))
  }
}

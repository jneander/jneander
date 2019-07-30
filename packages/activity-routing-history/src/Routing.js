export default class Routing {
  constructor({history, router}) {
    this._history = history
    this._router = router
  }

  get history() {
    return this._history
  }

  get router() {
    return this._router
  }

  getCurrentActivity() {
    const {pathname, search} = this.history.location
    return this.router.buildActivityFromLocation(pathname, search.replace(/^\?/, ''))
  }

  setActivity(activity, method = 'push') {
    const currentActivity = this.getCurrentActivity()
    if (activity.url === currentActivity.url) {
      return
    }

    if (method === 'replace') {
      this.history.replace(activity.url)
    } else {
      this.history.push(activity.url)
    }
  }

  setQuery(queryDatum, method = 'push') {
    const {name, params} = this.getCurrentActivity()
    const activity = this.router.buildActivity(name, params, queryDatum)
    this.setActivity(activity, method)
  }

  updateQuery(queryDatum, method = 'push') {
    const {query} = this.getCurrentActivity()
    this.setQuery({...query, ...queryDatum}, method)
  }

  subscribe(callback) {
    return this.history.listen(location => {
      const {pathname, search} = location
      callback(this.router.buildActivityFromLocation(pathname, search))
    })
  }
}

export default class ClientStorage {
  constructor(scope = '') {
    this.scope = scope
  }

  buildKey(key) {
    return this.scope ? `${this.scope}:${key}` : key
  }

  getData(key, defaultValue) {
    if (this.buildKey(key) in localStorage) {
      return JSON.parse(localStorage[this.buildKey(key)])
    }
    return defaultValue
  }

  setData(key, value) {
    if (typeof value === 'undefined') {
      this.removeData(key)
    } else {
      localStorage.setItem(this.buildKey(key), JSON.stringify(value))
    }
  }

  removeData(key) {
    localStorage.removeItem(this.buildKey(key))
  }
}

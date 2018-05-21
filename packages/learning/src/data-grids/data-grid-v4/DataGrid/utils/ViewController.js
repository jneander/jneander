import React, {Component} from 'react'
import {func} from 'prop-types'

export default class ViewController extends Component {
  static childContextTypes = {
    connectView: func,
    disconnectView: func
  }

  static propTypes = {
    children: func.isRequired
  }

  constructor(props) {
    super(props)

    this._views = []

    this.connectView = this.connectView.bind(this)
    this.disconnectView = this.disconnectView.bind(this)
    this.syncScrollPositions = this.syncScrollPositions.bind(this)

    this._handleNodeScroll = event => {
      const node = event.target
      window.requestAnimationFrame(() => {
        this.syncScrollPositions(node)
      })
    }
  }

  connectView(view) {
    const viewIndex = this._views.findIndex(connectedView => connectedView._node === view._node)
    if (viewIndex === -1) {
      const primaryView = this._views.find(view => view.isPrimary)
      if (primaryView) {
        view.syncScrollToNode(primaryView._node)
      }
      view.addScrollListener(this._handleNodeScroll)
      this._views.push(view)
    }
  }

  disconnectView(view) {
    const viewIndex = this._views.findIndex(connectedView => connectedView._node === view._node)
    if (viewIndex !== -1) {
      const view = this._views[viewIndex]
      view.removeScrollListener()
      this._views.splice(viewIndex, 1)
    }
  }

  getChildContext() {
    return {
      connectView: this.connectView,
      disconnectView: this.disconnectView
    }
  }

  syncScrollPositions(node) {
    for (let i = 0; i < this._views.length; i++) {
      const view = this._views[i]

      if (node !== view._node) {
        view.removeScrollListener()
        view.syncScrollToNode(node)

        window.requestAnimationFrame(() => {
          view.addScrollListener(this._handleNodeScroll)
        })
      }
    }
  }

  render() {
    return this.props.children()
  }
}

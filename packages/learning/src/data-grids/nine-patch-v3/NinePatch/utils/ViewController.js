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

    this._scrollDirectionData = {
      lastScrollLeft: 0,
      lastScrollNode: null,
      lastScrollTop: 0,
      waiting: false
    }

    this._handleNodeScroll = event => {
      const node = event.target
      window.requestAnimationFrame(() => {
        this.syncScrollPositions(node)
      })
    }

    this._updateDirectionDataFromNode = node => {
      const {scrollLeft, scrollTop} = node
      const {lastScrollLeft, lastScrollTop} = this._scrollDirectionData

      let horizontalScrollDirection = 0
      if (lastScrollLeft !== scrollLeft) {
        horizontalScrollDirection = lastScrollLeft < scrollLeft ? 1 : -1
      }

      let verticalScrollDirection = 0
      if (lastScrollTop !== scrollTop) {
        verticalScrollDirection = lastScrollTop < scrollTop ? 1 : -1
      }

      this._scrollDirectionData = {
        ...this._scrollDirectionData,
        lastScrollLeft: scrollLeft,
        lastScrollNode: node,
        lastScrollTop: scrollTop
      }

      this.setState({horizontalScrollDirection, verticalScrollDirection})
    }

    this._updateScrollData = node => {
      const {scrollLeft, scrollTop} = node

      if (this._scrollDirectionData.lastScrollNode === node) {
        if (this._scrollDirectionData.timeout) {
          clearTimeout(this._scrollDirectionData.timeout)
          this._scrollDirectionData.timeout = null
        }

        this._updateDirectionDataFromNode(node)

        this._scrollDirectionData.timeout = setTimeout(() => {
          this._updateDirectionDataFromNode(node)
          this._scrollDirectionData.timeout = null
        }, 50)

        // TODO: there is a flicker in the scroll direction when the scrolling
        // is slow
      } else if (!this._scrollDirectionData.waiting) {
        this._scrollDirectionData = {
          lastScrollLeft: scrollLeft,
          lastScrollNode: node,
          lastScrollTop: scrollTop,
          waiting: true
        }
      }
    }

    this.state = {
      horizontalScrollDirection: 0,
      verticalScrollDirection: 0
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
    this._updateScrollData(node)
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
    return this.props.children(this.state)
  }
}

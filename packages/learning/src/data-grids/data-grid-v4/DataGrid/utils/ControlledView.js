import {Children, Component} from 'react'
import ReactDOM from 'react-dom'
import {func, node} from 'prop-types'

export default class ControlledView extends Component {
  static contextTypes = {
    connectView: func.isRequired,
    disconnectView: func.isRequired
  }

  static defaultProps = {
    horizontal: false,
    vertical: false
  }

  static propTypes = {
    children: node.isRequired
  }

  constructor(props) {
    super(props)

    this.addScrollListener = this.addScrollListener.bind(this)
    this.removeScrollListener = this.removeScrollListener.bind(this)
    this.syncScrollToNode = this.syncScrollToNode.bind(this)
  }

  get isPrimary() {
    return this.props.vertical && this.props.horizontal
  }

  addScrollListener(handler) {
    this._scrollHandler = handler
    this._node.addEventListener('scroll', this._scrollHandler)
  }

  componentDidMount() {
    // TODO: replace ReactDOM.findDOMNode with node ref passed to child
    this._node = ReactDOM.findDOMNode(this)
    this.context.connectView(this)
  }

  componentWillUnmount() {
    this.context.disconnectView(this._view)
  }

  removeScrollListener() {
    this._node.removeEventListener('scroll', this._scrollHandler)
    this._scrollHandler = null
  }

  syncScrollToNode(node) {
    const {clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth} = node

    const scrollTopOffset = scrollHeight - clientHeight
    const scrollLeftOffset = scrollWidth - clientWidth

    if (this.props.vertical && scrollTopOffset > 0) {
      this._node.scrollTop = scrollTop
    }

    if (this.props.horizontal && scrollLeftOffset > 0) {
      this._node.scrollLeft = scrollLeft
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}

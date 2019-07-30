import {node} from 'prop-types'
import React, {Component} from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = {error: null}
  }

  componentDidCatch(error, errorInfo) {
    this.setState({error, errorInfo})
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          {this.state.error && this.state.error.toString()}

          <br />

          {this.state.errorInfo.componentStack}
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: node.isRequired
}

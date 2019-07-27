import React, {PureComponent} from 'react'
import {func, shape} from 'prop-types'

export default class Link extends PureComponent {
  static contextTypes = {
    routing: shape({
      getActivity: func.isRequired,
      pushLocation: func.isRequired,
      replaceLocation: func.isRequired
    }).isRequired
  }

  static propTypes = {
    as: func.isRequired
  }

  constructor(props, context) {
    super(props, context)

    this.handleClick = event => {
      event.preventDefault()
      if (props.replace) {
        context.routing.replaceLocation(this.props.href)
      } else {
        context.routing.pushLocation(this.props.href)
      }
    }
  }

  render() {
    const {as, ...props} = this.props

    return <as {...props} onClick={this.handleClick} />
  }
}

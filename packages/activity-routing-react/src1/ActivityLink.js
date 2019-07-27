import React, {PureComponent} from 'react'
import {func} from 'prop-types'

export default class ActivityLink extends PureComponent {
  static defaultProps = {
    as: React.DOM.a
  }

  static propTypes = {
    as: func,
    consumer: func.isRequired,
    routingFromConsumer: func.isRequired
  }

  render() {
    const createClickHandler = routing => event => {
      event.preventDefault()
      routing.pushLocation(this.props.href)
    }

    const {as: Component, consumer: Consumer, consumerFn, ...linkProps} = this.props

    return (
      <Consumer>
        {props => <Component {...linkProps} onClick={createClickHandler(routingFromConsumer(props))} />}
      </Consumer>
    )
  }
}

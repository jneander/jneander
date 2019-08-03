import {elementType, node, string} from 'prop-types'
import React from 'react'

export default function createRoutingView(RoutingConsumer) {
  function RoutingView(props) {
    const {as: Component, children} = props

    const renderChildren = () => {
      if (Component) {
        return <Component />
      }
      return children
    }

    return (
      <RoutingConsumer>
        {routing => {
          const currentActivity = routing.getCurrentActivity()

          if (props.name === currentActivity.name) {
            return renderChildren()
          }

          return null
        }}
      </RoutingConsumer>
    )
  }

  RoutingView.propTypes = {
    as: elementType,
    children: node,
    name: string.isRequired
  }

  RoutingView.defaultProps = {
    as: null,
    children: null
  }

  return RoutingView
}

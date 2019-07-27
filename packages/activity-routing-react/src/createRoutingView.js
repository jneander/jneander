import React from 'react'

export default function createRoutingView(RoutingConsumer) {
  return function RoutingTrigger(props) {
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
}

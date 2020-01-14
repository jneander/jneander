import {func, instanceOf, node} from 'prop-types'
import React, {PureComponent, createContext, useContext, useEffect, useState} from 'react'

import {Routing} from '@jneander/activity-routing-history'

export default function createRoutingContext() {
  const context = createContext()
  const {Consumer, Provider} = context

  function RoutingProvider(props) {
    const [state, setState] = useState({
      currentActivity: props.routing.getCurrentActivity(),
      routing: props.routing
    })

    useEffect(() => {
      return props.routing.subscribe(currentActivity => {
        setState({currentActivity, routing: props.routing})
      })
    }, [])

    return <Provider value={state}>{props.children}</Provider>
  }

  RoutingProvider.propTypes = {
    children: node.isRequired,
    routing: instanceOf(Routing)
  }

  class RoutingConsumer extends PureComponent {
    render() {
      return <Consumer>{providerState => this.props.children(providerState.routing)}</Consumer>
    }
  }

  RoutingConsumer.propTypes = {
    children: func.isRequired
  }

  function useRouting() {
    const value = useContext(context)
    return value.routing
  }

  function useRoutingTriggerBuilder() {
    const routing = useRouting()

    return function build(activityName, params = {}, query = {}, method = 'push') {
      const activity = routing.router.buildActivity(activityName, params, query)

      const onClick = event => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
          return
        }

        event.preventDefault()
        routing.setActivity(activity, method)
      }

      return {href: activity.url, onClick}
    }
  }

  function useRoutingTrigger(activityName, params = {}, query = {}, method = 'push') {
    const build = useRoutingTriggerBuilder()
    return build(activityName, params, query, method)
  }

  return {
    RoutingConsumer,
    RoutingProvider,
    useRouting,
    useRoutingTrigger,
    useRoutingTriggerBuilder
  }
}

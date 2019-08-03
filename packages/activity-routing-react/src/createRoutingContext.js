import {func, instanceOf, node} from 'prop-types'
import React, {PureComponent, createContext, useContext} from 'react'

import {Routing} from '@jneander/activity-routing-history'

export default function createRoutingContext() {
  const context = createContext()
  const {Consumer, Provider} = context

  class RoutingProvider extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        currentActivity: props.routing.getCurrentActivity(),
        routing: props.routing
      }
    }

    componentWillMount() {
      this.unsubscribe = this.props.routing.subscribe(currentActivity => {
        this.setState({currentActivity})
      })
    }

    componentWillUnmount() {
      this.unsubscribe()
      this.unsubscribe = null
    }

    render() {
      return <Provider value={this.state}>{this.props.children}</Provider>
    }
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

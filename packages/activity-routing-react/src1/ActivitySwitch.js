import React, {Children, PureComponent} from 'react'

export default class ActivitySwitch extends PureComponent {
  render() {
    const {children, activity} = this.props

    let Component

    Children.forEach(children, child => {
      if (Component == null && React.isValidElement(child)) {
        const {as, context, name, names} = child.props

        if (name != null && name === activity.name) {
          Component = as
        }

        if (names.includes(activity.name)) {
          Component = as
        }

        if (context && activity.contexts.includes(context)) {
          Component = as
        }
      }
    })

    return Component ? <Component key={Component.displayName} /> : null
  }
}

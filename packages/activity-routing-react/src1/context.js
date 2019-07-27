// import React, {Component} from 'react'
// import createReactContext from 'create-react-context'

// const {Consumer, Provider} = createReactContext()

// export default class RoutingProvider extends Component {
//   constructor(props) {
//     super(props)

//     this.routing = props.routing
//   }

//   componentDidMount() {
//     this.routing.initialize()
//   }

//   componentWillUnmount() {
//     this.routing.uninitialize()
//   }

//   render() {
//     return <Provider value={{routing}}>{this.props.children}</Provider>
//   }
// }

// export function createConsumer(mapStateToProps) {
//   return class RoutingConsumer extends Component {
//     render() {
//       return <Consumer>{({routing}) => this.props.children(mapStateToProps(accessors))}</Consumer>
//     }
//   }
// }

// export function connectConsumer(ConsumingComponent, mapStateToProps) {
//   return class RoutingConsumer extends Component {
//     render() {
//       return (
//         <Consumer>
//           {accessors => <ConsumingComponent {...this.props} {...mapStateToProps(accessors)} />}
//         </Consumer>
//       )
//     }
//   }
// }

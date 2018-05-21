import React, {PureComponent} from 'react'

export default class FixedText extends PureComponent {
  constructor(props) {
    super(props)

    this.updateText = this.updateText.bind(this)

    this.state = {
      left: 0,
      top: 0
    }
  }

  updateText(details) {
    this.setState(details)
  }

  render() {
    const style = {
      position: 'absolute'
    }

    return (
      <div style={style}>
        <span style={{display: 'block'}}>Left: {this.state.left}</span>
        <span style={{display: 'block'}}>Top: {this.state.top}</span>
        <span style={{display: 'block'}}>Horizontal: {this.props.horizontalScrollDirection}</span>
        <span style={{display: 'block'}}>Vertical: {this.props.verticalScrollDirection}</span>
      </div>
    )
  }
}

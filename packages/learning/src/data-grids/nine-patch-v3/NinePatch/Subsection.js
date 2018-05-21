import React, {PureComponent} from 'react'

import ControlledView from './utils/ControlledView'
import FixedText from './utils/FixedText'
import styles from './styles.css'

export default class Subsection extends PureComponent {
  static defaultProps = {
    horizontalScroll: false,
    verticalScroll: false
  }

  constructor(props) {
    super(props)

    this._bindScrollParent = ref => {
      this._scrollParent = ref
    }

    this._bindFixedText = ref => {
      this._fixedText = ref
    }

    this._handleNodeScroll = () => {
      const {scrollLeft, scrollTop} = this._scrollParent
      const {horizontalScrollDirection, verticalScrollDirection} = this.props

      this._fixedText.updateText({
        horizontalScrollDirection,
        left: scrollLeft,
        top: scrollTop,
        verticalScrollDirection
      })
    }
  }

  componentDidMount() {
    this._scrollParent.addEventListener('scroll', this._handleNodeScroll)
  }

  componentWillUnmount() {
    this._scrollParent.removeEventListener('scroll', this._handleNodeScroll)
  }

  render() {
    const contentStyle = {
      height: `${this.props.contentHeight}px`,
      width: `${this.props.contentWidth}px`
    }

    const className = this.props.verticalScroll
      ? styles.ScrollableSubsectionContainer
      : styles.FrozenSubsectionContainer

    const {horizontalScroll, verticalScroll} = this.props

    if (horizontalScroll || verticalScroll) {
      return (
        <ControlledView horizontal={horizontalScroll} vertical={verticalScroll}>
          <div className={className} ref={this._bindScrollParent}>
            <div className={styles.Subsection} style={contentStyle}>
              <FixedText
                horizontalScrollDirection={this.props.horizontalScrollDirection}
                ref={this._bindFixedText}
                verticalScrollDirection={this.props.verticalScrollDirection}
              />
            </div>
          </div>
        </ControlledView>
      )
    }

    return (
      <div className={className} ref={this._bindScrollParent}>
        <div className={styles.Subsection} style={contentStyle} />
      </div>
    )
  }
}

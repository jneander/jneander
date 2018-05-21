import React, {PureComponent} from 'react'

import styles from './styles.css'

export default class ColumnHeader extends PureComponent {
  render() {
    const style = {
      height: `${this.props.height}px`,
      left: `${this.props.columnOffset}px`,
      position: 'absolute',
      top: `0px`,
      width: `${this.props.column.width}px`
    }

    const classNames = [styles.ColumnHeader, this.props.column.id]

    return (
      <div className={classNames.join(' ')} role="columnheader" style={style}>
        {this.props.children}
      </div>
    )
  }
}

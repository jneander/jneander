import React, {PureComponent} from 'react'

import ViewController from './utils/ViewController'
import Section from './Section'
import styles from './styles.css'

export default class NinePatch extends PureComponent {
  static defaultProps = {
    freezeColumnsEnd: 0,
    freezeColumnsStart: 0,
    freezeRowsEnd: 0,
    freezeRowsStart: 0
  }

  render() {
    const {columns, rows} = this.props

    const frozenColumnsStart = columns.slice(0, this.props.freezeColumnsStart)
    const frozenColumnsEnd = columns.slice(columns.length - this.props.freezeColumnsEnd)
    const scrollableColumns = columns.slice(
      this.props.freezeColumnsStart,
      columns.length - this.props.freezeColumnsEnd
    )

    const topRows = rows.slice(0, this.props.freezeRowsStart)
    const bottomRows = rows.slice(rows.length - this.props.freezeRowsEnd)
    const scrollableRows = rows.slice(
      this.props.freezeRowsStart,
      rows.length - this.props.freezeRowsEnd
    )

    const sectionProps = {
      bottomRows,
      freezeRowsEnd: this.props.freezeRowsEnd,
      freezeRowsStart: this.props.freezeRowsStart,
      rowHeight: this.props.rowHeight,
      scrollableRows,
      topRows
    }

    return (
      <ViewController>
        {viewControllerProps => (
          <div className={styles.Container}>
            {frozenColumnsStart.length > 0 && (
              <Section {...sectionProps} {...viewControllerProps} columns={frozenColumnsStart} />
            )}

            <Section
              {...sectionProps}
              {...viewControllerProps}
              columns={scrollableColumns}
              horizontalScroll
            />

            {frozenColumnsEnd.length > 0 && (
              <Section {...sectionProps} {...viewControllerProps} columns={frozenColumnsEnd} />
            )}
          </div>
        )}
      </ViewController>
    )
  }
}

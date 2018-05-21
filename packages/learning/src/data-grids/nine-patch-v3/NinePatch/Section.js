import React, {PureComponent} from 'react'

import Subsection from './Subsection'
import styles from './styles.css'

export default class Section extends PureComponent {
  static defaultProps = {
    horizontalScroll: false
  }

  render() {
    const className = this.props.horizontalScroll ? styles.ScrollableSection : styles.FrozenSection
    const contentWidth = this.props.columns.reduce((sum, column) => sum + column.width, 0)
    const bottomContentHeight = this.props.bottomRows.length * this.props.rowHeight
    const scrollableContentHeight = this.props.scrollableRows.length * this.props.rowHeight
    const topContentHeight = this.props.topRows.length * this.props.rowHeight

    const subsectionProps = {
      columns: this.props.columns,
      contentWidth: contentWidth,
      horizontalScroll: this.props.horizontalScroll,
      horizontalScrollDirection: this.props.horizontalScrollDirection,
      rowHeight: this.props.rowHeight,
      verticalScrollDirection: this.props.verticalScrollDirection
    }

    return (
      <div className={className}>
        {this.props.topRows.length > 0 && (
          <Subsection
            {...subsectionProps}
            contentHeight={topContentHeight}
            firstRowIndex={0}
            rows={this.props.topRows}
          />
        )}

        <Subsection
          {...subsectionProps}
          contentHeight={scrollableContentHeight}
          firstRowIndex={this.props.topRows.length}
          rows={this.props.scrollableRows}
          verticalScroll
        />

        {this.props.topRows.length > 0 && (
          <Subsection
            {...subsectionProps}
            contentHeight={bottomContentHeight}
            firstRowIndex={this.props.topRows.length + this.props.scrollableRows.length}
            rows={this.props.bottomRows}
          />
        )}
      </div>
    )
  }
}

import React, {Component} from 'react'

import Row from '../Row'
import styles from './styles.css'

function getLocationFromEvent(event, self) {
  const cells = self.rowGroup.children
  const cellIndex = [].findIndex.call(cells, cell => cell.contains(event.target))

  if (cellIndex !== -1) {
    const columnIndex = cellIndex % self.props.columns.length
    const rowIndex = Math.floor(cellIndex / self.props.columns.length)

    return {
      columnId: self.props.columns[columnIndex].id,
      region: 'body',
      rowId: self.props.rows[rowIndex].id
    }
  }
  return {}
}

export default class Body extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.bindRowGroup = ref => {
      this.rowGroup = ref
    }

    this._cellCache = {}
  }

  componentWillReceiveProps(nextProps) {
    const {columnId: thisColumnId, rowId: thisRowId} = this.props.activeLocation
    const {columnId: nextColumnId, rowId: nextRowId} = nextProps.activeLocation
    if (thisColumnId !== nextColumnId || thisRowId !== nextRowId) {
      delete this._cellCache[`${thisColumnId}–${thisRowId}`]
      delete this._cellCache[`${nextColumnId}–${nextRowId}`]
    }
  }

  handleClick(event) {
    const location = getLocationFromEvent(event, this)
    this.props.onClick(event, location)
  }

  render() {
    const style = {
      top: `${this.props.headerHeight}px`
    }

    const {activeLocation, bindActiveElement, columns, rows} = this.props

    const cells = []

    let rowOffset = 0
    let columnOffset

    for (let r = 0; r < rows.length; r++) {
      const row = rows[r]
      const rowElementId = `row-${row.id}-label`
      const isActiveRow = activeLocation.rowId === row.id

      columnOffset = 0

      for (let c = 0; c < columns.length; c++) {
        const column = columns[c]
        const isActiveColumn = activeLocation.columnId === column.id
        const isActiveLocation = isActiveColumn && isActiveRow

        const cacheId = `${column.id}–${row.id}`
        let cell = this._cellCache[cacheId]

        if (!cell) {
          cell = this.props.renderCell({
            'aria-labelledby': `column-${column.id}-label,${rowElementId}`,
            column,
            focusableRef: isActiveLocation ? bindActiveElement : null,
            isActiveLocation,
            row,
            tabIndex: isActiveLocation ? '0' : '-1'
          })

          const props = {
            column: column,
            columnOffset: columnOffset,
            isEvenRow: r % 2 === 0,
            isFirstColumn: c === 0 && this.props.isInFirstSection,
            isFirstRow: r === 0,
            isLastColumn: c === columns.length - 1 && this.props.isInLastSection,
            isLastRow: r === rows.length - 1,
            key: `${row.id}_${column.id}`,
            height: this.props.rowHeight,
            row,
            rowOffset: r * this.props.rowHeight - r
          }

          cell = React.cloneElement(cell, props)
          this._cellCache[cacheId] = cell
        }

        cells.push(cell)

        columnOffset += column.width - 1 // account for border width
      }
    }

    return (
      <div
        className={styles.Body}
        onClick={this.handleClick}
        ref={this.bindRowGroup}
        role="rowgroup"
        style={style}
      >
        {cells}
      </div>
    )
  }
}

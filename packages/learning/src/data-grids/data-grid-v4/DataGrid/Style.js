import React, {PureComponent} from 'react'

import cellStyles from './Cell/styles.css'
import {ColumnHeader} from './ColumnHeader/styles.css'
import {Grid} from './styles.css'

export default class Style extends PureComponent {
  componentWillMount() {
    this.$styles = document.createElement('style')
    this.$styles.id = `DataGrid__Styles--${Grid}`
    this.$styles.type = 'text/css'
    document.head.appendChild(this.$styles)
  }

  componentDidUpdate() {
    const {highlightActiveColumn, highlightActiveLocation, highlightActiveRow} = this.props
    if (!(highlightActiveColumn || highlightActiveLocation || highlightActiveRow)) {
      return null
    }

    const {
      activeLocation: {columnId, rowId}
    } = this.props

    let styles = ''
    if (highlightActiveColumn) {
      styles += `
        .${Grid} .${cellStyles.Cell}.${columnId},
        .${Grid} .${ColumnHeader}.${columnId} {
          border-left-color: var(--activeBorderColor);
          border-right-color: var(--activeBorderColor);
          z-index: 2;
        }
        .${Grid} .${ColumnHeader}.${columnId} {
          border-top-color: var(--activeBorderColor);
          border-bottom-color: var(--activeBorderColor);
        }
        .${Grid} .${cellStyles.Cell}.${columnId}.${cellStyles.FirstRow} {
          border-top-color: var(--activeBorderColor);
        }
        .${Grid} .${cellStyles.Cell}.${columnId}.${cellStyles.LastRow} {
          border-bottom-color: var(--activeBorderColor);
        }
      `
    }

    if (highlightActiveRow) {
      styles += `
        .${Grid} .${cellStyles.Cell}.${rowId} {
          border-bottom-color: var(--activeBorderColor);
          border-top-color: var(--activeBorderColor);
          z-index: 2;
        }
        .${Grid} .${cellStyles.Cell}.${rowId}.${cellStyles.FirstColumn} {
          border-left-color: var(--activeBorderColor);
        }
        .${Grid} .${cellStyles.Cell}.${rowId}.${cellStyles.LastColumn} {
          border-right-color: var(--activeBorderColor);
        }
      `
    }

    if (highlightActiveLocation) {
      styles += `
        .${Grid} .${cellStyles.Cell}.${columnId}.${rowId} {
          border-bottom-color: var(--activeBorderColor);
          border-left-color: var(--activeBorderColor);
          border-right-color: var(--activeBorderColor);
          border-top-color: var(--activeBorderColor);
          z-index: 3;
        }
      `
    }

    this.$styles.innerHTML = styles
  }

  componentWillUnmount() {
    this.$styles.remove()
  }

  render() {
    return null
  }
}

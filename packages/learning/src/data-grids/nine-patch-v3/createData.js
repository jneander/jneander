export default function createData(options) {
  const columns = []
  for (let c = 0; c < options.columnCount; c++) {
    columns.push({id: `${c}`.padStart(4, '0'), width: options.columnWidth})
  }

  const rows = []
  for (let r = 0; r < options.rowCount; r++) {
    rows.push({id: `${r}`.padStart(4, '0')})
  }

  return {columns, rows}
}

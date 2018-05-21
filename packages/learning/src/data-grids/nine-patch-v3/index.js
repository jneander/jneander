import React, {PureComponent} from 'react'
import Heading from '@instructure/ui-elements/lib/components/Heading'

import Layout from '../../shared/components/Layout'
import createData from './createData'
import NinePatch from './NinePatch'
import styles from './styles.css'

export default class NinePatchExample extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      dataOptions: {
        columnCount: 15,
        columnWidth: 80,
        rowCount: 15
      },
      structureOptions: {
        freezeColumnsEnd: 2,
        freezeColumnsStart: 2,
        freezeRowsEnd: 2,
        freezeRowsStart: 2
      },
      styleOptions: {
        rowHeight: 40
      }
    }

    this.state.data = createData(this.state.dataOptions)
  }

  render() {
    return (
      <Layout>
        <div className={styles.Root}>
          <Heading level="h2">9-Patch v3</Heading>

          <div className={styles.ExampleContainer}>
            <NinePatch
              {...this.state.data}
              {...this.state.structureOptions}
              {...this.state.styleOptions}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

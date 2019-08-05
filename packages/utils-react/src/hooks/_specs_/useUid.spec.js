import React from 'react'

import {createContainer} from '@jneander/spec-utils-dom'
import {render} from '@jneander/spec-utils-react'

import {useUid} from '../..'

describe('Hooks > .useUid()', () => {
  let $container
  let component

  beforeEach(async () => {
    $container = createContainer()
    await renderComponent()
  })

  afterEach(() => {
    component.unmount()
    $container.remove()
  })

  function SpecComponent() {
    const firstId = useUid()
    const secondId = useUid()

    return (
      <div>
        <span id={firstId} className="span-1" />
        <span id={secondId} className="span-2" />
      </div>
    )
  }

  async function renderComponent() {
    component = await render(<SpecComponent />, {$container})
  }

  function getIdFor(spanNum) {
    return $container.querySelector(`.span-${spanNum}`).id
  }

  it('creates a uid to be used by components', () => {
    expect(getIdFor(1)).to.match(/^uid_.{12}$/)
  })

  it('creates a different uid for each call', () => {
    expect(getIdFor(1)).not.to.equal(getIdFor(2))
  })

  it('uses the same ids for the same components across renders', async () => {
    const id = getIdFor(1)
    await renderComponent()
    expect(getIdFor(1)).to.equal(id)
  })
})

import {elementType} from 'prop-types'
import React from 'react'

const style = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  width: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  position: 'absolute'
}

export default function VisuallyHidden(props) {
  const {as: Component, ...otherProps} = props

  return <Component {...otherProps} style={style} />
}

VisuallyHidden.propTypes = {
  as: elementType
}

VisuallyHidden.defaultProps = {
  as: 'span'
}

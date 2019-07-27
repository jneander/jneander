import React, {Children, Component} from 'react'

export default function FirstChild(props) {
  const children = Children.toArray(props.children)
  return children.find(child => child) || null
}

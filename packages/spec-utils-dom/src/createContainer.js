function withDefaultOptions(options) {
  return {
    $parent: document.body,
    as: 'div',
    ...options
  }
}

export default function createContainer(options = {}) {
  const {$parent, as} = withDefaultOptions(options)
  return $parent.appendChild(document.createElement(as))
}

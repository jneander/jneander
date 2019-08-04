import {queries} from '@testing-library/dom'

import {waitForCondition} from '@jneander/utils-async'

const exports = {}

const attributes = ['AltText', 'LabelText', 'Role', 'Text', 'Title']

const queryTypes = ['query', 'queryAll', 'get', 'getAll', 'find']

attributes.forEach(attribute => {
  queryTypes.forEach(queryType => {
    const name = `${queryType}By${attribute}`
    exports[name] = queries[name]
  })

  const getBy = queries[`getBy${attribute}`]
  exports[`findBy${attribute}`] = ($container, text, findOptions, waitOptions) =>
    waitForCondition(() => getBy($container, text, findOptions), waitOptions)
})

export default exports

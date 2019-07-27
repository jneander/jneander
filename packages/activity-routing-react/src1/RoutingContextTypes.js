import {func, shape} from 'prop-types'

const CONTEXT_KEY = Symbol('@@routing')

export default {
  [CONTEXT_KEY]: shape({
    getActivity: func.isRequired,
    pushLocation: func.isRequired,
    replaceLocation: func.isRequired
  }).isRequired
}

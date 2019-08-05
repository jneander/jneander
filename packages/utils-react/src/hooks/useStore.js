import {useEffect, useState} from 'react'

export default function useStore(store) {
  const [state, setState] = useState(store.getState())

  useEffect(() => store.subscribe(setState), [store])

  return [state, store.setState.bind(store)]
}

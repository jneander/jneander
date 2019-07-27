import {useState} from 'react'

import {uid} from '../../utils-general'

export default function useUid() {
  const [id] = useState(uid())
  return id
}

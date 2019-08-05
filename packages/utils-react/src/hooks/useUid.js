import {useState} from 'react'

import {uid} from '@jneander/utils'

export default function useUid() {
  const [id] = useState(uid())
  return id
}

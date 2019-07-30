/*
 * Based on original work: https://github.com/ai/nanoid/blob/b3fa096784d433a7e2cae68831074aaea0dce96e/non-secure/index.js
 * additionally on https://github.com/instructure/instructure-ui/blob/e229eefcbbc644720b266b152f1d9077fd2c1065/packages/uid/src/uid.js
 */

import {randInt} from './math'

const chars = 'qwertyuiopasdfghjklzxcvbnm_QWERTYUIOPASDFGHJKLZXCVBNM-1234567890'
const maxCharIndex = chars.length - 1

export default function uid(prefix = '', length = 12) {
  const id = `uid_${randomString(length)}`
  if (prefix) {
    return `${prefix}__${id}`
  }
  return id
}

function randomString(length) {
  let id = ''
  let intervals = 0
  while (intervals++ < length) {
    id += chars[randInt(maxCharIndex)]
  }
  return id
}

const DEFAULT_INTERVAL = 0
const DEFAULT_TIMEOUT = 1000 // ms

export default async function wait(conditionFn, options = {}) {
  return new Promise((resolve, reject) => {
    const intervalDuration = options.interval || DEFAULT_INTERVAL
    const timeoutDuration = options.timeout || DEFAULT_TIMEOUT

    let timeoutId

    const intervalFn = () => {
      const result = conditionFn()
      if (result) {
        clearInterval(intervalId)
        clearTimeout(timeoutId)
        resolve(result)
      }
    }
    const intervalId = setInterval(intervalFn, intervalDuration)

    const timeoutFn = () => {
      clearInterval(intervalId)
      reject(new Error('Timeout waiting for condition'))
    }
    timeoutId = setTimeout(timeoutFn, timeoutDuration)
  })
}

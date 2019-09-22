export default function findLast(array, conditionFn) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (conditionFn(array[i])) {
      return array[i]
    }
  }
}

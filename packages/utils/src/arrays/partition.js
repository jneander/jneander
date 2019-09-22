export default function partition(array, partitionSize) {
  if (isNaN(partitionSize) || partitionSize < 1) {
    return [array]
  }

  const list = []
  for (let startIndex = 0; startIndex < array.length; startIndex += partitionSize) {
    list.push(array.slice(startIndex, startIndex + partitionSize))
  }
  return list
}

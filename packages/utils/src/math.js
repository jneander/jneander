export function randInt(maxInclusive = 1, minInclusive = 0) {
  return (Math.random() * (maxInclusive + 1) - minInclusive) | 0
}

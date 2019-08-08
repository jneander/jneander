/*
 * TODO: this needs to account for different use cases
 * * bold vs 18pt font vs 16pt etc
 * * hit area, etc.
 */

export default function getA11yCompliance(contrast) {
  let compliance = 'FAIL'

  if (contrast >= 7.0) {
    compliance = 'AAA'
  } else if (contrast >= 4.5) {
    compliance = 'AA'
  } else if (contrast >= 3.0) {
    compliance = 'AA18'
  }

  return compliance
}

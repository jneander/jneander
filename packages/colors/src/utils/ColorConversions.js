import big from 'big.js'

/*
 * Portions of the following code have been adapted from
 * https://gist.github.com/mjackson/5311256
 */

const HEX3_REGEX = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i
// const HEX4_REGEX = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i
const HEX6_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
// const HEX8_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

function round(value, places = 2) {
  const m = 10 ** places
  return Math.round(value * m) / m
}

function matchRegex(hex, longRegex, shortRegex) {
  const lowerCase = hex.toLowerCase()

  let match = longRegex.exec(lowerCase)
  if (match == null) {
    match = shortRegex.exec(lowerCase)
    if (match != null) {
      match = match.map(value => '' + value + value)
    }
  }

  if (match == null) {
    throw new Error(`'${hex}' is not a valid hexadecimal color value`)
  }

  return match.slice(1).map(value => parseInt(value, 16))
}

export function hexToHsl(hex) {
  return rgbToHsl(...hexToRgb(hex))
}

export function hexToRgb(hex) {
  return matchRegex(hex, HEX6_REGEX, HEX3_REGEX)
}

export function hslToHex(h, s, l) {
  return rgbToHex(...hslToRgb(h, s, l))
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the sets [0, 359], [0, 1], and [0, 1],
 * respectively.
 * Returns r, g, and b in the set [0, 255].
 *
 * @exports
 * @param   {Number}  h  The hue
 * @param   {Number}  s  The saturation
 * @param   {Number}  l  The lightness
 * @return  {Array}      The RGB representation
 */
export function hslToRgb(h, s, l) {
  const chroma = big(s).times(
    big(1).minus(
      bigAbs(
        big(2)
          .times(l)
          .minus(1)
      )
    )
  )
  const huePrime = big(h).div(60)

  let x = chroma.times(big(1).minus(bigAbs(huePrime.mod(2).minus(1))))
  let rgb

  const zero = big(0)

  if (huePrime.lte(1)) {
    rgb = [chroma, x, zero]
  } else if (huePrime.lte(2)) {
    rgb = [x, chroma, zero]
  } else if (huePrime.lte(3)) {
    rgb = [zero, chroma, x]
  } else if (huePrime.lte(4)) {
    rgb = [zero, x, chroma]
  } else if (huePrime.lte(5)) {
    rgb = [x, zero, chroma]
  } else {
    rgb = [chroma, zero, x]
  }

  const m = big(l).minus(chroma.div(2))

  return [
    Math.round(rgb[0].plus(m).times(255)),
    Math.round(rgb[1].plus(m).times(255)),
    Math.round(rgb[2].plus(m).times(255))
  ]
}

function componentToHex(component) {
  return component.toString(16).padStart(2, '0')
}

export function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

/**
 * Converts an RGB color value to HSL. Conversion formula adapted from
 * http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255].
 * Returns h, s, and l in the sets [0, 359], [0, 1], and [0, 1], respectively.
 *
 * @export
 * @param   {Number}  red    The red color value
 * @param   {Number}  green  The green color value
 * @param   {Number}  blue   The blue color value
 * @return  {Array}          The HSL representation
 */
export function rgbToHsl(red, green, blue) {
  const r = big(red).div(255)
  const g = big(green).div(255)
  const b = big(blue).div(255)

  const max = bigMax(r, g, b)
  const min = bigMin(r, g, b)

  // lightness
  const l = max.plus(min).div(2)
  const maxMinusMin = max.minus(min)

  let h, s

  // hue
  if (max.eq(min)) {
    // color value is achromatic (neutral grey)
    h = big(0)
  } else {
    switch (max) {
      case r:
        h = g.minus(b).div(maxMinusMin)
        break
      case g:
        h = b
          .minus(r)
          .div(maxMinusMin)
          .plus(2)
        break
      case b:
        h = r
          .minus(g)
          .div(maxMinusMin)
          .plus(4)
        break
    }

    h = h
      .times(60)
      .plus(360)
      .mod(360)
  }

  // saturation
  if (max.eq(0) || min.eq(1)) {
    s = 0
  } else {
    s = max.minus(l).div(bigMin(l, big(1).minus(l)))
    s = round(s)
  }

  return [Math.round(h), s, round(l)]
}

function bigMax(...values) {
  let max = values[0]
  for (let i = 1; i < values.length; i++) {
    if (values[i].gt(max)) {
      max = values[i]
    }
  }
  return max
}

function bigMin(...values) {
  let min = values[0]
  for (let i = 1; i < values.length; i++) {
    if (values[i].lt(min)) {
      min = values[i]
    }
  }
  return min
}

function bigAbs(v) {
  return v.gt(0) ? v : v.times(-1)
}

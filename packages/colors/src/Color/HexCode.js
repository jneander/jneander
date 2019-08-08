import {hexToHsl, hexToRgb} from '../utils/ColorConversions'
import HSL from './HSL'
import RGB from './RGB'

export default class HexCode {
  constructor(hexCodeString = '#000000') {
    this._hexCodeString = hexCodeString.toUpperCase()
  }

  get hsl() {
    if (this._hsl == null) {
      this._hsl = new HSL(...hexToHsl(this._hexCodeString))
    }

    return this._hsl
  }

  get rgb() {
    if (this._rgb == null) {
      this._rgb = new RGB(...hexToRgb(this._hexCodeString))
    }

    return this._rgb
  }

  toCss() {
    return this._hexCodeString
  }

  toString() {
    return this._hexCodeString
  }
}

import {rgbToHex, rgbToHsl} from '../utils/ColorConversions'
import HexCode from './HexCode'
import HSL from './HSL'

function luminanceOfPercent(percent) {
  return percent <= 0.03928 ? percent / 12.92 : Math.pow((percent + .055) / 1.055, 2.4)
}

export default class RGB {
  constructor(red, green, blue) {
    this._red = red
    this._green = green
    this._blue = blue
  }

  get red() {
    return this._red
  }

  get green() {
    return this._green
  }

  get blue() {
    return this._blue
  }

  get luminance() {
    if (this._luminance == null) {
      // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
      const redLuminance = luminanceOfPercent(this.red / 255)
      const greenLuminance = luminanceOfPercent(this.green / 255)
      const blueLuminance = luminanceOfPercent(this.blue / 255)

      this._luminance = 0.2126 * redLuminance + 0.7152 * greenLuminance + 0.0722 * blueLuminance
    }

    return this._luminance
  }

  get hexCode() {
    if (this._hexCode == null) {
      this._hexCode = new HexCode(rgbToHex(this.red, this.green, this.blue))
    }

    return this._hexCode
  }

  get hsl() {
    if (this._hsl == null) {
      this._hsl = new HSL(...rgbToHsl(this.red, this.green, this.blue))
    }

    return this._hsl
  }

  toCss() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`
  }

  toString() {
    return [this.red, this.green, this.blue].join(', ')
  }
}

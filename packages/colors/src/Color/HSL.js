import {hslToHex, hslToRgb} from '../utils/ColorConversions'
import HexCode from './HexCode'
import RGB from './RGB'

export default class HSL {
  constructor(hue, saturation, lightness) {
    this._hue = hue
    this._saturation = saturation
    this._lightness = lightness
  }

  get hue() {
    return this._hue
  }

  get saturation() {
    return this._saturation
  }

  get lightness() {
    return this._lightness
  }

  get hexCode() {
    if (this._hexCode == null) {
      this._hexCode = new HexCode(hslToHex(this.hue, this.saturation, this.lightness))
    }

    return this._hexCode
  }

  get rgb() {
    if (this._rgb == null) {
      this._rgb = new RGB(...hslToRgb(this.hue, this.saturation, this.lightness))
    }

    return this._rgb
  }

  toCss() {
    return `hsl(${this.hue}, ${this.saturation}, ${this.lightness})`
  }

  toString() {
    return [this.hue, this.saturation, this.lightness].join(', ')
  }
}

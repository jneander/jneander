import HSL from './HSL'
import HexCode from './HexCode'
import RGB from './RGB'
import nameThatColor from '../utils/nameThatColor'

export default class Color {
  constructor(attr = {hsl: [0, 0, 0, 1.0]}) {
    this._attr = attr

    if ('hsl' in attr) {
      this._hsl = new HSL(...attr.hsl)
    }

    if ('rgb' in attr) {
      this._rgb = new RGB(...attr.rgb)
    }

    if ('hexCode' in attr) {
      this._hexCode = new HexCode(attr.hexCode)
    }

    this._hsl = this._hsl || (this._rgb || this._hexCode).hsl
    this._hexCode = this._hexCode || (this._rgb || this._hsl).hexCode
    this._rgb = this._rgb || (this._hsl || this._hexCode).rgb
  }

  get name() {
    if (this._name == null) {
      this._name = nameThatColor.name(this.hexCode)[1]
    }

    return this._name
  }

  get hsl() {
    return this._hsl
  }

  get rgb() {
    return this._rgb
  }

  get hexCode() {
    return this._hexCode
  }

  get luminance() {
    return this._rgb.luminance
  }

  get valueId() {
    if (this._valueId == null) {
      this._valueId = this.hexCode
    }

    return this._valueId
  }

  toCss() {
    return this._rgb.toCss()
  }
}

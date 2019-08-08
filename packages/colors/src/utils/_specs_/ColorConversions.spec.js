import * as ColorConversions from '../ColorConversions'

describe('Utils > Color Conversions', () => {
  function round(value) {
    return Math.round(value * 100) / 100
  }

  describe('.hexToHsl()', () => {
    const {hexToHsl} = ColorConversions

    it('converts hex black to HSL black', () => {
      expect(hexToHsl('#000000')).to.deep.equal([0, 0, 0])
    })

    it('converts hex white to HSL white', () => {
      expect(hexToHsl('#FFFFFF')).to.deep.equal([0, 0, 1])
    })

    it('converts greys', () => {
      expect(hexToHsl('#808080').map(round)).to.deep.equal([0, 0, 0.5])
    })

    it('converts pure red', () => {
      expect(hexToHsl('#FF0000')).to.deep.equal([0, 1, 0.5])
    })

    it('converts pure green', () => {
      expect(hexToHsl('#00FF00')).to.deep.equal([120, 1, 0.5])
    })

    it('converts pure blue', () => {
      expect(hexToHsl('#0000FF')).to.deep.equal([240, 1, 0.5])
    })

    it('ignores case', () => {
      expect(hexToHsl('#abcdef').map(round)).to.deep.equal([210, 0.68, 0.8])
    })

    it('accepts short hex codes', () => {
      expect(hexToHsl('#1af').map(round)).to.deep.equal([201, 1, 0.53])
    })

    it('accepts hex codes without a hash prefix', () => {
      expect(hexToHsl('1af').map(round)).to.deep.equal([201, 1, 0.53])
    })
  })

  describe('.hexToRgb()', () => {
    const {hexToRgb} = ColorConversions

    it('converts hex black to RGB black', () => {
      expect(hexToRgb('#000000')).to.deep.equal([0, 0, 0])
    })

    it('converts hex white to RGB white', () => {
      expect(hexToRgb('#FFFFFF')).to.deep.equal([255, 255, 255])
    })

    it('converts greys', () => {
      expect(hexToRgb('#A1A1A1')).to.deep.equal([161, 161, 161])
    })

    it('converts pure red', () => {
      expect(hexToRgb('#FF0000')).to.deep.equal([255, 0, 0])
    })

    it('converts pure green', () => {
      expect(hexToRgb('#00FF00')).to.deep.equal([0, 255, 0])
    })

    it('converts pure blue', () => {
      expect(hexToRgb('#0000FF')).to.deep.equal([0, 0, 255])
    })

    it('ignores case', () => {
      expect(hexToRgb('#abcdef')).to.deep.equal([171, 205, 239])
    })

    it('accepts short hex codes', () => {
      expect(hexToRgb('#1af')).to.deep.equal([17, 170, 255])
    })

    it('accepts hex codes without a hash prefix', () => {
      expect(hexToRgb('1af')).to.deep.equal([17, 170, 255])
    })
  })

  describe('.hslToHex()', () => {
    const {hslToHex} = ColorConversions

    it('converts HSL black to hex black', () => {
      expect(hslToHex(0, 0, 0)).to.equal('#000000')
    })

    it('converts HSL white to hex white', () => {
      expect(hslToHex(0, 0, 1)).to.equal('#ffffff')
    })

    it('converts greys', () => {
      expect(hslToHex(0, 0, 0.5)).to.equal('#808080')
    })

    it('converts pure red', () => {
      expect(hslToHex(0, 1, 0.5)).to.equal('#ff0000')
    })

    it('converts pure green', () => {
      expect(hslToHex(120, 1, 0.5)).to.equal('#00ff00')
    })

    it('converts pure blue', () => {
      expect(hslToHex(240, 1, 0.5)).to.equal('#0000ff')
    })
  })

  describe('.hslToRgb()', () => {
    const {hslToRgb} = ColorConversions

    it('converts HSL black to RGB black', () => {
      expect(hslToRgb(0, 0, 0)).to.deep.equal([0, 0, 0])
    })

    it('converts HSL white to RGB white', () => {
      expect(hslToRgb(0, 0, 1)).to.deep.equal([255, 255, 255])
    })

    it('ignores hue when converting HSL black', () => {
      expect(hslToRgb(127, 0, 0)).to.deep.equal([0, 0, 0])
    })

    it('ignores saturation when converting HSL black', () => {
      expect(hslToRgb(0, 0.5, 0)).to.deep.equal([0, 0, 0])
    })

    it('ignores hue when converting HSL white', () => {
      expect(hslToRgb(127, 0, 1)).to.deep.equal([255, 255, 255])
    })

    it('ignores saturation when converting HSL white', () => {
      expect(hslToRgb(0, 0.5, 1)).to.deep.equal([255, 255, 255])
    })

    it('converts greys', () => {
      expect(hslToRgb(0, 0, 0.5)).to.deep.equal([128, 128, 128])
    })

    it('converts pure red', () => {
      expect(hslToRgb(0, 1, 0.5)).to.deep.equal([255, 0, 0])
    })

    it('converts pure green', () => {
      expect(hslToRgb(120, 1, 0.5)).to.deep.equal([0, 255, 0])
    })

    it('converts pure blue', () => {
      expect(hslToRgb(240, 1, 0.5)).to.deep.equal([0, 0, 255])
    })

    it('converts values known to cause floating point errors', () => {
      const examples = [
        [[0, 0.75, 0.4], [179, 26, 26]],
        [[0, 0.01, 0.08], [21, 20, 20]],
        [[0, 0.75, 0.6], [230, 77, 77]],
        [[2, 0.5, 0.75], [223, 162, 159]],
        [[0, 0.01, 0.59], [151, 149, 149]]
      ]
      examples.forEach(([[h, s, l], [r, g, b]]) => {
        expect(hslToRgb(h, s, l)).to.deep.equal([r, g, b])
      })
    })
  })

  describe('.rgbToHsl()', () => {
    const {rgbToHsl} = ColorConversions

    it('converts RGB black to HSL black', () => {
      expect(rgbToHsl(0, 0, 0)).to.deep.equal([0, 0, 0])
    })

    it('converts RGB white to HSL white', () => {
      expect(rgbToHsl(255, 255, 255)).to.deep.equal([0, 0, 1])
    })

    it('converts greys', () => {
      expect(rgbToHsl(128, 128, 128)).to.deep.equal([0, 0, 0.5])
    })

    it('converts pure red', () => {
      expect(rgbToHsl(255, 0, 0)).to.deep.equal([0, 1, 0.5])
    })

    it('converts pure green', () => {
      expect(rgbToHsl(0, 255, 0)).to.deep.equal([120, 1, 0.5])
    })

    it('converts pure blue', () => {
      expect(rgbToHsl(0, 0, 255)).to.deep.equal([240, 1, 0.5])
    })
  })
})

// import * as ColorConversions from '../ColorConversions'

// function different(...vs) {
//   for (let i = 0; i < vs.length - 1; i++) {
//     if (vs[i] != vs[i + 1]) {
//       return true
//     }
//   }
//   return false
// }

// describe('Utils > Color Conversions', () => {
//   function round(value) {
//     return Math.round(value * 100) / 100
//   }

//   describe('rgbToHsl comparisons', () => {
//     const {big_rgbToHsl, rgbToHsl} = ColorConversions

//     const combos = []
//     for (let r = 0; r < 256; r++) {
//       for (let g = 0; g < 256; g++) {
//         for (let b = 0; b < 256; b++) {
//           combos.push([r, g, b])
//         }
//       }
//     }

//     const subset = combos.slice(0, 30000)

//     describe('.rgbToHsl()', () => {
//       it('converts RGB black to HSL black', () => {
//         expect(rgbToHsl(0, 0, 0)).to.deep.equal([0, 0, 0])
//       })

//       it('converts RGB white to HSL white', () => {
//         expect(rgbToHsl(255, 255, 255)).to.deep.equal([0, 0, 1])
//       })
//     })

//     describe('.big_rgbToHsl()', () => {
//       it('converts RGB black to HSL black', () => {
//         expect(big_rgbToHsl(0, 0, 0)).to.deep.equal([0, 0, 0])
//       })

//       it('converts RGB white to HSL white', () => {
//         expect(big_rgbToHsl(255, 255, 255)).to.deep.equal([0, 0, 1])
//       })
//     })

//     // LOG LOG: [211, 125, 225]
//     // LOG LOG: 292, 0.63, 0.69
//     // LOG LOG: 292, 0.62, 0.69.

//     const troubles = [
//       [211, 125, 225]
//     ]

//     it.skip('compares a known good vs the one we want', () => {
//       let failed = false
//       troubles.forEach(combo => {
//         if (failed) {
//           return
//         }

//         const [bh, bs, bl] = big_rgbToHsl(...combo)
//         const [sh, ss, sl] = rgbToHsl(...combo)

//         if (different(bh, sh) || different(bs, ss) || different(bl, sl)) {
//           failed = true
//           console.log(combo)
//           console.log(bh, bs, bl)
//           console.log(sh, ss, sl)
//           expect([sh, ss, sl]).to.deep.equal([bh, bs, bl])
//         }
//       })
//     })

//     const allSlices = []
//     for (let i = 0; i < combos.length; i += 20000) {
//       allSlices.push(combos.slice(i, i + 20000))
//     }

//     let start = 0
//     let end = 0

//     allSlices.forEach((slice, i) => {
//       start = end + 1
//       end += slice.length
//       it(`matches in ${start}–${end}/${combos.length}`, () => {
//         let failed = false

//         slice.forEach(combo => {
//           if (failed) {
//             return
//           }

//           const [bh, bs, bl] = big_rgbToHsl(...combo)
//           const [sh, ss, sl] = rgbToHsl(...combo)

//           if (different(bh, sh) || different(bs, ss) || different(bl, sl)) {
//             failed = true
//             console.log(combo)
//             console.log(bh, bs, bl)
//             console.log(sh, ss, sl)
//             expect([sh, ss, sl]).to.deep.equal([bh, bs, bl])
//           }
//         })
//       })
//     })

//   })

//   describe.skip('hslToRgb comparisons', () => {
//     const {hslToRgb, hslToRgbLight} = ColorConversions

//     const combos = []
//     for (let h = 0; h < 360; h++) {
//       for (let s = 0; s <= 1; s = round(s + 0.01)) {
//         for (let l = 0; l <= 1; l = round(l + 0.01)) {
//           combos.push([h, s, l])
//         }
//       }
//     }

//     const subset = combos.slice(0, 30000)

//     it('benchmarks A', () => {
//       let startTime = new Date()
//       subset.forEach(combo => {
//         hslToRgb(...combo)
//       })
//       console.log('finished', new Date() - startTime)
//       expect(true).to.be.true
//     })

//     it('benchmarks B', () => {
//       let startTime = new Date()
//       subset.forEach(combo => {
//         hslToRgbLight(...combo)
//       })
//       console.log('finished', new Date() - startTime)
//       expect(true).to.be.true
//     })

//     it.skip('compares a known good vs the one we want', () => {
//       let failed = false
//       subset.forEach(combo => {
//         if (failed) {
//           return
//         }
//         const [br3, bg3, bb3] = hslToRgb(...combo)
//         const [r3, g3, b3] = hslToRgbLight(...combo)

//         if (different(br3, r3) || different(bg3, g3) || different(bb3, b3)) {
//           failed = true
//           console.log(combo)
//           console.log(br3, bg3, bb3)
//           console.log(r3, g3, b3)
//           expect([r3, g3, b3]).to.deep.equal([br3, bg3, bb3])
//         }
//       })
//     })

//     const allSlices = []
//     for (let i = 0; i < combos.length; i += 20000) {
//       allSlices.push(combos.slice(i, i + 20000))
//     }

//     let start = 0
//     let end = 0

//     // allSlices.forEach((slice, i) => {
//     //   start = end + 1
//     //   end += slice.length
//     //   it.skip(`matches in ${start}–${end}/${combos.length}`, () => {
//     //     let failed = false
//     //     slice.forEach(combo => {
//     //       // ;[[0, 0.5, 0.2]].forEach(combo => {
//     //       if (failed) {
//     //         return
//     //       }
//     //       const [br1, bg1, bb1] = big_hslToRgb(...combo)
//     //       const [br2, bg2, bb2] = big_hslToRgb1(...combo)
//     //       const [br3, bg3, bb3] = big_hslToRgb2(...combo)
//     //       const [r1, g1, b1] = hslToRgb(...combo)
//     //       const [r2, g2, b2] = hslToRgb1(...combo)
//     //       const [r3, g3, b3] = hslToRgb2(...combo)

//     //       if (different(br1, br2, br3) || different(bg1, bg2, bg3) || different(bb1, bb2, bb3)) {
//     //         failed = true
//     //         console.log(combo)
//     //         console.log(br1, bg1, bb1)
//     //         console.log(br2, bg2, bb2)
//     //         console.log(br3, bg3, bb3)
//     //         console.log(r1, g1, b1)
//     //         console.log(r2, g2, b2)
//     //         console.log(r3, g3, b3)
//     //         expect(hslToRgb(...combo)).to.deep.equal(hslToRgb2(...combo))
//     //       }
//     //     })
//     //   })
//     // })
//   })
// })

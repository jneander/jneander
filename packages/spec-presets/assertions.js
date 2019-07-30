const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')

chai.use(chaiAsPromised)

window.chai = chai
window.expect = chai.expect

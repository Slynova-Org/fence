'use strict'

const NE = require('node-exceptions')

class InvalidUser extends NE.LogicalException {}

module.exports = { InvalidUser }

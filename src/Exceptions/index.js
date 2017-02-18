'use strict'

const NE = require('node-exceptions')

class InvalidUser extends NE.LogicalException {}
class GateNotFound extends NE.LogicalException {}
class PolicyNotFound extends NE.LogicalException {}

module.exports = { InvalidUser, GateNotFound, PolicyNotFound }

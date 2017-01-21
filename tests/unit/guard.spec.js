const test = require('japa')
const user = require('../stubs/user.json')
const Guard = new (require('../../src/Guard'))()

test.group('Guard', group => {
  test('it should return a Bouncer', assert => {
    const bounce = Guard.can(user)

    assert.equal(bounce.constructor.name, 'Bouncer')
  })
})

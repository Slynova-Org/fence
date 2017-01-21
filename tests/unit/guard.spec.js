const test = require('japa')
const user = require('../stubs/user.json')
const post = require('../stubs/post.json')
const Gate = new (require('../../src/Gate'))()
const Guard = new (require('../../src/Guard'))()
const Storage = require('../../src/Storage').instance

test.group('Guard', group => {
  test('it should return a Bouncer', assert => {
    const bounce = Guard.can(user)

    assert.equal(bounce.constructor.name, 'Bouncer')
  })

  test('it should store the default user', assert => {
    Guard.setDefaultUser(user)

    assert.equal(Storage.retrieveUser(), user)
  })

  test('it should provide short syntax for allows', assert => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)
    Guard.setDefaultUser(user)

    assert.isTrue(Guard.allows('post.update', post))
  })

  test('it should provide short syntax for denies', assert => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)
    Guard.setDefaultUser(user)

    assert.isFalse(Guard.denies('post.update', post))
  })
})

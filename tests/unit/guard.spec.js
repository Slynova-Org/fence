const co = require('co')
const test = require('japa')
const PostClass = require('../stubs/Post')
const user = require('../stubs/user.json')
const post = require('../stubs/post.json')
const Gate = require('../../src/Gate')
const Guard = require('../../src/Guard')
const PostPolicy = require('../stubs/PostPolicy')
const Storage = require('../../src/Storage').instance

test.group('Guard', group => {
  group.beforeEach(() => {
    Storage.$reset()
  })

  test('it should return a Bouncer', assert => {
    const bounce = Guard.can(user)

    assert.equal(bounce.constructor.name, 'Bouncer')
  })

  test('it should store the default user', assert => {
    Guard.setDefaultUser(user)

    assert.equal(Storage.retrieveUser(), user)
  })

  test('it should be able to execute policy', assert => {
    Gate.policy(PostClass, new PostPolicy())
    Guard.setDefaultUser(user)

    co(function * () {
      assert.isTrue(yield Guard.allows('update', (new PostClass())))
      assert.isTrue(yield Guard.allows('create', (new PostClass())))
      assert.isFalse(yield Guard.allows('delete', (new PostClass())))
      assert.isTrue(yield Guard.denies('delete', (new PostClass())))
    })
  })

  test('it should provide short syntax for allows', assert => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)
    Guard.setDefaultUser(user)

    co(function * () {
      assert.isTrue(yield Guard.allows('post.update', post))
    })
  })

  test('it should provide short syntax for denies', assert => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)
    Guard.setDefaultUser(user)

    co(function * () {
      assert.isFalse(yield Guard.denies('post.update', post))
    })
  })

  test('it should allow to not use resource', assert => {
    Guard.setDefaultUser(user)
    Gate.define('show-hello-world', user => false)

    co(function * () {
      assert.isFalse(yield Guard.allows('show-hello-world'))
    })
  })

  test('it should denied with short syntax by default when not auth for allows', assert => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)

    co(function * () {
      assert.isFalse(yield Guard.allows('post.update', post))
    })
  })

  test('it should allows with short syntax by default when not auth for denies', assert => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)

    co(function * () {
      assert.isTrue(yield Guard.denies('post.update', post))
    })
  })
})

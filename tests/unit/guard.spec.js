const test = require('japa')
const Post = require('../stubs/post')
const user = require('../stubs/user.json')
const post = require('../stubs/post.json')
const Gate = new (require('../../src/Gate'))()
const Guard = new (require('../../src/Guard'))()
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
    Gate.policy(Post, new PostPolicy())
    Guard.setDefaultUser(user)

    assert.isTrue(Guard.allows('update', (new Post())))
    assert.isTrue(Guard.allows('create', (new Post())))
    assert.isFalse(Guard.allows('delete', (new Post())))
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

  test('it should denied with short syntax by default when not auth for allows', assert => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)

    assert.isFalse(Guard.allows('post.update', post))
  })

  test('it should allows with short syntax by default when not auth for denies', assert => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)

    assert.isTrue(Guard.denies('post.update', post))
  })
})

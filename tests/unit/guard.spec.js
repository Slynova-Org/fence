const test = require('japa')
const PostClass = require('../stubs/Post')
const user = require('../stubs/user.json')
const post = require('../stubs/post.json')
const Gate = require('../../dist/Gate')
const Guard = require('../../dist/Guard')
const PostPolicy = require('../stubs/PostPolicy')
const Storage = require('../../dist/Storage').instance

test.group('Guard', (group) => {
  group.beforeEach(() => {
    Storage.$reset()
  })

  test('it should return a Bouncer', assert => {
    const bounce = Guard.can(user)

    assert.equal(bounce.constructor.name, 'Bouncer')
  })

  test('it should store the default user', (assert) => {
    Guard.setDefaultUser(user)

    assert.equal(Storage.retrieveUser(), user)
  })

  test('it should be able to execute policy', (assert) => {
    Gate.policy(PostClass, new PostPolicy())
    Guard.setDefaultUser(user)

    assert.isTrue(Guard.allows('update', (new PostClass())))
    assert.isTrue(Guard.allows('create', (new PostClass())))
    assert.isFalse(Guard.allows('delete', (new PostClass())))
    assert.isTrue(Guard.denies('delete', (new PostClass())))
  })

  test('it should be able to execute policy [alt]', (assert) => {
    Gate.policy(PostClass, PostPolicy)
    Guard.setDefaultUser(user)

    assert.isTrue(Guard.allows('update', (new PostClass())))
    assert.isTrue(Guard.allows('create', (new PostClass())))
    assert.isFalse(Guard.allows('delete', (new PostClass())))
    assert.isTrue(Guard.denies('delete', (new PostClass())))
  })

  test('it should provide short syntax for allows', async (assert) => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)
    Guard.setDefaultUser(user)

    assert.isTrue(Guard.allows('post.update', post))
  })

  test('it should provide short syntax for denies', (assert) => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)
    Guard.setDefaultUser(user)

    assert.isFalse(Guard.denies('post.update', post))
  })

  test('it should allow to use no resource', (assert) => {
    Gate.define('show-hello-world', (user) => false)
    Guard.setDefaultUser(user)

    assert.isFalse(Guard.allows('show-hello-world'))
  })

  test("it should denied with short syntax by default when you're not auth for allows", (assert) => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)

    assert.isFalse(Guard.allows('post.update', post))
  })

  test("it should allows with short syntax by default when you're not auth for denies", (assert) => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)

    assert.isTrue(Guard.denies('post.update', post))
  })
})

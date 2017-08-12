const test = require('japa')
const PostClass = require('../stubs/Post')
const user = require('../stubs/user.json')
const post = require('../stubs/post.json')
const Gate = require('../../src/Gate')
const Guard = require('../../src/Guard')
const PostPolicy = require('../stubs/PostPolicy')
const Storage = require('../../src/Storage').instance

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

  test('it should be able to execute policy', async (assert) => {
    Gate.policy(PostClass, new PostPolicy())
    Guard.setDefaultUser(user)

    assert.isTrue(await Guard.allows('update', (new PostClass())))
    assert.isTrue(await Guard.allows('create', (new PostClass())))
    assert.isFalse(await Guard.allows('delete', (new PostClass())))
    assert.isTrue(await Guard.denies('delete', (new PostClass())))
  })

  test('it should be able to execute policy [alt]', async (assert) => {
    Gate.policy(PostClass, PostPolicy)
    Guard.setDefaultUser(user)

    assert.isTrue(await Guard.allows('update', (new PostClass())))
    assert.isTrue(await Guard.allows('create', (new PostClass())))
    assert.isFalse(await Guard.allows('delete', (new PostClass())))
    assert.isTrue(await Guard.denies('delete', (new PostClass())))
  })

  test('it should provide short syntax for allows', async (assert) => {
    Gate.define('post.update', async (user, resource) => user.id === resource.author_id)
    Guard.setDefaultUser(user)

    assert.isTrue(await Guard.allows('post.update', post))
  })

  test('it should provide short syntax for denies', async (assert) => {
    Gate.define('post.update', async (user, resource) => user.id === resource.author_id)
    Guard.setDefaultUser(user)

    assert.isFalse(await Guard.denies('post.update', post))
  })

  test('it should allow to use no resource', async (assert) => {
    Gate.define('show-hello-world', async (user) => false)
    Guard.setDefaultUser(user)

    assert.isFalse(await Guard.allows('show-hello-world'))
  })

  test("it should denied with short syntax by default when you're not auth for allows", async (assert) => {
    Gate.define('post.update', async (user, resource) => user.id === resource.author_id)

    assert.isFalse(await Guard.allows('post.update', post))
  })

  test("it should allows with short syntax by default when you're not auth for denies", async (assert) => {
    Gate.define('post.update', async (user, resource) => user.id === resource.author_id)

    assert.isTrue(await Guard.denies('post.update', post))
  })
})

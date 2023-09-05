const test = require('japa')
const PostClass = require('../stubs/Post')
const user = require('../stubs/user.json')
const post = require('../stubs/post.json')
const { Gate } = require('../../dist/Gate')
const { Guard } = require('../../dist/Guard')
const PostPolicy = require('../stubs/PostPolicy')
const { Storage } = require('../../dist/Storage')

test.group('Guard', (group) => {
  group.beforeEach(() => {
    Storage.instance.$reset()
  })

  test('it should return a Bouncer', assert => {
    const bounce = Guard.can(user)

    assert.equal(bounce.constructor.name, 'Bouncer')
  })

  test('it should be able to execute policy', (assert) => {
    Gate.policy(PostClass, new PostPolicy())
    const guard = new Guard(user)

    assert.isTrue(guard.allows('update', (new PostClass())))
    assert.isTrue(guard.allows('create', (new PostClass())))
    assert.isFalse(guard.allows('delete', (new PostClass())))
    assert.isTrue(guard.denies('delete', (new PostClass())))
  })

  test('it should be able to execute policy [alt]', (assert) => {
    Gate.policy(PostClass, PostPolicy)
    const guard = new Guard(user)

    assert.isTrue(guard.allows('update', (new PostClass())))
    assert.isTrue(guard.allows('create', (new PostClass())))
    assert.isFalse(guard.allows('delete', (new PostClass())))
    assert.isTrue(guard.denies('delete', (new PostClass())))
  })

  test('it should provide short syntax for allows', async (assert) => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)
    const guard = new Guard(user)

    assert.isTrue(guard.allows('post.update', post))
  })

  test('it should let us override the user for short syntax', async (assert) => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)
    const guard = new Guard(user)

    assert.isFalse(guard.allows('post.update', post, { id: 2 }))
  })

  test('it should provide short syntax for denies', (assert) => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)
    const guard = new Guard(user)

    assert.isFalse(guard.denies('post.update', post))
  })

  test('it should let us override the user for short syntax', async (assert) => {
    Gate.define('post.update', (user, resource) => user.id === resource.author_id)
    const guard = new Guard(user)

    assert.isTrue(guard.denies('post.update', post, { id: 2 }))
  })

  test('it should allow to use no resource', (assert) => {
    Gate.define('show-hello-world', (user) => false)
    const guard = new Guard(user)

    assert.isFalse(guard.allows('show-hello-world'))
  })

  test('it should be able to execute async policy', async (assert) => {
    Gate.define('post.update', (user, resource) => {
      return new Promise((resolve) => {
        resolve(user.id === resource.author_id)
      })
    })
    const guard = new Guard(user)

    assert.isTrue(await guard.allows('post.update', post))
  })
})

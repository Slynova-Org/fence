const test = require('japa')
const PostClass = require('../stubs/Post')
const user = require('../stubs/user.json')
const post = require('../stubs/post.json')
const { Gate } = require('../../dist/Gate')
const { Guard } = require('../../dist/Guard')
const PostPolicy = require('../stubs/PostPolicy')
const { Bouncer } = require('../../dist/Bouncer')
const bouncer = new Bouncer(user)
const { Storage } = require('../../dist/Storage')

const storage = Storage.instance

test.group('Bouncer', (group) => {
  group.beforeEach(() => {
    storage.$reset()
  })

  test('it should throw an exception when instantiated without user and fallback', (assert) => {
    try {
      const bounce = new Bouncer()
      assert.isTrue(false)
    } catch (e) {
      assert.equal(e.message, 'You need to specify a user for the Bouncer.')
    }
  })

  test('pass should be chainable', (assert) => {
    const bounce = bouncer.pass('test-gate')

    assert.equal(bounce, bouncer)
  })

  test('it should store the gate you want to go through', (assert) => {
    bouncer.pass('test-gate')

    assert.equal('test-gate', bouncer.$gate)
  })

  test('it should send the user to the gate', (assert) => {
    let userCopy = null
    Gate.define('test-gate', (user) => userCopy = user)

    bouncer.pass('test-gate').for({})

    assert.equal(userCopy, user)
  })

  test('it should send the resource to the gate', (assert) => {
    Gate.define('test-gate', async (user, resource) => assert.equal(resource.id, 1))

    bouncer.pass('test-gate').for(post)
  })

  test('it should retrieve the gate and call it', (assert) => {
    let failing = true
    Gate.define('test-gate', () => failing = false)

    bouncer.pass('test-gate').for({})

    assert.isFalse(failing)
  })

  test('it should provide short syntax to go through a gate', (assert) => {
    let failing = true
    Gate.define('test-gate', () => failing = false)

    bouncer.pass('test-gate').for({})

    assert.isFalse(failing)
  })

  test('it should throw an exception when no gate is found', (assert) => {
    try {
      bouncer.pass('test-gate').for({})
      assert.isTrue(false)
    } catch (e) {
      assert.equal('GateNotFound', e.name)
      assert.equal('The gate test-gate has not been found.', e.message)
      }
  })

  test('it should test create method of correct Policy for ES2015 class', (assert) => {
    Gate.policy(PostClass, new PostPolicy())

    assert.isTrue(bouncer.callPolicy('create', PostClass))
  })

  test('it should test create method of correct Policy for ES2015 instantiated class', (assert) => {
    Gate.policy(PostClass, new PostPolicy())

    assert.isTrue(bouncer.callPolicy('create', new PostClass()))
  })

  test('it should test create method of correct Policy for json object', (assert) => {
    Gate.policy(post, new PostPolicy())

    assert.isTrue(bouncer.callPolicy('create', post))
  })

  test('it should test update method of correct Policy for ES2015 instantiated class', (assert) => {
    Gate.policy(PostClass, new PostPolicy())

    assert.isTrue(bouncer.callPolicy('update', new PostClass()))
  })

  test('it should test update method of correct Policy for json object', (assert) => {
    Gate.policy(post, new PostPolicy())

    assert.isTrue(bouncer.callPolicy('update', post))
  })

  test('it should handle async policy method', async (assert) => {
    Gate.policy(post, new PostPolicy())

    assert.isTrue(await bouncer.callPolicy('show', post))
  })

  test('it should throw an exception when no policy is found', (assert) => {
    try {
      bouncer.callPolicy('show', post)
      assert.isTrue(false)
    } catch (e) {
      assert.equal('PolicyNotFound', e.name)
      assert.equal('The policy for Post has not been found.', e.message)
    }
  })

  test('it should test delete method of correct Policy for ES2015 instantiated class', (assert) => {
    Gate.policy(PostClass, new PostPolicy())

    assert.isFalse(bouncer.callPolicy('delete', new PostClass()))
  })

  test('it should test delete method of correct Policy for json object', (assert) => {
    Gate.policy(post, new PostPolicy())

    assert.isFalse(bouncer.callPolicy('delete', post))
  })
})

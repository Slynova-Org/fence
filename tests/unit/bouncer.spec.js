const test = require('japa')
const PostClass = require('../stubs/Post')
const user = require('../stubs/user.json')
const post = require('../stubs/post.json')
const Gate = require('../../src/Gate')
const Guard = require('../../src/Guard')
const PostPolicy = require('../stubs/PostPolicy')
const BouncerClass = require('../../src/Bouncer')
const Bouncer = new (require('../../src/Bouncer'))(user)
const Storage = require('../../src/Storage').instance

test.group('Bouncer', (group) => {
  group.beforeEach(() => {
    Storage.$reset()
  })

  test('it should be instantiable without providing a user and fallback to the default one', (assert) => {
    Guard.setDefaultUser(user)
    const bounce = new BouncerClass()

    assert.equal(bounce.$user, user)
  })

  test('it should throw an exception when instantiated without user and fallback', (assert) => {
    try {
      const bounce = new BouncerClass()
      assert.isTrue(false)
    } catch (e) {
      assert.equal(e.message, 'You need to specify a user for the Bouncer.')
    }
  })

  test('goThroughGate should be chainable', (assert) => {
    const bounce = Bouncer.goThroughGate('test-gate')

    assert.equal(bounce, Bouncer)
  })

  test('it should store the gate you want to go through', (assert) => {
    Bouncer.goThroughGate('test-gate')

    assert.equal('test-gate', Bouncer.$gate)
  })

  test('it should send the user to the gate', (assert) => {
    let userCopy = null
    Gate.define('test-gate', (user) => userCopy = user)

    Bouncer.goThroughGate('test-gate').for({})

    assert.equal(userCopy, user)
  })

  test('it should send the resource to the gate', (assert) => {
    Gate.define('test-gate', async (user, resource) => assert.equal(resource.id, 1))

    Bouncer.goThroughGate('test-gate').for(post)
  })

  test('it should retrieve the gate and call it', (assert) => {
    let failing = true
    Gate.define('test-gate', () => failing = false)

    Bouncer.goThroughGate('test-gate').for({})

    assert.isFalse(failing)
  })

  test('it should provide short syntax to go through a gate', (assert) => {
    let failing = true
    Gate.define('test-gate', () => failing = false)

    Bouncer.pass('test-gate').for({})

    assert.isFalse(failing)
  })

  test('it should throw an exception when no gate is found', (assert) => {
    try {
      Bouncer.pass('test-gate').for({})
      assert.isTrue(false)
    } catch (e) {
      assert.equal('GateNotFound', e.name)
      assert.equal('The gate test-gate has not been found.', e.message)
      }
  })

  test('it should test create method of correct Policy for ES2015 class', (assert) => {
    Gate.policy(PostClass, new PostPolicy())

    assert.isTrue(Bouncer.callPolicy('create', PostClass))
  })

  test('it should test create method of correct Policy for ES2015 instantiated class', (assert) => {
    Gate.policy(PostClass, new PostPolicy())

    assert.isTrue(Bouncer.callPolicy('create', new PostClass()))
  })

  test('it should test create method of correct Policy for json object', (assert) => {
    Gate.policy(post, new PostPolicy())

    assert.isTrue(Bouncer.callPolicy('create', post))
  })

  test('it should test update method of correct Policy for ES2015 instantiated class', (assert) => {
    Gate.policy(PostClass, new PostPolicy())

    assert.isTrue(Bouncer.callPolicy('update', new PostClass()))
  })

  test('it should test update method of correct Policy for json object', (assert) => {
    Gate.policy(post, new PostPolicy())

    assert.isTrue(Bouncer.callPolicy('update', post))
  })

  test('it should handle async policy method', async (assert) => {
    Gate.policy(post, new PostPolicy())

    assert.isTrue(await Bouncer.callPolicy('show', post))
  })

  test('it should throw an exception when no policy is found', (assert) => {
    try {
      Bouncer.callPolicy('show', post)
      assert.isTrue(false)
    } catch (e) {
      assert.equal('PolicyNotFound', e.name)
      assert.equal('The policy for Post has not been found.', e.message)
    }
  })

  test('it should test delete method of correct Policy for ES2015 instantiated class', (assert) => {
    Gate.policy(PostClass, new PostPolicy())

    assert.isFalse(Bouncer.callPolicy('delete', new PostClass()))
  })

  test('it should test delete method of correct Policy for json object', (assert) => {
    Gate.policy(post, new PostPolicy())

    assert.isFalse(Bouncer.callPolicy('delete', post))
  })
})

const test = require('japa')
const Post = require('../stubs/Post')
const post = require('../stubs/post.json')
const PostPolicy = require('../stubs/PostPolicy')
const { Gate } = require('../../dist/Gate')
const { Storage } = require('../../dist/Storage')

const storage = Storage.instance

test.group('Gate', (group) => {
  group.beforeEach(() => {
    storage.$reset()
  })

  test('it should be able to define gate', (assert) => {
    Gate.define('test-gate', () => {})

    assert.equal(Object.keys(storage.$gates).length, 1)
    assert.isDefined(storage.$gates['test-gate'])
  })

  test('it should be able to define multiple gates', (assert) => {
    Gate.define('test-gate', () => {})
    Gate.define('test-gate2', () => {})

    assert.equal(Object.keys(storage.$gates).length, 2)
    assert.isDefined(storage.$gates['test-gate'])
    assert.isDefined(storage.$gates['test-gate2'])
  })

  test('it should be able to define policy with ES2015 class', (assert) => {
    Gate.policy(Post, PostPolicy)

    assert.equal(Object.keys(storage.$policies).length, 1)
    assert.isDefined(storage.$policies[Post.name])
  })

  test('it should be able to define policy with ES2015 class [alt]', (assert) => {
    Gate.policy(Post, new PostPolicy())

    assert.equal(Object.keys(storage.$policies).length, 1)
    assert.isDefined(storage.$policies[Post.name])
  })

  test('it should be able to define policy with ES2015 instantiated class', (assert) => {
    const post = new Post()
    Gate.policy(post, new PostPolicy())

    assert.equal(Object.keys(storage.$policies).length, 1)
    assert.isDefined(storage.$policies[post.constructor.name])
  })

  test('it should be able to define policy with json object', (assert) => {
    Gate.policy(post, new PostPolicy())

    assert.equal(Object.keys(storage.$policies).length, 1)
    assert.isDefined(storage.$policies[post._className])
  })

  test('it should be able to define policy with a string', (assert) => {
    Gate.policy('Post', new PostPolicy())

    assert.equal(Object.keys(storage.$policies).length, 1)
    assert.isDefined(storage.$policies['Post'])
  })

  test('it should be able to returns the storage used', (assert) => {
    const storage2 = Gate.$getStorage()
    assert.equal(storage, storage2)
  })
})

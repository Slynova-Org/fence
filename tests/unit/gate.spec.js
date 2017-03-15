const test = require('japa')
const Post = require('../stubs/Post')
const post = require('../stubs/post.json')
const PostPolicy = require('../stubs/PostPolicy')
const Gate = require('../../src/Gate')
const Storage = require('../../src/Storage').instance

test.group('Gate', group => {
  group.beforeEach(() => {
    Storage.$reset()
  })

  test('it should be_able to define gate', assert => {
    Gate.define('test-gate', () => {})

    assert.equal(Object.keys(Storage.$gates).length, 1)
    assert.isDefined(Storage.$gates['test-gate'])
  })

  test('it should be able to define multiple gates', assert => {
    Gate.define('test-gate', () => {})
    Gate.define('test-gate2', () => {})

    assert.equal(Object.keys(Storage.$gates).length, 2)
    assert.isDefined(Storage.$gates['test-gate'])
    assert.isDefined(Storage.$gates['test-gate2'])
  })

  test('it should be able to define policy with ES2015 class', assert => {
    Gate.policy(Post, PostPolicy)

    assert.equal(Object.keys(Storage.$policies).length, 1)
    assert.isDefined(Storage.$policies[Post.name])
  })

  test('it should be able to define policy with ES2015 class [alt]', assert => {
    Gate.policy(Post, new PostPolicy())

    assert.equal(Object.keys(Storage.$policies).length, 1)
    assert.isDefined(Storage.$policies[Post.name])
  })

  test('it should be able to define policy with ES2015 instantiated class', assert => {
    const post = new Post()
    Gate.policy(post, new PostPolicy())

    assert.equal(Object.keys(Storage.$policies).length, 1)
    assert.isDefined(Storage.$policies[post.constructor.name])
  })

  test('it should be able to define policy with json object', assert => {
    Gate.policy(post, new PostPolicy())

    assert.equal(Object.keys(Storage.$policies).length, 1)
    assert.isDefined(Storage.$policies[post._className])
  })

  test('it should be able to define policy with a string', assert => {
    Gate.policy('Post', new PostPolicy())

    assert.equal(Object.keys(Storage.$policies).length, 1)
    assert.isDefined(Storage.$policies['Post'])
  })
})

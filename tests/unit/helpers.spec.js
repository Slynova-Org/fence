const test = require('japa')
const post = require('../stubs/post.json')
const Helpers = require('../../src/Helpers')
const PostClass = require('../stubs/Post')

test.group('Helpers', group => {

  test('it should format correctly the resource name', assert => {
    assert.equal(Helpers.formatResourceName(post), 'Post')
    assert.equal(Helpers.formatResourceName(PostClass), 'Post')
    assert.equal(Helpers.formatResourceName(new PostClass()), 'Post')
  })

  test('it should know when the function is a generator or not', assert => {
    const fn = function * () {}
    const fn2 = function () {}

    assert.isTrue(Helpers.isGenerator(fn))
    assert.isFalse(Helpers.isGenerator(fn2))
  })

})

const test = require('japa')
const post = require('../stubs/post.json')
const { formatResourceName } = require('../../dist/Helpers')
const PostClass = require('../stubs/Post')

test.group('Helpers', (group) => {

  test('it should format correctly the resource name', (assert) => {
    assert.equal(formatResourceName(post), 'Post')
    assert.equal(formatResourceName(PostClass), 'Post')
    assert.equal(formatResourceName(new PostClass()), 'Post')
  })

})

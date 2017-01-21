'use strict'

class PostPolicy {

  create (user) {
    return user.id === 1
  }

  update (user, post) {
    return user.id === post.author_id
  }

  delete (user, post) {
      return user.id === post.author_id
  }

}

module.exports = PostPolicy

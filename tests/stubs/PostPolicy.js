'use strict'

class PostPolicy {

  * show (user, post) {
    return yield new Promise((resolve, reject) => {
      resolve(true)
    })
  }

  create (user) {
    return user.id === 1
  }

  update (user, post) {
    return user.id === post.author_id
  }

  delete (user, post) {
    return false
  }

}

module.exports = PostPolicy

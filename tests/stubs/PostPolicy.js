'use strict'

class PostPolicy {

  async show (user, post) {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }

  async create (user) {
    return user.id === 1
  }

  async update (user, post) {
    return user.id === post.author_id
  }

  async delete (user, post) {
    return false
  }

}

module.exports = PostPolicy

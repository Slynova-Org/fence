const Gate = new (require('./src').Gate)()
const Guard = new (require('./src').Guard)()
const user = { id: 1 }
const article = { _className: 'App/Model/Article', author_id: 1 }
const article2 = { author_id: 2 }

const ArticlePolicy = new class {

  update (user, article) {
      return user.id === article.author_id
  }

}()

Gate.define('article.update', (user, article) => {
  return user.id === article.author_id
})

Gate.policy('App/Model/Article', ArticlePolicy)

console.log(
  Guard.can(user).update(article)
) // true

console.log(
  Guard.can(user).goThroughGate('article.update').for(article)
) // true

console.log(
  Guard.can(user).goThroughGate('article.update').for(article2)
) // false

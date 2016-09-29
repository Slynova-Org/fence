'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const chai = require('chai')
const expect = chai.expect
const user = require('./stubs/user.js')
const Policy = require('../src/policy')
const config = require('./stubs/config.js')
const Storage = require('../src/storage').instance
const article = require('./stubs/article.js')

describe('Policy Specs', () => {

  beforeEach(() => {
    Storage._reset()
  })

  it('should map an ability to a role', () => {
    new Policy(config).forRole('admin').allowing.to.create(article)
    new Policy(config).forRole('admin').allowing.to.update(article)
    new Policy(config).forRole('admin').allowing.to.delete(article)
    new Policy(config).forRole('admin').allowing.to.view(article)
    new Policy(config).forRole('admin').allowing.to.delete(user)

    let policies = Storage.pullForResource('article')

    expect(policies).to.be.an.array
    expect(policies).to.have.a.lengthOf(4)
  })

  it('should be able to allow an ability for a role', () => {
    new Policy(config).forRole('admin').allowing.to.view(article)
    new Policy(config).forRole('member').disallowing.to.delete(user)

    let policies = Storage.pullForResource('article')

    expect(policies).to.be.an.array
    expect(policies).to.have.a.lengthOf(1)
    expect(policies[0].allow).to.be.true
  })

  it('should be able to disallow an ability for a role', () => {
    new Policy(config).forRole('admin').disallowing.to.view(article)
    new Policy(config).forRole('member').disallowing.to.delete(user)

    let policies = Storage.pullForResource('user')

    expect(policies).to.be.an.array
    expect(policies).to.have.a.lengthOf(1)
    expect(policies[0].allow).to.be.false
  })

})

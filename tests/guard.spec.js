'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const chai = require('chai')
const expect = chai.expect
const Guard = require('../src')
const Storage = require('../src/storage').instance
const user = require('./stubs/user.js')
const config = require('./stubs/config.js')
const article = require('./stubs/article.js')
let guard = null

describe('Guard Specs', () => {
  before(() => {
    guard = new Guard(config)
  })

  beforeEach(() => {
    Storage._reset()
  })

  it('should be able to create policies', () => {
    guard.allow('admin').to.create(article)
    guard.disallow('member').to.create(article)

    let policies = Storage.pullForResource('article')

    expect(policies).to.be.an.array
    expect(policies).to.have.a.lengthOf(2)
  })

  it('should be able to check policies', () => {
    guard.allow('admin').to.create(article)

    expect(guard.can(user).create(article)).to.be.true
  })
})

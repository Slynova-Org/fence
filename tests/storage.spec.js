'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const chai = require('chai')
const expect = chai.expect
const Policy = require('../src/policy')
const Storage = require('../src/storage').instance
const config = require('./stubs/config.js')
const article = require('./stubs/article.js')

describe('Storage Specs', () => {
  beforeEach(() => {
    Storage._reset()
  })

  it('should be able to store policy', () => {
    new Policy(config).forRole('admin').allowing.to.create(article)

    let policies = Storage.pull()
    expect(policies).to.be.an.object
    expect(Object.keys(policies).length).to.equal(1)
  })

  it('should be able to retrieve stored policy for a role', () => {
    let policy = new Policy(config).forRole('admin').allowing.to.create(article)
    let policies = Storage.pullForRole('admin')

    expect(policies).to.be.an.array
    expect(policies).to.contain(policy)
    expect(policies).to.have.a.lengthOf(1)
  })

  it('should be able to retrieve multiple stored policies for a role', () => {
    let policy = new Policy(config).forRole('admin').allowing.to.create(article)
    let policy2 = new Policy(config).forRole('admin').allowing.to.update(article)
    let policy3 = new Policy(config).forRole('redactor').allowing.to.create(article)
    let policies = Storage.pullForRole('admin')

    expect(policies).to.be.an.array
    expect(policies).to.have.a.lengthOf(2)

    expect(policies).to.contain(policy)
    expect(policies).to.contain(policy2)
    expect(policies).to.not.contain(policy3)
  })

  it('should be able to retrieve stored policy for a resource', () => {
    let policy = new Policy(config).forRole('admin').allowing.to.create(article)
    let policies = Storage.pullForResource('article')

    expect(policies).to.be.an.array
    expect(policies).to.contain(policy)
    expect(policies).to.have.a.lengthOf(1)
  })

  it('should be able to retrieve multiple stored policies for a resource', () => {
    let policy = new Policy(config).forRole('admin').allowing.to.create(article)
    let policy2 = new Policy(config).forRole('admin').allowing.to.update(article)
    let policy3 = new Policy(config).forRole('redactor').allowing.to.create(article)
    let policies = Storage.pullForResource('article')

    expect(policies).to.be.an.array
    expect(policies).to.have.a.lengthOf(3)

    expect(policies).to.contain(policy)
    expect(policies).to.contain(policy2)
    expect(policies).to.contain(policy3)
  })
})

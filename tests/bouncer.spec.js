'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const chai = require('chai')
const expect = chai.expect
const Policy = require('../src/policy')
const Bouncer = require('../src/bouncer')
const Storage = require('../src/storage').instance
const user = require('./stubs/user.js')
const config = require('./stubs/config.js')
const article = require('./stubs/article.js')

describe('Bouncer Specs', () => {
  beforeEach(() => {
    Storage._reset()
  })

  it('should return true by default (as specified in the configuration)', () => {
    config.default = 'allow'

    let bouncer = new Bouncer(config).forUser(user)

    expect(bouncer.can.create(article)).to.be.true

    config.default = 'deny'
  })

  it('should return false by default (as specified in the configuration)', () => {
    let bouncer = new Bouncer(config).forUser(user)

    expect(bouncer.can.create(article)).to.be.false
  })

  it("should return false by default when the user isn't in a role", () => {
    new Policy(config).forRole('loremipsum').allowing.to.create(article)
    let bouncer = new Bouncer(config).forUser(user)

    expect(bouncer.can.create(article)).to.be.false
  })

  it('should return true if the action is allowed with one role', () => {
    new Policy(config).forRole('admin').allowing.to.create(article)
    let bouncer = new Bouncer(config).forUser(user)

    expect(bouncer.can.create(article)).to.be.true
  })

  it('should return true if the action is allowed with multiple roles by precedence (which is allow)', () => {
    new Policy(config).forRole('member').disallowing.to.create(article)
    new Policy(config).forRole('admin').allowing.to.create(article)
    let bouncer = new Bouncer(config).forUser(user)

    expect(bouncer.can.create(article)).to.be.true
  })

  it('should return false if the action is disallowed with multiple roles by precedence (which is deny)', () => {
    config.precedence = 'deny'

    new Policy(config).forRole('member').disallowing.to.create(article)
    new Policy(config).forRole('admin').allowing.to.create(article)
    let bouncer = new Bouncer(config).forUser(user)

    expect(bouncer.can.create(article)).to.be.false

    config.precedence = 'allow'
  })

  it('should return false when we are trying to view a field that we are not allowed to when the default is false', () => {
    new Policy(config).forRole('admin').allowing.to.view(article).only(['title', 'content'])
    let bouncer = new Bouncer(config).forUser(user)

    expect(bouncer.can.view('title').of(article)).to.be.true
    expect(bouncer.can.view('content').of(article)).to.be.true
    expect(bouncer.can.view('created_at').of(article)).to.be.false
  })

  it('should return true when we are disallowing field and trying to get another when the default is true', () => {
    config.default = 'allow'

    new Policy(config).forRole('admin').disallowing.to.view(article).only(['title', 'content'])
    let bouncer = new Bouncer(config).forUser(user)

    expect(bouncer.can.view('title').of(article)).to.be.false
    expect(bouncer.can.view('content').of(article)).to.be.false
    expect(bouncer.can.view('created_at').of(article)).to.be.true

    config.default = 'deny'
  })
})

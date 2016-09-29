'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const chai = require('chai')
const expect = chai.expect
const article = require('./stubs/article.js')
const Ability = require('../src/abilities/ability')
const CreateAbility = require('../src/abilities/create')
const UpdateAbility = require('../src/abilities/update')
const DeleteAbility = require('../src/abilities/delete')
const ViewAbility = require('../src/abilities/view')

describe('Ability Specs', () => {

  it('should be able to create "create" ability', () => {
    const ability = new CreateAbility(article)

    expect(ability.type).to.equal(Ability.CREATE)
  })

  it('should be able to create "update" ability', () => {
    const ability = new UpdateAbility(article)

    expect(ability.type).to.equal(Ability.UPDATE)
  })

  it('should be able to create "delete" ability', () => {
    const ability = new DeleteAbility(article)

    expect(ability.type).to.equal(Ability.DELETE)
  })

  it('should be able to create "view" ability', () => {
    const ability = new ViewAbility(article)

    expect(ability.type).to.equal(Ability.VIEW)
  })
})

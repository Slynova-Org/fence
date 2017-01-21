const test = require('japa')
const Storage = require('../../src/Storage')

test.group('Storage', group => {
  group.beforeEach(() => {
    Storage.instance.$reset()
  })

  test('it should not allow to be construct', assert => {
    try {
      storage = new Storage()
      assert.isTrue(false)
    } catch (e) {
      assert.equal(e.message, 'Cannot Construct Singleton')
    }
  })

  test('it should be a singleton', assert => {
    let storage = Storage.instance
    let storage2 = Storage.instance

    assert.equal(storage, storage2)
  })

  test('it should be able to store gates', assert => {
    let storage = Storage.instance
    storage.storeGate('test-gate', () => {})

    assert.equal(Object.keys(storage.$gates).length, 1)
    assert.isDefined(storage.$gates['test-gate'])
  })

  test('it should be able to retrieve gates', assert => {
    let storage = Storage.instance
    storage.storeGate('test-gate', () => {})

    assert.isFunction(storage.retrieveGate('test-gate'))
  })

  test('it should be able to store policies', assert => {
    let storage = Storage.instance
    storage.storePolicy('Post', () => {})

    assert.equal(Object.keys(storage.$policies).length, 1)
    assert.isDefined(storage.$policies['Post'])
  })

  test('it should be able to retrieve policies', assert => {
    let storage = Storage.instance
    storage.storePolicy('Post', () => {})

    assert.isFunction(storage.retrievePolicy('Post'))
  })

  test('it should be able to reset the storage', assert => {
    let storage = Storage.instance
    storage.storeGate('test-gate', () => {})
    storage.$reset()

    assert.equal(Object.keys(storage.$gates).length, 0)
    assert.isUndefined(storage.$gates['test-gate'])
  })
})

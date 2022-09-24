'use strict'
const tokenScore = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
// openRerity test sample
let metaData1 = [
  { trait1: 'value1', trait2: 'value1' },
  { trait1: 'value1', trait2: 'value2' },
  {
    trait1: 'value2',
    trait2: 'value2',
    trait3: ' value3' // some space
  }
]
let metaData2 = [
  {
    trait1: 'value1',
    trait2: 'value1',
    trait3: 'value1'
  },
  {
    trait1: 'value1',
    trait2: 'value1',
    trait3: 'value1'
  },
  {
    trait1: 'value2',
    trait2: 'value1',
    trait3: 'value3'
  },
  {
    trait1: 'value2',
    trait2: 'value2',
    trait3: 'value3'
  },
  {
    trait1: 'value3 ',
    trait2: 'value3',
    trait3: 'value3'
  }
]

// https://github.com/OpenRarity/open-rarity/blob/main/tests/test_rarity_ranker.py

describe('openRerity core algorithm JS implementation', function () {
  it('normal rank', () => {
    let r = tokenScore(metaData1)
    console.log(r)
    assertLog(2, r[1].toeknId + r[1].rank)
  })
  it('same rank', () => {
    let r = tokenScore(metaData2)
    console.log(r)
    assertLog(true, r[2].rank === r[3].rank)
  })
})

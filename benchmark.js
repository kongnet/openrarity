const $ = require('meeko')
const tokenScore = require('./index')

let metaData = []
const traitRange = 20 // Max trait in colletion
const traitOfToken = 5 // How many trait does the token have
const valueRange = 20 // How many value in one trait
const collectionCount = 100000

let traitAry = $.math.genRange(1, traitRange)
let valueAry = $.math.genRange(1, valueRange)

for (let i = 0; i < collectionCount; i++) {
  metaData[i] = {}
  let partTrait = traitAry.shuffle().slice(0, traitOfToken)
  let partValue = valueAry.shuffle().slice(0, traitOfToken)
  for (let k = 0; k < traitOfToken; k++) {
    metaData[i]['t' + partTrait[k]] = 'v' + partValue[k]
  }
}

let t = +new Date()
let r = tokenScore(metaData)
console.log(
  'gen Collection items:',
  r.length.toLocaleString(),
  '  Rarity calc time:',
  +new Date() - t,
  'ms'
)
console.log([...r.slice(0, 2), '.....', r.at(-1)])
// const fs = require('fs')
// fs.writeFileSync('test001.json', JSON.stringify(metaData, null, 2))

/*
  openRerity core algorithm JS implementation
  use sky personal js lib
  https://github.com/kongnet/meeko
*/
const $ = require('meeko')

function tokenScore (metaObj, blankTrait = '__undefined') {
  // Create trait value map without undefined(blank) trait
  let traitMap = {}
  metaObj.forEach(x => {
    for (let i in x) {
      !traitMap[i] && (traitMap[i] = [])
      x[i] = x[i].trim()
      traitMap[i].push(x[i])
    }
  })

  // Create all trait list
  let traitList = Object.keys(traitMap)

  // Create undefined(blank) trait for every token
  metaObj.forEach(x => {
    // NOTICE: undefined to '__undefined',if trait value is '__undefined',be careful
    // use meeko sets except
    traitList.except(Object.keys(x)).forEach(x => traitMap[x].push(blankTrait))
  })
  // Create trait value stats include traitEntyrop
  let traitMapStat = {}
  let traitEntyropList = []
  for (let i in traitMap) {
    // use meeko stats function
    traitMap[i].countAdv().map(x => {
      !traitMapStat[i] && (traitMapStat[i] = {})
      traitMapStat[i][x.k] = x.w
      traitEntyropList.push(x.w)
    })
  }

  // Create token trait probability list
  let traitInfoList = []
  metaObj.forEach(i => {
    traitInfoList.push(
      traitList.map(x => {
        return i[x] ? traitMapStat[x][i[x]] : traitMapStat[x][blankTrait]
      })
    )
  })

  // info entyrop bit
  function entyrop (a) {
    return a.reduce((m, n) => m - n * Math.log2(n), 0)
  }

  // info content
  function infoContent (a) {
    return a.reduce((m, n) => m - Math.log2(n), 0)
  }

  let entyropSum = entyrop(traitEntyropList)
  let r = traitInfoList
    .map((x, i) => {
      return { v: infoContent(x) / entyropSum, toeknId: i }
    })
    .orderBy(['v'], ['desc'])
  let rankNum = 0
  for (let i = 0; i < r.length; i++) {
    rankNum++
    if (r[i].v === r[i - 1]?.v) {
      rankNum--
    }
    r[i].rank = rankNum
  }
  return r
}
module.exports = tokenScore

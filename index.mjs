import 'meeko';

// info entropy bit 信息熵
function entropy (a) {
  return a.reduce((m, n) => m - n * Math.log2(n), 0)
}

// info content 信息量
function infoContent (a) {
  return a.reduce((m, n) => m - Math.log2(n), 0)
}
var utils$1 = {
  entropy,
  infoContent
};

/*
  openRerity core algorithm JS implementation
  use sky personal js lib
  https://github.com/kongnet/meeko
*/
const utils = utils$1;

function tokenScore (metaObj, blankTrait = '__undefined') {
  // Create trait value map without undefined(blank) trait
  let traitMap = {};
  metaObj.forEach(x => {
    for (let i in x) {
      !traitMap[i] && (traitMap[i] = []);
      x[i] = x[i].trim();
      traitMap[i].push(x[i]);
    }
  });

  // Create all trait list
  let traitList = Object.keys(traitMap);

  // Create undefined(blank) trait for every token
  metaObj.forEach(x => {
    // NOTICE: undefined to '__undefined',if trait value is '__undefined',be careful
    // use meeko sets except
    traitList.except(Object.keys(x)).forEach(x => traitMap[x].push(blankTrait));
  });
  // Create trait value stats include traitEntropy
  let traitMapStat = {};
  let traitEntropyList = [];
  for (let i in traitMap) {
    // use meeko stats function
    traitMap[i].countAdv().map(x => {
      !traitMapStat[i] && (traitMapStat[i] = {});
      traitMapStat[i][x.k] = x.w;
      traitEntropyList.push(x.w);
    });
  }

  // Create token trait probability list
  let traitInfoList = [];
  metaObj.forEach(i => {
    traitInfoList.push(
      traitList.map(x => {
        return i[x] ? traitMapStat[x][i[x]] : traitMapStat[x][blankTrait]
      })
    );
  });

  let entropySum = utils.entropy(traitEntropyList);
  let r = traitInfoList
    .map((x, i) => {
      return { v: utils.infoContent(x) / entropySum, toeknId: i }
    })
    .orderBy(['v'], ['desc']);
  // same rank solution
  let rankNum = 0;
  for (let i = 0; i < r.length; i++) {
    rankNum++;
    if (r[i].v === r[i - 1]?.v) {
      rankNum--;
    }
    r[i].rank = rankNum;
  }
  return r
}
var openrarity = tokenScore;

export { openrarity as default };

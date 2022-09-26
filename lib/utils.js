// info entyrop bit 信息熵
function entyrop (a) {
  return a.reduce((m, n) => m - n * Math.log2(n), 0)
}

// info content 信息量
function infoContent (a) {
  return a.reduce((m, n) => m - Math.log2(n), 0)
}
module.exports = {
  entyrop,
  infoContent
}

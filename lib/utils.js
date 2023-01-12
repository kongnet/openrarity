// info entropy bit 信息熵
function entropy (a) {
  return a.reduce((m, n) => m - n * Math.log2(n), 0)
}

// info content 信息量
function infoContent (a) {
  return a.reduce((m, n) => m - Math.log2(n), 0)
}
module.exports = {
  entropy,
  infoContent
}

# Openrarity

openRerity core algorithm JS implementation
use sky personal js lib

## 安装 Install

```js
npm i openrarity
```

## 测试 Test

```js
npm test
```

## 测试用例 Test Case

```js
const tokenScore = require('openrarity')

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
let r = tokenScore(metaData2)

/*
=>
  [
    { v: 1.3926137488801251, toeknId: 4, rank: 1 },
    { v: 1.1338031424711967, toeknId: 3, rank: 2 },
    { v: 0.8749925360622679, toeknId: 0, rank: 3 },
    { v: 0.8749925360622679, toeknId: 1, rank: 3 },
    { v: 0.7235980365241422, toeknId: 2, rank: 4 }
  ]
*/
```

## 算法 Algorithm Step

- Generate trait value map without undefined(blank) trait
- Generate undefined(blank) trait for every token
- Generate trait value stats include traitEntyrop
- Generate token trait probability list

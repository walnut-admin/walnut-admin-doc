const a1 = 'popokpo'
const b1 = 'po'

function t(a, b) {
  const reg = new RegExp(b, 'gi')
  const flag = '9'

  const result = a.replace(reg, '9').split('').filter(i => i === flag).length

  return result
}

console.log(t(a1, b1))

// const s = 'ae'
// const t = 'aae'

// function solution(a, b) {
//   let result
//   const pool = a.split('')
//   const target = b.split('')

//   pool.forEach((element) => {
//     target.splice(target.findIndex(e => e === element), 1)
//   })

//   result = target[0]

//   return result
// }

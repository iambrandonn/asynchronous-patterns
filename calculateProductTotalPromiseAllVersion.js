function makeDatabaseCall (valueToFind, resolve) {
  setTimeout(function () {
    let value = valueToFind === 'Cost' ? 100 : valueToFind === 'Tax' ? 15 : 10
    resolve(value)
  }, 3000)
}

function getCostInfo () {
  return new Promise(function (resolve, reject) {
    makeDatabaseCall('Cost', resolve)
  })
}

function getTaxInfo () {
  return new Promise(function (resolve, reject) {
    makeDatabaseCall('Tax', resolve)
  })
}

function getDiscountInfo () {
  return new Promise(function (resolve, reject) {
    makeDatabaseCall('Discount', resolve)
  })
}

let startTime = Date.now()

Promise.all([
  getCostInfo(),
  getTaxInfo(),
  getDiscountInfo()
]).then(([cost, tax, discount]) => {
  let total = cost
  total = total + tax / 100 * cost
  discount = discount / 100 * total
  total = total - discount
  console.log(`total is ${total}`)

  console.log(`${(Date.now() - startTime) / 1000} seconds to complete`)
})

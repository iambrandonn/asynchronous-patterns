function makeDatabaseCall (valueToFind, resolve) {
  setTimeout(() => {
    let value = valueToFind === 'Cost' ? 100 : valueToFind === 'Tax' ? 15 : 10
    resolve(value)
  }, 3000)
}

function getCostInfo () {
  return new Promise((resolve, reject) => {
    makeDatabaseCall('Cost', resolve)
  })
}

function getTaxInfo () {
  return new Promise((resolve, reject) => {
    makeDatabaseCall('Tax', resolve)
  })
}

function getDiscountInfo () {
  return new Promise((resolve, reject) => {
    makeDatabaseCall('Discount', resolve)
  })
}

let total = 0
let cost

let startTime = Date.now()

getCostInfo()
  .then(value => {
    cost = value
    total = cost
    console.log(`total is ${total}`)
    return getTaxInfo()
  })
  .then(tax => {
    total = total + tax / 100 * cost
    console.log(`total is ${total}`)
    return getDiscountInfo()
  })
  .then(discount => {
    discount = discount / 100 * total
    total = total - discount
    console.log(`total is ${total}`)
  })
  .then(() => {
    console.log(`${(Date.now() - startTime) / 1000} seconds to complete`)
  })

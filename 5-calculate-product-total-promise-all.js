const util = require('util')

function makeDatabaseCallCallback (valueToFind, callback) {
  const delay = 3000
  setTimeout(() => {
    switch (valueToFind) {
      case 'Cost':
        callback(null, 100)
        break
      case 'Tax':
        callback(null, 15)
        break
      case 'Discount':
        callback(null, 10)
        break
      default:
        callback(new Error(`invalid valueToFind argument: ${valueToFind}`))
    }
  }, delay)
}

const makeDatabaseCall = util.promisify(makeDatabaseCallCallback)

function getCostInfo () {
  return makeDatabaseCall('Cost')
}

function getTaxInfo () {
  return makeDatabaseCall('Tax')
}

function getDiscountInfo () {
  return makeDatabaseCall('Discount')
}

let startTime = Date.now()

Promise.all([getCostInfo(), getTaxInfo(), getDiscountInfo()])
  .then(([cost, tax, discount]) => {
    let total = cost
    total = total + tax / 100 * cost
    discount = discount / 100 * total
    total = total - discount
    console.log(`total is ${total}`)

    console.log(`${(Date.now() - startTime) / 1000} seconds to complete`)
  })
  .catch(err => {
    console.error(err.message)
  })

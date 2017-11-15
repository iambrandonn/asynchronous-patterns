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

async function getCostInfo () {
  return makeDatabaseCall('Cost')
}

async function getTaxInfo () {
  return makeDatabaseCall('Taxes')
}

async function getDiscountInfo () {
  return makeDatabaseCall('Discount')
}

async function calculateTotal () {
  let cost = await getCostInfo()
  console.log(`Retrieved cost: ${cost}`)
  let tax = await getTaxInfo()
  console.log(`Retrieved tax: ${tax}`)
  let total = cost + tax / 100 * cost

  let discount = await getDiscountInfo()
  console.log(`Retrieved discount: ${discount}`)
  total = total - discount / 100 * total

  console.log(`Total is ${total}`)
}

calculateTotal()

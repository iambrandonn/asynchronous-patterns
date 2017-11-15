const util = require('util')

function makeDatabaseCallCallback (valueToFind, callback) {
  const delay = Math.random() * 5000
  setTimeout(() => {
    switch (valueToFind) {
      case 'Cost':
        callback(null, { field: valueToFind, value: 100 })
        break
      case 'Tax':
        callback(null, { field: valueToFind, value: 15 })
        break
      case 'Discount':
        callback(null, { field: valueToFind, value: 10 })
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

Promise.race([getCostInfo(), getTaxInfo(), getDiscountInfo()])
  .then(resolved => {
    console.log('First to resolve was:')
    console.log(resolved)
  })
  .catch(err => {
    console.error(err.message)
  })

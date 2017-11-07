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

function makeDatabaseCall (valueToFind) {
  return new Promise((resolve, reject) => {
    makeDatabaseCallCallback(valueToFind, (err, value) => {
      if (err) {
        reject(err)
        return
      }
      resolve(value)
    })
  })
}

function getCostInfo () {
  return makeDatabaseCall('Cost')
}

function getTaxInfo () {
  return makeDatabaseCall('Tax')
}

function getDiscountInfo () {
  return makeDatabaseCall('Discount')
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

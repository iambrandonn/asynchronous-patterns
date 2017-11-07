function makeDatabaseCallCallback (valueToFind, callback) {
  setTimeout(() => {
    let value = valueToFind === 'Cost' ? 100 : valueToFind === 'Tax' ? 15 : 10
    callback(value)
  }, 3000)
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

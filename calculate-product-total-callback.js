let cost
let tax
let discount
let total

function makeDatabaseCall (valueToFind, callback) {
  const delay = Math.random() * 10000
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

function getCostInfo () {
  makeDatabaseCall('Cost', (err, value) => {
    if (err) {
      console.error(err.message)
      return
    }
    console.log(`Cost is ${value}`)
    cost = value
    checkForCompletion()
  })
}

function getTaxInfo () {
  makeDatabaseCall('Tax', (err, value) => {
    if (err) {
      console.error(err.message)
      return
    }
    console.log(`Tax is ${value}`)
    tax = value
    checkForCompletion()
  })
}

function getDiscountInfo () {
  makeDatabaseCall('Discount', (err, value) => {
    if (err) {
      console.error(err.message)
      return
    }
    console.log(`Discount is ${value}`)
    discount = value
    checkForCompletion()
  })
}

function checkForCompletion () {
  if (cost && tax && discount) {
    total = cost + tax / 100 * cost
    total = total - discount / 100 * total
    console.log(`Total is ${total}`)
  }
}

getCostInfo()
getTaxInfo()
getDiscountInfo()

function makeDatabaseCall (valueToFind, cb) {
  var delay = Math.random() * 10000
  setTimeout(() => {
    let value = valueToFind === 'Cost' ? 100 : valueToFind === 'Tax' ? 15 : 10
    cb(value)
  }, delay)
}

function getCostInfo () {
  makeDatabaseCall('Cost', value => {
    processInfo('Cost', value)
  })
}

function getTaxInfo () {
  makeDatabaseCall('Tax', value => {
    processInfo('Tax', value)
  })
}

function getDiscountInfo () {
  makeDatabaseCall('Discount', value => {
    processInfo('Discount', value)
  })
}

let cost, tax, discount
let processedTotal

let total = 0
function processInfo (infoToFind, valueToProcess) {
  console.log(`Value of ${infoToFind} is ${valueToProcess}`)
  if (infoToFind === 'Cost') {
    cost = valueToProcess
    total = cost
  }

  if (infoToFind === 'Tax') {
    tax = valueToProcess
    if (cost) {
      total = cost + tax / 100 * cost
    }
  }
  if (infoToFind === 'Discount') {
    discount = valueToProcess
    if (cost && tax) {
      total = cost + tax / 100 * cost
      total = total - discount / 100 * total
      processedTotal = true
    }
  }

  if (!processedTotal) {
    console.log('processing total.....')
    total = cost + tax / 100 * cost
    total = total - discount / 100 * total
  }

  if (total) {
    console.log(`total is ${total}`)
  }
}

getCostInfo()
getTaxInfo()
getDiscountInfo()

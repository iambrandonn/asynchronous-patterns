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

async function main () {
  const fields = ['Cost', 'Tax', 'Discount']

  fields.forEach(async field => {
    console.log(`${field} lookup started`)
    console.time(`${field}`)
    await makeDatabaseCall(field)
    console.timeEnd(`${field}`)
  })

  console.log('all done')
}

main()

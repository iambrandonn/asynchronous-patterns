const util = require('util')
const fs = require('fs')

const readFileWithPromise = util.promisify(fs.readFile)

readFileWithPromise('a.txt', { encoding: 'utf8' })
  .then(aContents => {
    return readFileWithPromise(aContents, { encoding: 'utf8' })
  })
  .then(nextContents => {
    return readFileWithPromise(nextContents, { encoding: 'utf8' })
  })
  .then(finalContents => {
    console.log(finalContents)
  })

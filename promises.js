const fs = require('fs')

function readFileWithPromise(fileName, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, options, (err, contents) => {
      if (err) {
        reject(err)
        return
      }
      resolve(contents)
    })
  })
}

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

/*
  GOAL:
    Given the file a.txt, read its content.  It contains the name of the next
    file to load, whose content will be the name of the final file to load.
    Print the contents of the final file.
*/

const bluebird = require('bluebird')
const fs = require('fs')

const readFileWithPromise = bluebird.promisify(fs.readFile)

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

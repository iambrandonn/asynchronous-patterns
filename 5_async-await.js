const util = require('util')
const fs = require('fs')

const readFileWithPromise = util.promisify(fs.readFile)

async function getData(startingFile) {
  const aContents = await readFileWithPromise(startingFile, {
    encoding: 'utf8'
  })
  const nextContents = await readFileWithPromise(aContents, {
    encoding: 'utf8'
  })
  return await readFileWithPromise(nextContents, { encoding: 'utf8' })
}

getData('a.txt')
  .then(finalContents => {
    console.log(finalContents)
  })
  .catch(err => {
    console.error('Oh no! Something went wrong!')
    console.error(err.message)
  })

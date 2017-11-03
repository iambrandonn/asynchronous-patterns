const fs = require('fs')

fs.readFile('a.txt', { encoding: 'utf8' }, (err, aContents) => {
  fs.readFile(aContents, { encoding: 'utf8' }, (err, nextContents) => {
    fs.readFile(nextContents, { encoding: 'utf8' }, (err, finalContents) => {
      console.log(finalContents)
    })
  })
})

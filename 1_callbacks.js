/*
  GOAL:
    Given the file a.txt, read its content.  It contains the name of the next
    file to load, whose content will be the name of the final file to load.
    Print the contents of the final file.
*/

const fs = require('fs')

fs.readFile('a.txt', { encoding: 'utf8' }, (err, aContents) => {
  fs.readFile(aContents, { encoding: 'utf8' }, (err, nextContents) => {
    fs.readFile(nextContents, { encoding: 'utf8' }, (err, finalContents) => {
      console.log(finalContents)
    })
  })
})

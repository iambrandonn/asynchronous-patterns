function querySource1 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4])
    }, Math.random() * 7000)
  })
}

function querySource2 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([5, 6, 7, 8])
    }, Math.random() * 7000)
  })
}

function querySource3 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([9, 10, 11, 12])
    }, Math.random() * 7000)
  })
}

Promise.race([querySource1(), querySource2(), querySource3()])
  .then(resolved => {
    console.log('First results: ')
    console.log(resolved)
  })
  .catch(err => {
    console.error(err.message)
  })

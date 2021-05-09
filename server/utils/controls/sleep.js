// Initializations
const sleep = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000))

// Exports
module.exports = sleep

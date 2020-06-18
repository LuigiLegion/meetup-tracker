// Imports
const router = require('express').Router()

const usersRouter = require('./routers/users')
const meetupsRouter = require('./routers/meetups')

// Middleware
router.use('/users', usersRouter)
router.use('/meetups', meetupsRouter)

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// Exports
module.exports = router

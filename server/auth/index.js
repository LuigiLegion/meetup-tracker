// Imports
const router = require('express').Router()

const meetupStrategy = require('./strategies/meetup')

// Middleware
router.use('/meetup', meetupStrategy)

// Routes
router.get('/me', (req, res) => {
  res.json(req.user)
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// Exports
module.exports = router

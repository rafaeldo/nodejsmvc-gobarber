const express = require('express')
const routes = express.Router()

// Controllers
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

// Custom Middlewares
const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

// Files Upload
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

// Flash Middleware
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

// ROUTES
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

// Auth Middleware Guard
routes.use('/app', authMiddleware)

// ROUTES
routes.get('/app/dashboard', (req, res) => {
  console.log(req.session.user)
  res.render('dashboard')
})
routes.get('/app/logout', SessionController.destroy)

module.exports = routes

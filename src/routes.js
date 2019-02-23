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

// ROUTES
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

// Auth Middleware Guard
routes.use('/app', authMiddleware)

routes.get('/app/dashboard', (req, res) => {
  console.log(req.session.user)
  res.render('dashboard')
})

module.exports = routes

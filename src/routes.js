const express = require('express')
const routes = express.Router()

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

// Files Upload
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

routes.get('/', SessionController.create)
routes.post('/signin', SessionController.store)
routes.get('/signup', UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/dashboard', (req, res) => {
  return res.render('dashboard.njk')
})

module.exports = routes

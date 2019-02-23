const express = require('express')
const routes = express.Router()

const UserController = require('./app/controllers/UserController')

// Files Upload
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

routes.get('/', (req, res) => {
  res.render('auth/signup')
})

routes.get('/signup', UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

module.exports = routes

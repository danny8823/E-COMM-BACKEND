const express = require('express')
const itemController = require('../controller/itemController')
const isAuthenticated = require('../middlewares/isAuthorized')
const itemRouter = express.Router()

itemRouter.post('/api/items/add', isAuthenticated, itemController.add)
itemRouter.post('/api/items/remove', isAuthenticated,itemController.remove)
itemRouter.put('/api/items/update', isAuthenticated,itemController.update)
itemRouter.get('/api/items/list', itemController.list)
itemRouter.get('/api/items/list/:id', itemController.single_item)
itemRouter.delete('/api/items/delete', isAuthenticated,itemController.delete)

module.exports = itemRouter 
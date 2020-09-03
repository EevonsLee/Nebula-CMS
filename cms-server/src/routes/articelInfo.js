const express = require('express')
const articelInfoController = require('../controller/articelInfo.js');
const articelInfoRouter = express.Router()

articelInfoRouter.post('/api/upload', articelInfoController.fileUpload)
articelInfoRouter.post('/api/new_info',articelInfoController.addNewInfo)
articelInfoRouter.get('/api/new_info',articelInfoController.index)
module.exports = articelInfoRouter;
const express = require('express')
const articelClassController = require('../controller/articelClass.js');
const articelClassRouter = express.Router()
articelClassRouter.get('/api/articelClass', articelClassController.index);
articelClassRouter.post('/api/new_class', articelClassController.addNewClass)
module.exports = articelClassRouter;
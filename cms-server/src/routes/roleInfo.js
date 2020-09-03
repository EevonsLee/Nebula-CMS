const express=require('express')
const roleController=require('../controller/roleInfo')
const roleRouter=express.Router();
roleRouter.get('/api/role',roleController.index)
roleRouter.delete('/api/role/:id',roleController.roleDeletes)
roleRouter.post('/api/role',roleController.roleAdd)
roleRouter.put('/api/role/:id',roleController.roleEdit)
roleRouter.get('/api/role/:id',roleController.roleGet)
roleRouter.get('/api/roles',roleController.getAllRoles)
module.exports=roleRouter
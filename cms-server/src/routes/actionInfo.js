const express=require('express')
const actionController=require('../controller/actionInfo')
const actionRouter=express.Router()
actionRouter.get('/api/action',actionController.index)
actionRouter.post('/api/action',actionController.actionAdd)
actionRouter.put('/api/action/:id',actionController.actionEdit)
actionRouter.delete('/api/action/:id',actionController.actionDelete)
actionRouter.get('/api/actions',actionController.getAllActions)
actionRouter.get('/api/role_action/:id',actionController.getRoleActions)
actionRouter.post('/api/role_action',actionController.addRoleActions);
actionRouter.delete('/api/role_action/:id',actionController.deleteRoleActions)
module.exports=actionRouter
const express = require('express')
const userController=require('../controller/userInfo')
const userRouter=express.Router();
userRouter.get('/api/user',userController.index)
userRouter.post('/api/userlogin',userController.userlogin)
userRouter.post('/api/useradd',userController.useradd)
userRouter.delete('/api/user/:id',userController.userDeletes)
userRouter.put('/api/useredit/:id',userController.userEdit)
userRouter.get('/api/user_role/:id',userController.getUserRole)
userRouter.post('/api/user_role',userController.userAddRole)
userRouter.delete('/api/user_role/:id',userController.userDeleteRole)
userRouter.get('/api/user_action/:id',userController.getUserAction)
userRouter.post('/api/user_action',userController.userAddAction);
userRouter.delete('/api/user_action/:id',userController.userDeleteAction)
userRouter.get('/api/user_action_list/:id',userController.getUserActionList)
module.exports=userRouter;
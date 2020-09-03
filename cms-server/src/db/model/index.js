// 数据模型的入口文件，设置模型的关系。
const User=require('./User')
const Role=require('./Role')
const Action=require('./Action')
const UserRole=require('./UserRole')
const RoleAction=require('./RoleAction')
const UserAction=require('./UserAction')
const ArticelClass=require('./ArticelClass')
const ArticelInfo=require('./ArticelInfo')
const SensitiveWord=require('./SensitiveWord')
// 用户与角色关系
User.belongsToMany(Role,{through:{model:UserRole},foreignKey:'userId'})
Role.belongsToMany(User,{through:{model:UserRole},foreignKey:'roleId'})
// 角色与权限关系
Role.belongsToMany(Action,{through:{model:RoleAction},foreignKey:'roleId'})
Action.belongsToMany(Role,{through:{model:RoleAction},foreignKey:'actionId'})
// 用户与权限关系
User.belongsToMany(Action,{through:{model:UserAction},foreignKey:'userId'})
Action.belongsToMany(User,{through:{model:UserAction},foreignKey:'actionId'})
//设置新闻内容与新闻类别的关系
ArticelInfo.belongsTo(ArticelClass,{foreignKey:'cId'});
ArticelClass.hasMany(ArticelInfo,{foreignKey:'cId'});
module.exports={
    User,
    Role,
    UserRole,
    Action,
    RoleAction,
    UserAction,
    ArticelClass,
    ArticelInfo,
    SensitiveWord
   
}
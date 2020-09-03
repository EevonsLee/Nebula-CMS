const Sequelize = require('sequelize')
const seq=require('./seq')
const User=seq.define('usertestone',{
    userName:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'用户名' // 添加注释
    },
    passWord:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'用户密码'
    }
},{
    // 添加该属性，并且取值为true,表明所创建的数据表名称不是复数。
        freezeTableName:true
    
})
// 角色
const Role=seq.define('roleInfo',{
    roleName:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'角色名称'
    },
    roleRemark:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'角色备注'
    }
},{
    // 添加该属性，并且取值为true,表明所创建的数据表名称不是复数。
        freezeTableName:true
    
})
const UserRole=seq.define('userroletest',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    roleId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
User.belongsToMany(Role,{through:{model:UserRole},foreignKey:'userId'})
Role.belongsToMany(User,{through:{model:UserRole},foreignKey:'roleId'})
// User.belongsToMany(Role,{through:'UserRole',foreignKey:'userId'})
// Role.belongsToMany(User,{through:'UserRole',foreignKey:'roleId'})
const Articel=seq.define('articelInfoTest',{
    title:{
        type:Sequelize.STRING(200),
        allowNull:false,
        comment:'文章标题'
    },
    content:{
        type:Sequelize.TEXT,
        allowNull:false,
        comment:'文章内容'
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
},{
    // 添加该属性，并且取值为true,表明所创建的数据表名称不是复数。
        freezeTableName:true
    
})
Articel.belongsTo(User,{
    foreignKey:'userId'
})
User.hasMany(Articel,{
    foreignKey:'userId'
})
module.exports={User,Articel,Role,UserRole}
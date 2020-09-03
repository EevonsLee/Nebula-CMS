const seq=require('../seq')
const {STRING,INTEGER} = require('../types')
const RoleInfo=seq.define('roleInfo',{
    roleName:{
        type:STRING,
        allowNull:false,
        unique:true,
        comment:'角色名称，唯一'
    },
    remark:{
        type:STRING,
        allowNull:false,
        comment:'备注信息'
    },
    delFlag:{
        type:INTEGER,
        allowNull:false
    }
},{
    freezeTableName:true
})
module.exports=RoleInfo
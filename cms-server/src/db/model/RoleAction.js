const seq = require('../seq')
const { INTEGER } = require('../types')
const RoleAction=seq.define('roleaction',{
    id:{
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleId:{
        type:INTEGER,
        allowNull:false
    },
    actionId:{
        type: INTEGER,
         allowNull:false
    }
},{
    //添加该属性后，在映射成功后的表名中不在添加s后缀。
    freezeTableName:true
})
module.exports = RoleAction
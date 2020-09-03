const seq = require('../seq')
const { INTEGER } = require('../types')
const UserAction=seq.define('useraction',{
    id:{
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
        type:INTEGER,
        allowNull:false
    },
    actionId:{
        type: INTEGER,
         allowNull:false
    },
    delFlag:{
        type: INTEGER,
        allowNull:false
    }
},{
    //添加该属性后，在映射成功后的表名中不在添加s后缀。
    freezeTableName:true
})
module.exports = UserAction
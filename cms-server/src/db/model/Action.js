//权限数据模型
const seq = require('../seq')
const { STRING, INTEGER } = require('../types')
const ActionInfo = seq.define('actionInfo', {
    actionName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '权限名称，唯一'
    },
    actionType:{
        type: STRING,
        allowNull: false,
        comment: '权限类型'
    },
    actionSubby:{
        type: INTEGER,
        allowNull: false,
        comment: '权限提交人'
    },
    actionCode:{
        type: STRING,
        allowNull: false,
        comment: '权限码'
    },
    actionUrl:{
        type: STRING,
        allowNull: false,
        comment: '权限地址'
    },
     pId:{
        type:INTEGER,
        allowNull: false,
        comment:'权限的父级编号'

    },
    remark:{
        type: STRING,
        allowNull: false,
        comment: '权限备注'
    },
    delFlag:{
        type: INTEGER,
        allowNull: false,
        comment: '删除标记'
    }

},{
    //添加该属性后，在映射成功后的表名中不在添加s后缀。
    freezeTableName:true
})

module.exports = ActionInfo
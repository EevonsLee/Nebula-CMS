//新闻类别数据模型
const seq = require('../seq')
const { STRING, INTEGER } = require('../types')
const ArticelClass = seq.define('articelClass', {
    articelType: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '类型名称，唯一'
    },
    parentId:{
        type: INTEGER,
        allowNull: false,
        comment: '父类别编号'
    },
    createUserId:{
        type: INTEGER,
        allowNull: false,
        comment: '类别创建人'
    },
    remark:{
        type: STRING,
        allowNull: false,
        comment: '类别备注'
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

module.exports = ArticelClass
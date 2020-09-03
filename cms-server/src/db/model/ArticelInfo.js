// 新闻内容模型的创建
const seq = require('../seq')
const { STRING, INTEGER,TEXT} = require('../types')
const ArticelInfo = seq.define('articelInfo', {
    keyWords: {
        type: STRING,
        allowNull: false,
        comment: '新闻关键词'
    },
    title: {
        type: STRING,
        allowNull: false,
        comment: '新闻标题'
    },
    intro:{
        type: STRING,
        allowNull: false,
        comment: '新闻简介'
    },
    content:{
        type: TEXT,
        allowNull: false,
        comment: '新闻内容'
    },
    author:{
        type: STRING,
        allowNull: false,
        comment: '新闻作者'
    },
    origin:{
        type:STRING,
        allowNull: false,
        comment:'新闻来源'

    },
    photoUrl:{
        type:STRING,
        allowNull: false,
        comment:'新闻图片地址'
    },
    cId:{
        type:INTEGER,
        allowNull: false,
        comment:'表示当前新闻属于哪个类别'
    },
    remark:{
        type: STRING,
        allowNull: false,
        comment: '新闻内容备注'
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

module.exports = ArticelInfo
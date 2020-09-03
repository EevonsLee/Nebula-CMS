// 敏感词模型
const seq = require('../seq')
const { STRING, INTEGER} = require('../types')
const SensitiveWord = seq.define('sensitiveWord', {
    wordPattern: {
        type: STRING,
        allowNull: false,
        comment: '敏感词名称'
    },
    isForbid:{
        type: INTEGER,
        allowNull: false,
        comment: '禁用词'
    },
    isMod:{
        type: INTEGER,
        allowNull: false,
        comment: '审查词'
    },
    replaceWord: {
        type: STRING,
        allowNull: true,
        comment: '替换词'
    },

},{
    //添加该属性后，在映射成功后的表名中不在添加s后缀。
    freezeTableName:true
})

module.exports = SensitiveWord
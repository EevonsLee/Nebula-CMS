const {ArticelInfo,SensitiveWord}=require('../db/model/index')
const Sequelize = require('sequelize')
const Op=Sequelize.Op
//查询所有禁用词的方法
async function getForWord(){
    const forWordsList=await SensitiveWord.findAll({
        where: {
            isForbid:1
        }
    })
    return forWordsList
}
// 获取所有的审查词
async function getModWord(){
    const forModWordsList=await SensitiveWord.findAll({
        where: {
            isMod:1
        }
    })
    return forModWordsList
}
// 查询所有的替换词
async function getReplaceWord(){
    const replaceWordList=await SensitiveWord.findAll({
        where: {
            isForbid:0,
            isMod:0
        }
    })
    return replaceWordList
}
async function addNew(data){
    return ArticelInfo.create({
        keyWords:data.keyWords,
        title:data.title,
        intro:data.intro,
        content:data.content,
        author:data.author,
        origin:data.origin,
        photoUrl:data.photoUrl,
        cId:parseInt(data.cId),
        remark:data.remark,
        delFlag:0
    })
}
async function getNewList(newInfoSearch){
    if(typeof(newInfoSearch.title)!=='undefined'){
        const newInfoCount=await ArticelInfo.findAndCountAll({
            where:{
                title:{
                    [Op.substring]:newInfoSearch.title
                }
            }
        })
        const result=await ArticelInfo.findAll({
            where:{
                title:{
                    [Op.substring]:newInfoSearch.title
                }
            },
            order:[
                [newInfoSearch.sort,newInfoSearch.order]
            ],
            limit:newInfoSearch.pageSize,
            offset:(newInfoSearch.pageIndex-1)*newInfoSearch.pageSize
        })
        return {data:result,count:newInfoCount.count}
    }else{
        const newInfoCount=await ArticelInfo.findAndCountAll()
        const result=await ArticelInfo.findAll({
            order:[
                [newInfoSearch.sort,newInfoSearch.order]
            ],
            limit:newInfoSearch.pageSize,
            offset:(newInfoSearch.pageIndex-1)*newInfoSearch.pageSize
        })
        return {data:result,count:newInfoCount.count}
    }
}
module.exports={
    addNew,
    getForWord,
    getModWord,
    getReplaceWord,
    getNewList
}
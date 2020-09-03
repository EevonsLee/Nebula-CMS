// npm install multiparty
const {addNew,getForWord,getModWord,getReplaceWord,getNewList}=require('../services/articelInfo')
const newInfoSearch=require('../model/newInfoSearch')
const {get,set} =require('../db/redis')
const multiparty=require('multiparty')
const path=require('path')
const fs=require('fs')
function fileUpload(req,res){
    let form=new multiparty.Form();
    form.encoding='utf-8';
    form.uploadDir='../cms-server/src/public/files'
    form.maxFilesSize=2*1024*1024;
    form.parse(req,function(err,fields,files){
        if(err){
            console.log(err)
        }else{
            let uploadedPath=files.file[0].path;
            let newfileName=new Date().getMilliseconds()+path.extname(uploadedPath);
            if(path.extname(uploadedPath)==='.jpg'||path.extname(uploadedPath)==='.png'){
                let dsPath='../cms-server/src/public/files/'+newfileName;
                fs.rename(uploadedPath,dsPath,function(err){
                    if(err){
                        res.send({msg:'文件重命名失败'})
                    }else{
                        res.send({msg:'/files/'+newfileName})
                    }
                })
            }else{
                fs.unlink(uploadedPath,function(err){
                    if(err){
                        console.log(err)
                    }
                })
                res.send({msg:'文件只能上传图片'})
            }
        }
    })
}
// 保存新闻信息
async function addNewInfo(req,res){
  const content=req.body.content
    if(await CheckForWord(content)!==null){
        console.log('添加的新闻中含有禁用词')
    }else if(await CheckModWord(content)!==null){
        console.log('添加的新闻中含有审查词')
    }else{
      const msg= await CheckReplaceWord(content);
      req.body.content=msg;
        const newInfo=await addNew(req.body);
        return res.json({code:0,data:newInfo})
    }
  }
// 过滤禁用词
async function CheckForWord(msg){
    const result=await get('fword');
    let arr=[];
    if(result===null){
        arr=await getForWord();
        set('fword',arr)
        console.log('从数据库中获取了禁用词')
    }else{
        arr=result
        console.log('从缓存中获取了禁用词')
    }
    // const arr=await getForWord();
    const newArray=[];
    for(let i=0;i<arr.length;i++){
        // newArray.push(arr[i].dataValues.wordPattern);
        newArray.push(arr[i].wordPattern);
    }
   const str= newArray.join('|') // aa|bb|ccc
   return msg.match(str)
}
// 审查词过滤
async function CheckModWord(msg){
    const arr=await getModWord();
    const newArray=[];
    for(let i=0;i<arr.length;i++){
        newArray.push(arr[i].dataValues.wordPattern);
    }
    let str= newArray.join('|')
    str=str.replace("{2}",".{0,2}")
    str=str.replace("\\","\\\\");
    console.log('str=',str)
    return msg.match(str)
}
// 替换词
async function CheckReplaceWord(msg){
    const arr=await getReplaceWord();
    const newArray=[];
    for(let i=0;i<arr.length;i++){
        newArray.push(arr[i].dataValues);
    }
    for(let i=0;i<newArray.length;i++){
        msg=msg.replace(newArray[i].wordPattern,newArray[i].replaceWord);
    }
    return msg;

}
async function index(req,res){
    let pageIndex=parseInt(req.query.page)||1
    let pageSize=parseInt(req.query.limit)||3
    let title=req.query.q;
    let order=req.query.order;
    let sort=req.query.sort;
    if(title===''||typeof(title)==='undefined'){
        newInfoSearch.NewInfoSearch.title=undefined
    }else{
        newInfoSearch.NewInfoSearch.title=title
    }
    newInfoSearch.NewInfoSearch.pageIndex=pageIndex
    newInfoSearch.NewInfoSearch.pageSize=pageSize
    newInfoSearch.NewInfoSearch.order=order
    newInfoSearch.NewInfoSearch.sort=sort
    const roleList=await getNewList( newInfoSearch.NewInfoSearch)
    return res.json({
        code:0,
        data:roleList.data,
        totalCount:roleList.count
    })
}
module.exports={
    fileUpload,
    addNewInfo,
    index
}

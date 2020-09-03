const {getList,addClass}=require('../services/articelClass')
async function index(req,res) {
  const rows= await getList();
  return res.json({code:0,data:rows});
}
async function addNewClass(req,res) {
  const classInfo=await addClass(req.body);
  return res.json({code:0,data:'新闻类别添加成功'})
}
module.exports={
    index,
    addNewClass
}
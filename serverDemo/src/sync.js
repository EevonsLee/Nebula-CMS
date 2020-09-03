const seq=require('./seq')
require('./model')
seq.sync({force:true}).then(()=>{
    console.log('sync ok');
    process.exit()
})
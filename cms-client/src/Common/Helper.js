export function urlParams2Object(str){
    // ?str=23&name=zhangsan
    if(!str){
        return null;
    }
    str=str.slice(1);
    let parseArr=str.split('&');
    let result={}
    parseArr.forEach(item=>{
       let keyValueArr=item.split('=')
       result[keyValueArr[0]]=keyValueArr[1];
    })
    return result
}
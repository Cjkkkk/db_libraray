'use strict'
var fs = require('fs')
/*
@params
@return
*/
const create_card = async (ctx,next)=>{
    
}

/*
@params
@return
*/
const delete_card = async (ctx,next)=>{
    
}
// const go_back = async (ctx,next)=>{
//     fs.readFile('./index.html',function(err,html){
//         if(err){
//             throw err;
//         }else{
//             ctx.response.body = html
//         }
//     })
// }

module.exports = {
    'POST /api/v1/card/create_card':create_card,
    'POST /api/v1/card/delete_card':delete_card,

}
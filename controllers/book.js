'use strict'
const get_all_book = async (ctx,next)=>{
    // ctx.response.set('Access-Control-Allow-Origin', 'http://127.0.0.1:7000')
    // ctx.response.set('Access-Control-Allow-Method', '*')
    ctx.response.body = "under con"
    console.log(ctx.request.query.stuid)
    console.log(ctx.request)
}


module.exports = {
    'GET /api/v1/book/get_all_book':get_all_book
}
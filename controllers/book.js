'use strict'
var db = require('../db')
/*
@params
@return
*/
const query_book = async (ctx,next)=>{
    var result = await db.query_book(ctx.request.body)
    if(result[1] == 1){
        ctx.response.body = {
        status:result[1],
        message:result[0]
    }
}
else{
    ctx.response.body = {
        status:result[1],
        data:result[0]
    }
}
}
/*
@params
@return
*/
const return_book = async (ctx,next)=>{
    
}
/*
@params
@return
*/
const borrow_book = async (ctx,next)=>{
    
}
/*
@params
@return
*/
const new_book = async (ctx,next)=>{
    var result = await db.new_book(ctx.request.body)
    ctx.response.body = {
        status:result[1],
        message:result[0]
    }
}

module.exports = {
    'POST /api/v1/book/query_book':query_book,
    'POST /api/v1/book/return_book':return_book,
    'POST /api/v1/book/borrow_book':borrow_book,
    'POST /api/v1/book/new_book':new_book
}
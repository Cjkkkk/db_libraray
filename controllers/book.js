'use strict'
var db = require('../db')
/*
@params
@return
*/
const get_book = async (ctx,next)=>{
    // ctx.response.set('Access-Control-Allow-Origin', 'http://127.0.0.1:7000')
    // ctx.response.set('Access-Control-Allow-Method', '*')
    ctx.response.body = "under con"
    console.log(ctx.request.query.stuid)
    console.log(ctx.request)
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
    'GET /api/v1/book/get_book':get_book,
    'POST /api/v1/book/return_book':return_book,
    'POST /api/v1/book/borrow_book':borrow_book,
    'POST /api/v1/book/new_book':new_book
}
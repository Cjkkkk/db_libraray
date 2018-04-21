'use strict'
var db = require('../db')
var fs = require('fs')
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
    var result = await db.return_book(ctx.request.body)
    ctx.response.body = {
        status:result[1],
        message:result[0]
    }
}
/*
@params
@return
*/
const borrow_book = async (ctx,next)=>{
    var result = await db.borrow_book(ctx.request.body, ctx.cookies.get("id"))
    ctx.response.body = {
        status:result[1],
        message:result[0]
    }
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


const query_user = async (ctx,next)=>{
    console.log(ctx.request.body)
    var result = await db.query_user(ctx.request.body)
    ctx.response.body = {
        status:result[1],
        message:result[0]
    }
}

const new_file = async (ctx,next)=>{
    const files = ctx.request.body.files['book_file']
    const reader = fs.createReadStream(files.path)
    let data = await (new Promise((resolve,reject)=>{
        reader.on('data',chunk=>{
            resolve(chunk)
        })
    }))
    data = data.toString('utf-8')
    data.replace(/(\n\r|\n|\r)+/,'\n')
    data = data.split(/[\s]*\n+[\s]*/)
    data = data.map(str=>str.split(/[\s]*\,[\s]*/))
    let promise_stack = []
    for(let i in data){
        promise_stack.push(db.new_book(data[i]))
    }
    let result_stack = await Promise.all(promise_stack)
    let message = result_stack.map((obj)=>obj[0]).reduce((accumulator,current)=>accumulator+current+"\n","")
    let status = result_stack.map((obj)=>Number(obj[1])).reduce((accumulator,current)=>accumulator+current,0)
    ctx.response.body = {
        status:status,
        message:message
    }
}
module.exports = {
    'POST /api/v1/book/query_book':query_book,
    'POST /api/v1/book/return_book':return_book,
    'POST /api/v1/book/borrow_book':borrow_book,
    'POST /api/v1/book/new_book':new_book,
    'POST /api/v1/book/query_user':query_user,
    'POST /api/v1/book/new_file':new_file
}
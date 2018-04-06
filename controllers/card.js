'use strict'
var fs = require('fs')
var db = require('../db')
/*
@params ctx.body(
    cno,
    user_name,
    depart_name,
    class)
@return [message,status]
*/
const create_card = async (ctx,next)=>{
    var result = await db.create_card(ctx.request.body)
    ctx.response.body = {
        status:result[1],
        message:result[0]
    }
}

/*
@params ctx.body(
    cno
)
@return [message,status]
*/
const delete_card = async (ctx,next)=>{
    var result = await db.delete_card(ctx.request.body)
    ctx.response.body = {
        status:result[1],
        message:result[0]
    }
}


module.exports = {
    'POST /api/v1/card/create_card':create_card,
    'POST /api/v1/card/delete_card':delete_card,

}
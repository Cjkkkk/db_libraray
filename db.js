

'use strict'
var mysql = require('mysql')
var conf = require('./conf/conf')
var connection = mysql.createConnection({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    // port:conf.port,
    database:conf.database
})

/*
@params
@return
*/
const middle_sql = async (sql,params)=>{
    var result = await new Promise((resolve,reject)=>{
        connection.query(sql,params,function(err,result){
            if(err){
                console.log(err.message)
                reject()
            }
            resolve(result)
        })
    }).then((result)=>{
        return result
    }).catch((err)=>{
        console.log(err.message)
        return 1
    })
    connection.release
    return result
}


/*
@params
@return
*/
const verify = async (id,password)=>{
    var sql = `SELECT password,admin_name FROM admin where id =? `
    var params = [id]
    var result = await middle_sql(sql,params)
    console.log(result)
    if(result == 1)return ["数据库错误",1]
    else{
        if(result.length == 0)return ["没有这个用户",2]
        if(result[0].password == password)return[result[0].admin_name,0]
        else{
            return ["密码错误",2]
        }
    }
}


/*
@params
@return
*/
const new_book = async(data)=>{
    var sql = `insert into book SET ?`
    var params = data//object
    var result = middle_sql(sql,data)
}


/*
@params
@return
*/
const query_book = async(data)=>{
    var verify_result = verify(data.cookie.id,data.cookie.password)
    if(verify_result[1] != 1)return ["身份验证失败",2]
    var params = []
    var sql
    if(data.length == 0){
        sql = `select * from book`
    }
    else{
        sql = `select * from book where `
        for(var field in data){
            sql = sql +`${field} = ? and `
        }
        sql = sql.slice(0,sql.length-4)
    }
    var result = middle_sql(sql,data)
    console.log(sql)

}

/*
@params
@return
*/
const return_book = async(data)=>{
    var verify_result = verify(data.cookie.id,data.cookie.password)
    if(verify_result[1] != 1)return ["身份验证失败",2]
    var sql = `select stock from book where book_no = ?`
    var params = [data.book_no]
    var result = await middle_sql(sql,params)
    if(result.length == 0)return ["数据库中不存在这本书",1]
    sql = `update book set stock = stock + 1 where book_no = ?`
    params = [data.book_no]
    result = await middle_sql(sql,params)
    if(result == 1)return ["数据库出现错误",1]
    else{
        return ["你已经借书成功",0]
    }
   
}


/*
@params
@return
*/
const borrow_book = async (data)=>{
    var verify_result = verify(data.cookie.id,data.cookie.password)
    if(verify_result[1] != 1)return ["身份验证失败",2]
    var sql = `select stock from book where book_no = ?`
    var params = [data.book_no]
    var result = await middle_sql(sql,params)
    if(result.length == 0)return ["数据库中不存在这本书",1]
    if(result[0].stock > 0){
        sql = `update book set stock = stock - 1 where book_no = ?`
        params = [data.book_no]
        result = await middle_sql(sql,params)
        if(result == 1)return ["数据库出现错误",1]
        else{
            return ["你已经还书成功",0]
        }
    }else{
        return ["无法借书,库存不足",1]
    }
    
}


/*
@params
@return
*/
const create_card = async(data)=>{
    var verify_result = verify(data.cookie.id,data.cookie.password)
    if(verify_result[1] != 1)return ["身份验证失败",2]
    var sql = 'insert into card values'
    var result = await middle_sql(sql)
}

/*
@params
@return
*/

const delete_card = async(data)=>{
    var verify_result = verify(data.cookie.id,data.cookie.password)
    if(verify_result[1] != 1)return ["身份验证失败",2]
    var sql = `delete from card where cno = ?`
    var params = [data.cno]
    var result = await middle_sql(sql,params)
}

const query_user = async(data)=>{
    var verify_result = verify(data.cookie.id,data.cookie.password)
    if(verify_result[1] != 1)return ["身份验证失败",2]
    var sql = `select * from book,record where book.book_no = record.book_no,cno = ?`
    var params = [data.cno]
    var result = await middle_sql(sql,params)
    if(result == 1)return ["数据库错误",1]
    else{
        return [result,0]
    }
}
module.exports ={
    'verify':verify,
    'new_book':new_book,
    'query_book':query_book,
    'borrow_book':borrow_book,
    'return_book':return_book,
    'delete_card':delete_card,
    'create_card':create_card,
    'query_user':query_user
}               
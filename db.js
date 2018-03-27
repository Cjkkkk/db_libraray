import { create } from 'domain';

'use strict'
var mysql = require('mysql')
var conf = require('./conf/conf')
var connection = mysql.createConnection({
    host:conf.mysql_conf.host,
    user:conf.mysql_conf.user,
    password:conf.mysql_conf.password,
    port:conf.mysql_conf.port,
    database:conf.mysql_conf.database
})

/*
@params
@return
*/
const middle_sql = async (sql)=>{
    var result = await new Promise((resolve,reject)=>{
        connection.query(sql,params,function(err,result){
            if(err){
                console.log(err.message)
                reject()
            }
            console.log(result)
            resolve(result)
        })
    }).then((result)=>{
        return result
    }).catch(()=>{
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
    var sql = `SELECT password FROM account where id =? `
    var params = [id]
    var result = await middle_sql(sql,params)
    if(result == 1)return ["身份验证失败",2]
    else{
        if(result.password == password)return["身份验证成功",0]
        else{
            return ["身份验证失败",2]
        }
    }
}

/*
@params
@return
*/
const get_book = async (data)=>{
    var verify_result = verify(data.cookie.id,data.cookie.password)
    if(verify_result[1] != 1)return ["身份验证失败",2]
    var sql = `SELECT * FROM record where id = ?`
    var params = [data.cno]
    var result = await middle_sql(sql,params)
    if(result == 1)return ["获取书籍失败",1]
    else{
        return [result,0]
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

}

/*
@params
@return
*/
const borrow_book = async(data)=>{
    var verify_result = verify(data.cookie.id,data.cookie.password)
    if(verify_result[1] != 1)return ["身份验证失败",2]
    var sql = `update book set stock = stock - 1 where book_no = ?`
    var params = [data.book_no]
    var result = await middle_sql(sql,params)
    if(result == 1)return ["数据库出现错误",1]
    else{
        return ["你已经借书成功",0]
    }
   
}


/*
@params
@return
*/
const return_book = (data)=>{
    var verify_result = verify(data.cookie.id,data.cookie.password)
    if(verify_result[1] != 1)return ["身份验证失败",2]
    var sql = `update book set stock = stock + 1 where book_no = ?`
    var params = [data.book_no]
    var result = await middle_sql(sql,params)
    if(result == 1)return ["数据库出现错误",1]
    else{
        return ["你已经还书成功",0]
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
    var sql = `delete from card where cno = ${data.cno}`
    var result = await middle_sql(sql)
}
module.exports ={
    'get_book':get_book,
    'new_book':new_book,
    'query_book':query_book,
    'borrow_book':borrow_book,
    'return_book':return_book,
    'delete_card':delete_card,
    'create_card':create_card
}               
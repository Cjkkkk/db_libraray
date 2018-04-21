

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
const middle_sql = async (sql,params = null)=>{
    var result = await new Promise((resolve,reject)=>{
        connection.query(sql,params,function(err,result){
            if(err){
                console.log(err.code)
                reject(err)
            }
            resolve(result)
        })
    }).then((result)=>{
        console.log(result)
        return result
    }).catch((err)=>{
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
    console.log(data)
    var result = await middle_sql(sql,data)
    if(result != 1){
        return [`${data.book_name} 入库成功`,0]
    }else{
        // if(result == 'ER_DUP_ENTRY')return [`${data.book_name} 入库失败,book_no 重复`,1]
        return [`${data.book_name} 入库失败`,1]
    }
}


/*
@params
@return
*/
const query_book = async(data)=>{
    var params = []
    var sql
    var range = {}
    range.year = data.year
    range.price = data.price
    range.stock = data.stock
    delete data.year
    delete data.price
    delete data.stock
    console.log(range)
    console.log(data)
    var query = ""
    var sql = 'select * from book'
    for(var field in data){
        if(data[field])query += `${field} = "${data[field]}" and `
    }
    for(var field in range){
        if(range[field].upbound && range[field].lowerbound)query += `${field} < ${range[field].upbound} and ${field} > ${range[field].lowerbound} and `
    }
    if(query){
        //有查询条件
        sql = sql + " where "+ query
        sql = sql.slice(0,-5)
    }
    console.log(sql)
    var result = await middle_sql(sql,data)
    if(result == 1)return ["数据库错误",1]
    else{
        return [result,0]
    }

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
@params ctx.body(
    cno,
    user_name,
    depart_name,
    class)
@return [message,status]
*/
const create_card = async(data)=>{
    var sql = 'insert into card SET ?'
    var result = await middle_sql(sql,data)
    if(result != 1){
        console.log(result)
        return ["创建成功",0]
    }else{
        return ["创建失败",1]
    }
}
/*
@params ctx.body(
    cno
)
@return [message,status]
*/

const delete_card = async(data)=>{
    var sql = `delete from card where cno = ?`
    var params = [data.cno]
    var result = await middle_sql(sql,params)
    if(result != 1){
        console.log(result)
        return ["删除成功",0]
    }else{
        return ["删除失败",1]
    }
}

const query_user = async(data)=>{
    console.log(data)
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
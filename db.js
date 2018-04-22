

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
                console.log(err)
                reject(err)
            }
            resolve(result)
        })
    }).then((result)=>{
        //console.log(result.message)
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
    var sql = `insert into book values(?,?,?,?,?,?,?,?) `
    data = Object.keys(data).map(key=>{
        if(key=="year"||key=="price"||key=="stock")return Number(data[key])
        return data[key]
    })
    console.log(data)
    var result = await middle_sql(sql,data)
    if(result != 1){
        return [`${data[2]} 入库成功`,0]
    }else{
        // if(result == 'ER_DUP_ENTRY')return [`${data.book_name} 入库失败,book_no 重复`,1]
        return [`${data[2]} 入库失败`,1]
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
    var sql = `select book_no from record where cno = ? and book_no = ? and return_date is null`
    var params = [data.cno, data.return_book_no]
    console.log(params)
    var result = await middle_sql(sql,params)
    console.log(result)
    if(result.length == 0)return ["你没借过这本书或者你已经还过书了qaq",1]

    let promise_stack = [];
    let update_sql = `update book set stock = stock + 1 where book_no = ?`//更新书本存量
    let update_params = [data.book_no]
    let return_sql = `update record set return_date = ?`//更新归还时间
    let date = new Date()
    date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    let return_params = [date]
    promise_stack.push(middle_sql(update_sql,update_params))
    promise_stack.push(middle_sql(return_sql,return_params))
    result = await Promise.all(promise_stack)//全部执行
    console.log(result[0],'\n',result[1])
    if(result[0]== 1 || result[1] == 1)return ["数据库出现错误",1]
    else{
        return ["你已经还书成功",0]
    }
   
}


/*
@params
@return
*/
const borrow_book = async (data,id)=>{
    var sql = `select stock from book where book_no = ?`
    var params = [data.borrow_book_no]
    var result = await middle_sql(sql,params)
    if(result.length == 0)return ["数据库中不存在这本书",1]//数据库中没有这本书
    if(result[0].stock > 0){//有这本书
        let promise_stack = []
        let update_sql = `update book set stock = stock - 1 where book_no = ?`
        let update_params = [data.book_no]
        promise_stack.push(middle_sql(update_sql,update_params))
        let insert_sql = `insert into record values(?,?,?,?,?)`
        let date = new Date()
        date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        let insert_params = [data.borrow_book_no, data.cno, date, null,id]
        promise_stack.push(middle_sql(insert_sql,insert_params))
        var result = await Promise.all(promise_stack)
        if(result[0] == 1 || result[1] == 1 )return ["数据库出现错误",1]
        else{
            return ["你已经借书成功",0]
        }
    }
    else{
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
    console.log(result.affectedRows)
    if(result != 1 && result.affectedRows > 0){
        console.log(result)
        return ["删除成功",0]
    }else{
        return ["删除失败",1]
    }
}

const query_user = async(data)=>{
    console.log(data.cno)
    var sql = `select book.book_no,category,book_name,press,year,author,price,stock from book,record where book.book_no = record.book_no and cno = ? and return_date is null`
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
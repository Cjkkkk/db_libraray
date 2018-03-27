//import { create } from 'domain';

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

const asyncfun = async ()=>{
    const employees = ["k"];
    var sql = 'select * from card where user_name = ?'
    var result = await new Promise((resolve,reject)=>{
        connection.query(sql,employees,function(err,result){
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
    console.log(result)
    return result
}



const query_book = async(data)=>{
    // var verify_result = verify(data.cookie.id,data.cookie.password)
    // if(verify_result[1] != 1)return ["身份验证失败",2]
    var params = []
    var sql = `select * from book where `
    for(var field in data){
        sql = sql +`${field} = ? and `
    }
    sql = sql.slice(0,sql.length-4)
    console.log(sql)
    

}
let data = {name : "kk",
age:18,
price : 34.33}
query_book(data)
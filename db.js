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

const verify = async (cookie)=>{
    var sql = "SELECT password FROM account where id = "+cookie.id
    var result = await new Promise((resolve,reject)=>{
        connection.query(sql,function(err,result){
            if(err){
                console.log(err.message)
                reject()
            }
            console.log(result[0])
            resolve(result[0])
        })
    }).then((result)=>{
        if(result.password == cookie.password)return["身份验证成功",1]
        return ["身份验证失败",0]
    }).catch(()=>{
        return ['身份验证失败',0]
    })
    connection.release
    return result
}



const get_book = async (id)=>{
    var sql = "SELECT * FROM record where id = "+id
    var result = await new Promise((resolve,reject)=>{
        connection.query(sql,function(err,result){
            if(err){
                console.log(err.message)
                reject()
            }
            console.log(result[0])
            resolve(result[0])
        })
    }).then((result)=>{
        return[result,1]
    }).catch(()=>{
        return ['获取书籍失败',0]
    })
    connection.release
    return result
}
module.exports ={
    'get_book':get_book
}               
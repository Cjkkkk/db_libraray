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
    const employees = { age:23,name: 'Win' };
    var sql = 'INSERT INTO employee SET ?'
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

asyncfun()
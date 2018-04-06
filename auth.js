var db = require('./db')

const verify = async(ctx,next)=>{
    var re = /\/api\/v1\/user\/[\w]+/
    if(ctx.request.url.match(re) === null){
        //不属于api/v1/user/xxx 所以需要验证
        console.log(`authorizing: ${ctx.request.method} ${ctx.request.url}...`)
        var verify_result = await db.verify(ctx.cookies.get('id'),ctx.cookies.get('password'))
        if(verify_result[1] == 1 || verify_result[1] == 2){
            console.log(`authorization fail: ${ctx.request.method} ${ctx.request.url}...`)
            ctx.response.body = {
            status:verify_result[1],
            message:verify_result[0]
            }
        }else{
            console.log(`authorization success: ${ctx.request.method} ${ctx.request.url}...`)
            await next()
        }   
    }else{
        console.log(`match /user don't need authorization: ${ctx.request.method} ${ctx.request.url}...`)
        await next()
    }
}


module.exports = {
    'verify':verify
}
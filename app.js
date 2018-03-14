const koa = require('koa')
const app = new koa()
const bodyparser = require('koa-bodyparser')
const path = require('path')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const Router = require('koa-router')


app.use(cors())
// app.use(async (ctx,next)=>{
//     console.log(ctx.request.header)
// })

var router = new Router()
router.get('/',(ctx,next) => {
    ctx.response.body = "hello,world"
})

router.post('/api/v1/user/login',(ctx,next) => {
    ctx.response.body = "hello"+ctx.request.body.username
    console.log(ctx.request.body)
})

app.use(koaBody({multipart: true}))
app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods());
app.listen("8000")


console.log('app started at port 8000')


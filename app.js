const koa = require('koa')
const app = new koa()
const bodyparser = require('koa-bodyparser')
const path = require('path')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const router = require('./urls')

app.use(cors())
app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
})
app.use(koaBody({multipart: true}))
app.use(bodyparser())
app.use(router)
app.listen("8000")


console.log('app started at port 8000')


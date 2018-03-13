const koa = require('koa')
const app = new koa()
const bodyparser = require('koa-bodyparser')
const path = require('path')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const Router = require('koa-router')

var router = new Router()
router.get('/',(ctx,next) => {
    ctx.response.body = "hello,world"
})

app.use(router.routes())
app.use(cors())
app.use(koaBody({multipart: true}))
app.use(bodyparser())
app.listen("8000")


console.log('app started at port 8000')


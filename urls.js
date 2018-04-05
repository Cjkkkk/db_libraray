const fs = require('fs');
const files = fs.readdirSync(__dirname+'/controllers');
const router = require('koa-router')();
var js_files = files.filter((f)=>{
    return f.endsWith(".js");
});

// 处理每个js文件:
for (var f of js_files) {
    console.log(`process controller: ${f}...`);
    // 导入js文件:
    let mapping = require(__dirname + '/controllers/' + f);
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}
// var fn_html = async (ctx, next) => {
//     console.log(ctx.params)
//     ctx.render(ctx.params[0]);
// };

// router.get(/([\w]+.html)/,fn_html)
module.exports = router.routes();
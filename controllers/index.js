'use strict'

var readFileThunk = function() {
    return new Promise(function (resolve, reject) {
      fs.readFile('index.html', {'encoding': 'utf8'}, function (err, data) {
        if(err) return reject(err)
        resolve(data)
      })
    })
  }

const index = async(ctx,next)=>{
    ctx.response.body = await readFileThunk()
}

module.exports = {
    'GET /':index
}

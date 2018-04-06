'use strict'
const pop_login = ()=>{
    var form = document.getElementById('form_container')
    var shadow = document.getElementById('shadow')
    form.style['display'] = 'block'
    shadow.style['z-index'] = 1
    shadow.style['opacity'] = 0.7
}

module.exports = {
    'pop_login':pop_login
}


import { log } from "util"

const login_Api = async (id,password)=> {
	let result = await fetch('/api/v1/user/login', {
		method: 'POST',
		credentials: 'include',
		headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		id:id,
		password:password
	  }),
  }).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data)
      return data
  }).catch((error)=>{
    console.log(error.message)
      return 1
  })
  return result
}


const status_Api = async()=> {
	let result = await fetch('/api/v1/user/status', {
		method: 'GET',
		credentials: 'include',
		headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		},
  }).then((res)=>{
      return res.json()
  }).then((data)=>{
    console.log(data)
    return data
}).catch((error)=>{
    console.log(error.message)
      return 1
  })
  return result
}



const logout_Api = async()=> {
	let result = await fetch('/api/v1/user/logout', {
		method: 'GET',
		credentials: 'include',
		headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		},
  }).then((res)=>{
      return res.json()
  }).then((data)=>{
    console.log(data)
    return data
}).catch((error)=>{
    console.log(error.message)
      return 1
  })
  return result
}

module.exports = {
    'status_Api':status_Api,
    'login_Api':login_Api,
    'logout_Api':logout_Api
}


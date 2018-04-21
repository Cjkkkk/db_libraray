import { log } from "util"


const basic_get_api = async (url)=>{
	let result = await fetch(url, {
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


const basic_post_api = async (url,data)=>{
	let result = await fetch(url, {
		method: 'POST',
		credentials: 'include',
		headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		},body:JSON.stringify(data)
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
const login_Api = async (data)=> {
  return await basic_post_api('/api/v1/user/login',data)
}

const status_Api = async()=> {
	return await basic_get_api('/api/v1/user/status')
}


const logout_Api = async()=> {
	return await basic_get_api('/api/v1/user/logout')
}

const newBook_Api = async(data)=>{
	return await basic_post_api('/api/v1/book/new_book',data)
}

const getBook_Api = async(data)=>{
  var tmp = {}
  for(var field in data){
    if(field != "data" && field != "page")tmp[field] = data[field]
  }
	return await basic_post_api('/api/v1/book/query_book',tmp)
}

const query_user = async(cno)=>{
  console.log(cno)
	return await basic_post_api('/api/v1/book/query_user',cno)
}

const load_file = async(data)=>{
  let result = await fetch('/api/v1/book/new_file', {
		method: 'POST',
		credentials: 'include',
		headers: {
		Accept: 'application/json',
		// 'Content-Type': 'application/json',
		},body:data
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
    'logout_Api':logout_Api,
	  'newBook_Api':newBook_Api,
    'getBook_Api':getBook_Api,
    'query_user':query_user,
    'load_file':load_file
}


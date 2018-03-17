const standard_header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}
const fetch_api = async(api_url,body,header = standard_header,method = 'POST')=>{
    var result = await fetch(api_url, {
		method:method,
		// credentials:'same-origin',
		headers: header,
		body: JSON.stringify(body)
      })
    return result
}

module.exports = {
    fetch_api:fetch_api
}


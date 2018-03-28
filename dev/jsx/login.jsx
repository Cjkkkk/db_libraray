import React from 'react';
// const api_url = "http://127.0.0.1:8000"

// const login_Api = async (username,password)=> {
// 	let result = await fetch(api_url+'/api/v1/user/login', {
// 		method: 'POST',
// 		credentials:'same-origin',
// 		headers: {
// 		Accept: 'application/json',
// 		'Content-Type': 'application/json',
// 		},
// 		mode:"cors",
// 		body: JSON.stringify({
// 		username:username,
// 		password:password
// 	  }),
//   })
//   console.log(result)
// }

class Login extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
				id : "",
      	password: ""}
	  	this.handleChange = this.handleChange.bind(this)
	  	this.handleSubmit = this.handleSubmit.bind(this)
	  	this.handleRegister = this.handleRegister.bind(this)
    }

  	handleChange(event) {
		let target = event.target
		let key = target.name
		console.log(target.name,target.value)
		this.setState({[key]: target.value})
  	}
		handleRegister(event) {
		// this.setState({})
	}

  	handleSubmit(event) {
		// document.cookie = "name=oeschger"
		// document.cookie = "favorite_food=tripe"
		// var cookie = JSON.parse(document.cookie)
		// alert(document.cookie)
		// alert(typeof(document.cookie))
		// var response = login_Api(this.state.username,this.state.password)
		// event.preventDefault();
  	}
    render() {
      return (
				<div id = "form_container">
        <form className = "form_body">
				<p>Login</p>
  			<label >
				<span>Enter Your ID</span>
    			<input type="text" value = {this.state.id} name="id" placeholder = "id" onChange = {this.handleChange}/>
			 </label>
			 <br/>
			 <label >
			 <span>Enter Your Password</span>
  				<input type="password"  value = {this.state.password} name="password" placeholder = "password" onChange = {this.handleChange}/>
			</label>
			<br/>
			<label></label>
			<br/> 
			<label>
			<span>&nbsp;</span>
			<button  type = "button" onClick = {this.handleSubmit}>login</button>
			<button  type = "button" onClick = {this.handleRegister}>register</button>
				</label>
		</form>
		</div>
      )
    }
  
  }
  


  export default Login;
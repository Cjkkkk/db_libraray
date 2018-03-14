import React from 'react';
const api_url = "http://127.0.0.1:8000"

const login_Api = async (username,password)=> {
	let result = await fetch(api_url+'/api/v1/user/login', {
		method: 'POST',
		headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		username:username,
		password:password
	  }),
  })
  alert(result)
  console.log(result)
}

class LoginComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
		username : "",
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
		login_Api(this.state.username,this.state.password)
		event.preventDefault();
  	}
    render() {
      return (
        <form>
  			<label>
				Username:
    			<input type="text" value = {this.state.username} name="username" placeholder = "username" onChange = {this.handleChange}/>
 			</label>
			 <label>
				password:
  				<input type="password" value = {this.state.password} name="password" placeholder = "password" onChange = {this.handleChange}/>
			</label>
			<button onClick = {this.handleSubmit}>login</button>
			<button onClick = {this.handleRegister}>register</button>

		</form>
      )
    }
  
  }
  


  export default LoginComponent;
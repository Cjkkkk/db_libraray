import React from 'react';
import api from '../../static/js/fetch_api.js'
import swal from 'sweetalert';

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
		api.login_Api(this.state.id,this.state.password).then((result)=>{
			if(result == 1)return
			else if(result.status == 0){
				var form = document.getElementById('form_container')
				var shadow = document.getElementById('shadow')
				shadow.style['z-index'] = -1;
				shadow.style['opacity'] = 0;
				form.style['display']= 'none'
				swal("WELCOME",`欢迎回来${result.name}~`,"success")
				this.state.name = result.name
    			var logout = document.getElementById('logout')
    			logout.innerHTML = `logout:${this.state.name}`
			}
			else{
				swal("MESSAGE",result.message,"error")
		}
		})
		event.preventDefault();
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
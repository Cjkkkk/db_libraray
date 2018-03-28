import React from 'react'
class Borrow_return extends React.Component {
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
	}

  	handleSubmit(event) {
		
  	}
    render() {
      return (
		<div id = "borrow_return_container">
            this is borrow_return
		</div>
      )
    }
  
  }
  


  export default Borrow_return
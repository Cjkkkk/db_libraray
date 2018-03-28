import React from 'react'
class Delete extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        cno : ""
    }
	  	this.handleChange = this.handleChange.bind(this)
	  	this.handleSubmit = this.handleSubmit.bind(this)
    }

  	handleChange(event) {
		let target = event.target
		let key = target.name
		console.log(target.name,target.value)
		this.setState({[key]: target.value})
  	}
  	handleSubmit(event) {
		alert(this.state,cno)
  	}
    render() {
      return (
		<div id = "delete_container">
            <input type = "text" value = {this.state.cno} name = "cno" placeholder = "input the card id you want to delete" onChange = {this.handleChange}/>
            <br/>
            <button typr="button" onClick = {this.handleSubmit}>delete</button>
        </div>
      )
    }
  
  }
  


  export default Delete;
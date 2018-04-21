import React from 'react'
import api from '../../static/js/fetch_api.js'
class Delete extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        cno : "",
        username:"",
        depart_name:"",
        class:""
    }
	  	this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleadd = this.handleadd.bind(this)
    }
    handleadd(event) {

    }
  	handleChange(event) {
		let target = event.target
		let key = target.name
		console.log(target.name,target.value)
		this.setState({[key]: target.value})
  	}
  	handleSubmit(event) {
		api.delete_card(Object.assign({},{cno:this.state.cno})).then(result=>{
      if(result != 1){
				if(result.status!=1)swal("MESSAGE",result.message,"success")
				else swal("MESSAGE",result.message,"error")
			}
			else{
				swal("MESSAGE","oops","error")
			}
    })
  	}
    render() {
      return (
        <div id = "delete_container">
          <form className = "delete_body">
          <p>delete card</p>
          <label><span>card number</span>
          <input type = "text" value = {this.state.cno} name = "cno" placeholder = "card number you want to delete/add" onChange = {this.handleChange}/>
          </label>
          <br/>
          <label>
          <button typr="button" onClick = {this.handleSubmit}>delete</button>
          </label> 
          <br/>
          <p>add card</p>
          <label><span>username</span>
          <input type = "text" value = {this.state.username} name = "username" placeholder = "username you want to add" onChange = {this.handleChange}/>
          </label>
          <br/>
          <label><span>depart name</span>
          <input type = "text" value = {this.state.depart_name} name = "depart_name" placeholder = "depart_name you want to add" onChange = {this.handleChange}/>
          </label>
          <br/>
          <label><span>class</span>
          <input type = "text" value = {this.state.class} name = "class" placeholder = "class you want to add" onChange = {this.handleChange}/>
          </label>
          <br/>
          <label>          
          <button typr="button" onClick = {this.handleadd}>add</button>
          </label>   
          </form>
        </div>
      )
    }
  
  }
  


  export default Delete;
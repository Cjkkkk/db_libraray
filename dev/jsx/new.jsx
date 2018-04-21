import React from 'react'
import api from '../../static/js/fetch_api.js'
class New extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
		  	book_no:"",
			book_name:"",
			press: "",
			year:"",
			author:"",
			price:"",
			stock:""
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
		api.newBook_Api(this.state).then(result=>{
			if(result != 1)swal("MESSAGE","yeah","success")
			else{
				swal("MESSAGE","oops","error")
			}
		})
  	}
    render() {
      return (
		<div id = "new_container">
        <form className = "new_body">
				<p>New Book</p>
				<label >
					<span>book no</span>
					<input type = "text" value = {this.state.book_no} name = "book_no" placeholder = "input book_no" onChange = {this.handleChange}/>
			 </label>
			 	<br/>
  			<label >
					<span>book name</span>
					<input type = "text" value = {this.state.book_name} name = "book_name" placeholder = "input book_name" onChange = {this.handleChange}/>
			 </label>
			 	<br/>
			 <label >
			 	<span>Press</span>
			 	<input type = "text" value = {this.state.press} name = "press" placeholder = "input press" onChange = {this.handleChange}/>
			</label>
				<br/>
			<label>
			<span>year</span>
			<input type = "text" value = {this.state.year} name = "year" placeholder = "input year" onChange = {this.handleChange}/>
			</label>
			<br/> 
			<label>
			<span>author</span>
			<input type = "text" value = {this.state.author} name = "author" placeholder = "input author" onChange = {this.handleChange}/>
			</label>
			<br/> 
			<label>
			<span>Price</span>
			<input type = "text" value = {this.state.price} name = "price" placeholder = "input price" onChange = {this.handleChange}/>
			</label>
			<br/> 
			<label>
			<span>stock</span>
			<input type = "text" value = {this.state.stock} name = "stock" placeholder = "input stock" onChange = {this.handleChange}/>
			</label>
			<br/>
			<label>
			<span>&nbsp;</span>
			<button type = "button" onClick = {this.handleSubmit}>create</button>
			</label>
			<label>
			<span>new book upload</span>
			<input type = "file"/>
			</label>
		</form>
		</div>
      )
    }
  
  }
  


  export default New;
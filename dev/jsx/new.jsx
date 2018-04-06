import React from 'react'

// 			book_no char(8),
//     category varchar(50),
//     book_name varchar(50),
//     press varchar(30),
//     year int,
//     author varchar(20),
//     price decimal(7,2),
//     stock int,
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
		<div id = "new_container">
        <form className = "new_body">
				<p>New Book</p>
  			<label >
					<span>book name</span>
					<input type = "text" value = {this.state.book_no} name = "book_no" placeholder = "input book_name" onChange = {this.handleChange}/>
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
		</form>
		</div>
      )
    }
  
  }
  


  export default New;
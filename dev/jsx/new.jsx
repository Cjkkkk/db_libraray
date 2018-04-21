import React from 'react'
import api from '../../static/js/fetch_api.js'
class New extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
			book_no:"",
		 	category:"",
			book_name:"",
			press: "",
			year:"",
			author:"",
			price:"",
			stock:""
			}
	  	this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.file_upload = this.file_upload.bind(this)
    }
	file_upload(event) {
		var file_uploader = document.getElementById('book_file')
		var data = new FormData()
		data.append('book_file',file_uploader.files[0])
		api.load_file(data).then((result)=>{
			if(result != 1){
				if(result.status!=0)swal("MESSAGE",result.message,"error")
				else swal("MESSAGE",result.message,"success")
			}
			else{
				swal("MESSAGE","oops","error")
			}
		})
	}
  	handleChange(event) {
		let target = event.target
		let key = target.name
		console.log(target.name,target.value)
		this.setState({[key]: target.value})
  	}
  	handleSubmit(event) {
		api.newBook_Api(this.state).then(result=>{
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
		<div id = "new_container">
        <form className = "new_body">
				<p>New Book</p>
				<label >
					<span>book no</span>
					<input type = "text" value = {this.state.book_no} name = "book_no" placeholder = "input book_no" onChange = {this.handleChange}/>
			 </label>
			 	<br/>
				 <label >
					<span>category</span>
					<input type = "text" value = {this.state.category} name = "category" placeholder = "input category" onChange = {this.handleChange}/>
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
		</form>
		<label>
			<input id = "book_file" type = "file"/>
			<button type = "button" onClick = {this.file_upload}>upload</button>
		</label>
		</div>
      )
    }
  
  }
  


  export default New;
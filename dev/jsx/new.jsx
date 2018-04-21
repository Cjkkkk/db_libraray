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
		<div id = "query_container">
          <form className = "query_body">
				<p>New Book</p>
				<label >
					<span>book_no</span>
					<input type = "text" value = {this.state.book_no} name = "book_no"  onChange = {this.handleChange}/>
			 	</label>
				 <label >
					<span>category</span>
					<input type = "text" value = {this.state.category} name = "category"  onChange = {this.handleChange}/>
			 	</label>
				 <br/>
  				<label >
					<span>name</span>
					<input type = "text" value = {this.state.book_name} name = "book_name"  onChange = {this.handleChange}/>
				 </label>
				 
			 	<label >
			 	<span>Press</span>
			 	<input type = "text" value = {this.state.press} name = "press"  onChange = {this.handleChange}/>
			</label> 
			<br/>
			<label>
			<span>author</span>
			<input type = "text" value = {this.state.author} name = "author"  onChange = {this.handleChange}/>
			</label>
			<label>
			<span>year</span>
			<input type = "text" value = {this.state.year} name = "year"  onChange = {this.handleChange}/>
			</label>
			<br/>
			<label>
			<span>Price</span>
			<input type = "text" value = {this.state.price} name = "price"  onChange = {this.handleChange}/>
			</label>
			<label>
			<span>stock</span>
			<input type = "text" value = {this.state.stock} name = "stock"  onChange = {this.handleChange}/>
			</label>
			<br/>
			<label>
			<button type = "button" onClick = {this.handleSubmit}>create</button>
			</label>
		</form>
			<label id="file_uploader">
			<input id = "book_file" type = "file"/>
			</label>
			<button type = "button" onClick = {this.file_upload}>upload</button>
		</div>
      )
    }
  
  }
  


  export default New;
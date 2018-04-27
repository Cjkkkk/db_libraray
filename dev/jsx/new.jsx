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
		if(this.state.book_no == ""||this.state.category==""||this.state.book_name==""
		||this.state.press ==""||this.state.year ==""||this.state.author==""||this.state.price==""||this.state.stock==""){
			swal("MESSAGE","有信息没有填写完整","error")
		}else{
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
  	}
    render() {
      return (
		<div id = "query_container">
          <form className = "query_body">
				<p>书籍入库</p>
				<label >
					<span>书籍编号</span>
					<input type = "text" value = {this.state.book_no} name = "book_no"  onChange = {this.handleChange}/>
			 	</label>
				 <label >
					<span>分类</span>
					<input type = "text" value = {this.state.category} name = "category"  onChange = {this.handleChange}/>
			 	</label>
				 <br/>
  				<label >
					<span>书籍名称</span>
					<input type = "text" value = {this.state.book_name} name = "book_name"  onChange = {this.handleChange}/>
				 </label>
				 
			 	<label >
			 	<span>出版社</span>
			 	<input type = "text" value = {this.state.press} name = "press"  onChange = {this.handleChange}/>
			</label> 
			<br/>
			<label>
			<span>作者</span>
			<input type = "text" value = {this.state.author} name = "author"  onChange = {this.handleChange}/>
			</label>
			<label>
			<span>年份</span>
			<input type = "text" value = {this.state.year} name = "year"  onChange = {this.handleChange}/>
			</label>
			<br/>
			<label>
			<span>价格</span>
			<input type = "text" value = {this.state.price} name = "price"  onChange = {this.handleChange}/>
			</label>
			<label>
			<span>库存</span>
			<input type = "text" value = {this.state.stock} name = "stock"  onChange = {this.handleChange}/>
			</label>
			<br/>
			<label>
			<button type = "button" onClick = {this.handleSubmit}>创建</button>
			</label>
		</form>
		<div id ="file-upload">
			<input id = "book_file" type = "file"/>
			<button type = "button" onClick = {this.file_upload}>上传</button>
		</div>
		</div>
      )
    }
  
  }
  


  export default New;
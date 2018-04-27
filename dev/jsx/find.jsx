import React from 'react'
import api from '../../static/js/fetch_api.js'
import Table from './table.jsx'
class Find extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
			book_no:"",
			book_name:"",
			category:"",
			press: "",
			year:{
				upbound:"",
				lowerbound:""
			},
			author:"",
			price:{
				upbound:"",
				lowerbound:""
			},
			stock:{
				upbound:"",
				lowerbound:""
			},
			data:[],
			page:1
		}
	  	this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.sort = this.sort.bind(this)
		this.changePage = this.changePage.bind(this)
		api.getBook_Api(this.state).then(result=>{
		if(result == 1){
			swal("MESSAGE",'出现未知错误',"error")
		}
		else{
			if(result.status != 1 && result.status != 2)this.setState({data:result.data})
		}
	})
    }
	sort(event) {
		var serverId=document.getElementById('select_sort_standard').value
		console.log(serverId)
		this.state.data.sort(function(a, b){
			var keyA = a[serverId]
			var keyB = b[serverId]
			// Compare the 2 dates
			if(keyA < keyB) return 1
			if(keyA > keyB) return -1
			return 0
		})
		this.setState({data:this.state.data})
		console.log("sort:",this.state.data)
	}
	changePage(event) {
		let action = event.target.name
		if(action == "+1"){
			if(this.state.data.length > 5 * this.state.page)this.setState({page:this.state.page+1})
		}else{
			if(this.state.page > 1)this.setState({page:this.state.page-1})
		}
	}
  	handleChange(event) {
		let target = event.target
		let key = target.name
		if(key.match(/\./)){
			key = key.split('.')
			var statecopy = Object.assign({} ,this.state)
			statecopy[key[0]][key[1]] = target.value
			this.setState(statecopy)
			console.log(this.state[key[0]])		
		}else{
			this.setState({[key]: target.value})
			console.log(this.state[key])
		}
  	}

  	handleSubmit(event) {
		console.log("page",this.state.page)
		api.getBook_Api(this.state).then(result=>{
			if(result == 1){
				swal("MESSAGE",'出现未知错误',"error")
			}
			else{
				if(result.status == 1 || result.status == 2)swal("MESSAGE",`${result.message}`,"error")
				else{
					this.setState({data:result.data})
				}
			}
		})
  	}
    render() {
      return (
		<div id = "query_container">
          <form className = "query_body">
				<p>查找书籍</p>
				<label>
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
			<label className = "range">
			<span>年份</span>
			<input type = "text" value = {this.state.year.lowerbound} name = "year.lowerbound"  onChange = {this.handleChange}/>
			-
			<input type = "text" value = {this.state.year.upbound} name = "year.upbound"  onChange = {this.handleChange}/>
			</label>
			<br/>
			<label className = "range">
			<span>价格</span>
			<input type = "text" value = {this.state.price.lowerbound} name = "price.lowerbound"  onChange = {this.handleChange}/>
			-
			<input type = "text" value = {this.state.price.upbound} name = "price.upbound"  onChange = {this.handleChange}/>
			</label>
			<label className = "range">
			<span>库存</span>
			<input type = "text" value = {this.state.stock.lowerbound} name = "stock.lowerbound"  onChange = {this.handleChange}/>
			-
			<input type = "text" value = {this.state.stock.upbound} name = "stock.upbound"  onChange = {this.handleChange}/>
			</label>
			<br/>
			<label className = "range">
			<button type = "button" onClick = {this.handleSubmit}>查找</button>
			</label>
			<label className = "range">
			<select id = "select_sort_standard" onChange = {this.sort}>
  				<option value="book_no" >书籍编号</option>
  				<option value="category">分类</option>
  				<option value="book_name" selected = "selected">书籍名称</option>
  				<option value="press">出版社</option>
				<option value="author">作者</option>
				<option value="year">年份</option>
				<option value="price">价格</option>
				<option value="stock">库存</option>
			</select>
			</label>
		</form>
			<Table data = {this.state.data.slice(5*(this.state.page-1),5*this.state.page)}/>
			<div className = "page-split">
				<button onClick = {this.changePage} name = "-1">{"<<"}</button>
				<span>{this.state.page}</span>
				<button onClick = {this.changePage} name = "+1">{">>"}</button>
			</div>
		</div>
      )
    }
  
  }
  export default Find;
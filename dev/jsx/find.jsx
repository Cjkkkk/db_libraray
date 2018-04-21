import React from 'react'
import api from '../../static/js/fetch_api.js'
function Table(props){
	console.log(props)
	return(
		<table>
			<thead>
				<tr>
					<th>book no</th>
					<th>category</th>
					<th>book_name</th>
					<th>press</th>
					<th>year</th>
					<th>author</th>
					<th>price</th>
					<th>stock</th>
				</tr>
			</thead>
		<tbody>{props.data.map((message) => <Tr key={message.book_no} tr={message} />)}</tbody>
		</table>
	)
}


function Tr(props){
	var tr = []
	for(var field in props.tr){
		tr.push(props.tr[field])
	}
	return(<tr>{tr.map((content,index) => <td key={index}>{content} </td>)}</tr>)
}
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
			if(keyA < keyB) return -1
			if(keyA > keyB) return 1
			return 0
		})
		this.setState({data:this.state.data})
		console.log("sort:",this.state.data)
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
			console.log("page",this.state.page)
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
				<p>Find Book</p>
				<label >
					<span>no</span>
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
			<label className = "range">
			<span>year</span>
			<input type = "text" value = {this.state.year.lowerbound} name = "year.lowerbound"  onChange = {this.handleChange}/>
			-
			<input type = "text" value = {this.state.year.upbound} name = "year.upbound"  onChange = {this.handleChange}/>
			</label>
			<br/>
			<label className = "range">
			<span>Price</span>
			<input type = "text" value = {this.state.price.lowerbound} name = "price.lowerbound"  onChange = {this.handleChange}/>
			-
			<input type = "text" value = {this.state.price.upbound} name = "price.upbound"  onChange = {this.handleChange}/>
			</label>
			<label className = "range">
			<span>stock</span>
			<input type = "text" value = {this.state.stock.lowerbound} name = "stock.lowerbound"  onChange = {this.handleChange}/>
			-
			<input type = "text" value = {this.state.stock.upbound} name = "stock.upbound"  onChange = {this.handleChange}/>
			</label>
			<br/>
			<label className = "range">
			<button type = "button" onClick = {this.handleSubmit}>find</button>
			</label>
			<label className = "range">
			<select id = "select_sort_standard" onChange = {this.sort}>
  				<option value="book_no" selected = "selected">book_no</option>
  				<option value="category">category</option>
  				<option value="book_name">book_name</option>
  				<option value="press">press</option>
				<option value="author">author</option>
				<option value="year">year</option>
				<option value="price">price</option>
				<option value="stock">stock</option>
			</select>
			</label>
		</form>
			<Table data = {this.state.data}/>
		{/* <div><span>+</span><span>{this.state.page}</span><span>-</span></div> */}
		</div>
      )
    }
  
  }
  export default Find;
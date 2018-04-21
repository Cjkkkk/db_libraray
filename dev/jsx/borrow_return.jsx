import React from 'react'
import api from '../../static/js/fetch_api.js'
import Table from './table.jsx'

class Borrow_return extends React.Component {
    constructor(props) {
      	super(props)
      	this.state = {
			cno :"",
			borrow_book_no:"",
			return_book_no:"",
			data:[]
		}
	  	this.handleChange = this.handleChange.bind(this)
	  	this.handleSubmit = this.handleSubmit.bind(this)
		this.handleBorrow = this.handleBorrow.bind(this)
		this.handleReturn = this.handleReturn.bind(this)
    }
  	handleChange(event) {
		let target = event.target
		let key = target.name
		console.log(target.name,target.value)
		this.setState({[key]: target.value})
  	}
	handleBorrow(event){
		api.borrow_book(Object.assign({},{cno:this.state.cno,borrow_book_no:this.state.borrow_book_no}))
		.then(result=>{
			if(result == 1)swal("Message","出现未知错误qaq","error")
			else{
				if(result.status == 0)swal("Message",result.message,"success")
				else{
					swal("Message",result.message,"error")
				}
			}
		})
	}
	handleReturn(event){
		api.return_book(Object.assign({},{cno:this.state.cno,return_book_no:this.state.return_book_no}))
		.then(result=>{
			if(result == 1)swal("Message","出现未知错误qaq","error")
			else{
				if(result.status == 0)swal("Message",result.message,"success")
				else{
					swal("Message",result.message,"error")
				}
			}
		})
	}
  	handleSubmit(event) {
		api.query_user(Object.assign({},{cno:this.state.cno}))
		.then(result=>{
		console.log(this.state)
		if(result == 1){
			swal("MESSAGE",'出现未知错误',"error")
		}
		else{
			if(result.status == 1 || result.status == 2)swal("MESSAGE",`${result.message}`,"error")
			else{
				console.log(result)
				this.setState({data:result.message})
			}
		}
	})
	}
    render() {
      return (
			<div id = "borrow_return_container">
           <form className = "borrow_return_body">
				<p>query user</p>
				<label>
					<span>card number</span>
					<input type = "text" value = {this.state.cno} name = "cno"  onChange = {this.handleChange}/>
			 	</label>
				 <button type = "button" onClick = {this.handleSubmit}>query</button>
				 <br/>
				 <label>
					<span>borrow book</span>
					<input type = "text" value = {this.state.borrow_book_no} name = "borrow_book_no"  onChange = {this.handleChange}/>
			 	</label>
				 <button type = "button" onClick = {this.handleBorrow}>borrow</button>
				 <br/>
				 <label>
					<span>return book</span>
					<input type = "text" value = {this.state.return_book_no} name = "return_book_no"  onChange = {this.handleChange}/>
			 	</label>
				 <button type = "button" onClick = {this.handleReturn}>return</button>
				 <Table data = {this.state.data}/>
		</form>
		</div>
      )
    }
  
  }
  


  export default Borrow_return
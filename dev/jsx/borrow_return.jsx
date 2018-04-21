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
class Borrow_return extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
				cno :"",
				data:[]}
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
			console.log("this is data:",this.state.cno)
			api.query_user(this.state.cno).then(result=>{
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
			<div id = "borrow_return_container">
           <form className = "borrow_return_body">
				<p>query user</p>
				<label>
					<span>user_id</span>
					<input type = "text" value = {this.state.cno} name = "cno"  onChange = {this.handleChange}/>
			 	</label>
				 <button type = "button" onClick = {this.handleSubmit}>query</button>
				 <Table data = {this.state.data}/>
		</form>
		</div>
      )
    }
  
  }
  


  export default Borrow_return
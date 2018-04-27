import React from 'react'
import api from '../../static/js/fetch_api.js'
class Delete extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        cno : "",
        user_name:"",
        depart_name:"",
        class:""
    }
	  	this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleadd = this.handleadd.bind(this)
    }
    handleadd(event) {
    if(this.state.cno == "" || this.state.user_name == "" || this.state.depart_name == ""||this.state.class ==""){
      swal("MESSAGE","有信息没有填写完整","error")
    }
    else if(this.state.class != 'T' || this.state.class != 'S'){
      swal("MESSAGE","种类必须是S或者T","error")
    }else{
      api.add_card(this.state).then(result=>{
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
  	handleChange(event) {
		let target = event.target
		let key = target.name
		console.log(target.name,target.value)
		this.setState({[key]: target.value})
  	}
  	handleSubmit(event) {
    if(this.state.cno == ""){
      swal("MESSAGE","有信息没有填写完整","error")
    }else{
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
  	}
    render() {
      return (
        <div id = "delete_container">
          <form className = "delete_body">
          <p>删除借书证</p>
          <label><span>卡号</span>
          <input type = "text" value = {this.state.cno} name = "cno" onChange = {this.handleChange}/>
          </label>
          <br/>
          <label>
          <button type="button" onClick = {this.handleSubmit}>删除</button>
          </label> 
          <br/>
          <p>新建借书证</p>
          <label><span>用户名</span>
          <input type = "text" value = {this.state.username} name = "user_name" onChange = {this.handleChange}/>
          </label>
          <br/>
          <label><span>部门</span>
          <input type = "text" value = {this.state.depart_name} name = "depart_name" onChange = {this.handleChange}/>
          </label>
          <br/>
          <label><span>种类</span>
          <input type = "text" value = {this.state.class} name = "class" onChange = {this.handleChange}/>
          </label>
          <br/>
          <label>          
          <button type="button" onClick = {this.handleadd}>建立</button>
          </label>   
          </form>
        </div>
      )
    }
  
  }
  


  export default Delete;
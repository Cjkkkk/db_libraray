import React from 'react'
import {render} from 'react-dom'
import Login from './login.jsx'
import Find from './find.jsx'
import New from './new.jsx'
import Borrow_return from './borrow_return.jsx'
import Delete from './delete.jsx'
import { Switch, Route ,BrowserRouter,Link} from 'react-router-dom'
import api from '../../static/js/fetch_api.js'
import pop from '../../static/js/pop_login.js'
class App extends React.Component {
  constructor(props){
	super(props)
	this.fade = this.fade.bind(this)
  }
  fade(event){ 
	  var form = document.getElementById('form_container')
	  var shadow = document.getElementById('shadow')
	  shadow.style['z-index'] = -1;
	  shadow.style['opacity'] = 0;
	  form.style['display']= 'none'
  }
  render() {
    return (
	<div className = "container">
	<div id = "shadow" onClick = {this.fade}></div>
      <Header/>
      <Body/>
      <Sidebar/>
	  <Login/>
	  </div>
    )
  }
}

class Body extends React.Component {
  render(){
    return(
      <div id = "body">
		  <Switch>
      			<Route exact path='/' component={Find}/>
      			<Route exact path='/new' component={New}/>
      			<Route exact path='/borrow_return' component={Borrow_return}/>
				<Route exact path='/delete_card' component={Delete}/>
    	</Switch>
        </div>
    )
  }
}
class Sidebar extends React.Component {
  render () {
    return (
    <div id = "sidebar">
	<li><Link to='/'>find book</Link></li>
    <li><Link to='/new'>new book</Link></li>
    <li><Link to='/borrow_return'>borrow & return</Link></li>
    <li><Link to='/delete_card'>delete card</Link></li>
    </div>
    )
  }
}
class Header extends React.Component {
  constructor(props){
	super(props)
	this.toggle = this.toggle.bind(this)
  this.login = this.login.bind(this)
  this.logout = this.logout.bind(this)
	this.state = {
    show : 1,
    name :"logout"
  }
  api.status_Api().then((result)=>{
	if(result == 1)return
    else if(result.status == 1 || result.status == 2){
      var form = document.getElementById('form_container')
      var shadow = document.getElementById('shadow')
      form.style['display'] = 'block'
      shadow.style['z-index'] = 1
      shadow.style['opacity'] = 0.7
    }else{
		swal("WELCOME",`欢迎回来${result.name}~`,"success")
    	this.state.name = result.name
    	var logout = document.getElementById('logout')
    	logout.innerHTML = `logout:${this.state.name}`
	}
  })
  }
  toggle(event){
	  var sidebar = document.getElementById('sidebar')
	  var body = document.getElementById('body')
	  this.state.show = 1 - this.state.show
	  if(this.state.show == 0){
		sidebar.style['grid-column'] = -1;
		body.style['grid-column'] = '1/3';
	  }else{
		sidebar.style['grid-column'] = 1;
		body.style['grid-column'] = 2;
	  }
	  event.preventDefault()
  }

	login(event){
		pop.pop_login()
		event.preventDefault()
	}
	logout(event){
		api.logout_Api().then((result)=>{
			if(result == 1)return
			else{
				swal("MESSAGE",`${this.state.name} 已经成功注销`,"success")
				this.state.name = 'logout'
    			var logout = document.getElementById('logout')
				logout.innerHTML = `${this.state.name}`
			}
		})
		event.preventDefault()
	}
  render () {
    return (
    <div id="header">
	<span onClick = {this.toggle}>T</span>
    <h1>
    Welcome to xxx library!
    </h1>
	<button type = "button" onClick = {this.login}>login</button>
	<button type = "button" onClick = {this.logout} id ="logout">{this.state.name}</button>
     </div>
    )
  }
}

render((
	<BrowserRouter>
    <App />
  </BrowserRouter>
  ), document.getElementById('app'))
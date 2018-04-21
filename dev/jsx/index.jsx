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
	constructor(){
		super()
		this.change_color = this.change_color.bind(this)
		}
		change_color(event){
			
		}
  render () {
    return (
    <div id = "sidebar">
		<li id="find_book" onClick = {this.change_color}><Link to='/'>find book</Link></li>
    <li id="new_book" onClick = {this.change_color}><Link to='/new'>new book</Link></li>
    <li id="borrow_book" onClick = {this.change_color}><Link to='/borrow_return'>borrow & return</Link></li>
    <li id="delete_card" onClick = {this.change_color}><Link to='/delete_card'>delete card</Link></li>
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
    	var logout = document.getElementById('logout')
    	logout.innerHTML = `logout:${result.name}`
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
		var logout = document.getElementById('logout')
		if(logout.innerHTML == 'logout')swal("MESSAGE",`你还未登录`,"error")
		else{
			api.logout_Api().then((result)=>{
				if(result == 1)return
				else{
					var name = logout.innerHTML.slice(7,)
					swal("MESSAGE",`${name}已经成功注销`,"success")
					logout.innerHTML ='logout'
				}
			})
			event.preventDefault()
		}
	}
  render () {
    return (
    <div id="header">
	<span onClick = {this.toggle}>T</span>
    <h1>
    Welcome to xxx library!
    </h1>
	<button type = "button" onClick = {this.login}>login</button>
	<button type = "button" onClick = {this.logout} id ="logout">logout</button>
     </div>
    )
  }
}

render((
	<BrowserRouter>
    <App />
  </BrowserRouter>
  ), document.getElementById('app'))
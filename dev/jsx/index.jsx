import React from 'react'
import {render} from 'react-dom'
import Login from './login.jsx'
import Find from './find.jsx'
import New from './new.jsx'
import Borrow_return from './borrow_return.jsx'
import Delete from './delete.jsx'
import { Switch, Route ,BrowserRouter,Link} from 'react-router-dom'

// const fetch_api = require('./fetch_api')
const get_all_book = async(stu_id)=>{
  var myHeaders = new Headers();
  var obj = {
	  stuid:3160104210
	}
//   var myInit = { method: 'POST',
//                headers: myHeaders,
//                cache: 'default',
//                body:JSON.stringify(obj)
//               };

var myInit = { method: 'GET',
headers: myHeaders,
cache: 'default'
};

  var result = fetch("/api/v1/book/get_all_book?stuid=3160104210",myInit)
  console.log(result)
}

class App extends React.Component {
  constructor(props){
	super(props)
	this.fade = this.fade.bind(this)
    //get_all_book(3160104210)
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
	//   <div className = "container" id = "shadow">
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
	this.state = {
		show : 1,
		// login : 0
	}
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

  }

  login(event){
	var form = document.getElementById('form_container')
	var shadow = document.getElementById('shadow')
	form.style['display'] = 'block'
	shadow.style['z-index'] = 1
	shadow.style['opacity'] = 0.7


}
  render () {
    return (
    <div id="header">
    <h1>
    Welcome to xxx library!
    </h1>
    <button type = "button" onClick = {this.toggle}>toggle</button>
	<button type = "button" onClick = {this.login}>login</button>
     </div>
    )
  }
}

render((
	<BrowserRouter>
    <App />
  </BrowserRouter>
  ), document.getElementById('app'))
// render(<App name = "kk"/>, document.getElementById('app'))
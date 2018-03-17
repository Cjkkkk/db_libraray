import React from 'react'
import {render} from 'react-dom'
const fetch_api = require('./fetch_api')
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
    get_all_book(3160104210)
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

class Header extends React.Component {
  render () {
    return <h1>i am header </h1>
  }
}
//render(<Header/>, document.getElementById('header'));
render(<App name = "kk"/>, document.getElementById('app'))
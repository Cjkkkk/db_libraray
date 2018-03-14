import React from 'react'
import {render} from 'react-dom'
import AwesomeComponent from './AwesomeComponent.jsx'
import LoginComponent from './loginComponent.jsx'
// class App extends React.Component {
//   render () {
//     return <p> Hello React!</p>;
//   }
// }

// render(<App/>, document.getElementById('app'));

class App extends React.Component {
  render() {
    return (
        <div>
          <p> Hello React!</p>
          <AwesomeComponent />
          <LoginComponent />
        </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
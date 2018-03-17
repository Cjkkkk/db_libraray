import React from 'react';

class Library extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
		username : "",
      	password: ""}
    }

 
    render() {
      return (
		<div className = "header">
            <ul>
                <li>3</li>
                <li>4</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
            </ul>
            {this.props.children}
		</div>
      )
    }
  
	}
	export default Library;
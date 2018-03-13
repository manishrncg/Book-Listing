import React from 'react';
import BookStore from './BookStore';
import Login from './Login';
import { getCookie } from '../../utils.js';


class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isLoggedIn : false
		}
		this.handleLogin = this.handleLogin.bind(this);
	}

	componentWillMount(){
		this.handleLogin();
	}

	handleLogin(){
		const isLoggedIn = getCookie('username') || false;
		this.setState({
			isLoggedIn : isLoggedIn
		})
	}

	render(){
		return(
			<div>
			{ this.state.isLoggedIn ? <BookStore/> : <Login history={this.props.history} handleLogin={this.handleLogin}/> }
			</div>
		)
	}
}

export default App;
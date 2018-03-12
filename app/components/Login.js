import React from 'react';
import axios from 'axios';
import {apiEndPoint} from '../../config/config';

class Login extends React.Component {

  setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  onSubmit(e){
    e.preventDefault();
    let username = this.user_name.value;
    let validate =  this.validateName(username);
    if(!validate){
      return false;
    }
    this.setCookie('username', username, 1);
    var self = this;

    axios.post(apiEndPoint+'/add-user', {
      username: username
    })
    .then(function (response) {
      self.props.history.push(`/welcome/${username}`);
    })
    .catch(function (error) {
    });
  }

  validateName(name){
    if(name.trim() == ""){
      alert('User name cannot be empty!');
      return false;
    }
    else{
      return true;
    }
  }

  render(){
    return (<div>
          <h1 className="text-center">Login page</h1>
          <p>Enter username</p>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <input type="text" ref={(input)=> { this.user_name = input }}/>
            <br />
	         <input type="submit" />
          </form> 
	      </div>);
  }
}

export default Login;
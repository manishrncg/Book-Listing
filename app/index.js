import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import App from './components/App'
import Login from './components/Login';

class BookReviewPanel extends React.Component {

  render(){
    return (
      <BrowserRouter>
       <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/welcome/:username' component={App}/>
      </Switch>
      </BrowserRouter>);
      }
}

// ========================================

ReactDOM.render(
  <BookReviewPanel />,
  document.getElementById('container')
);
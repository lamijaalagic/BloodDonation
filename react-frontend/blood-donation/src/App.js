import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import LoginComponent from './Login/LoginComponent';
import HomePageComponent from './HomePage/HomePageComponent';
import AdminComponent from './Navigation/AdminComponent';
import UserComponent from './Navigation/UserComponent';
import EmployeeComponent from './Navigation/EmployeeComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePageComponent}/> 
          <Route path="/login" exact component={LoginComponent}/>
          <Route path="/admin" exact component={AdminComponent}/>
          <Route path="/user" exact component={UserComponent}/>
          <Route path="/employee" exact component={EmployeeComponent}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;

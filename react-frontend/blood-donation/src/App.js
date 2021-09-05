import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import LoginComponent from './Login/LoginComponent';
import HomePageComponent from './HomePage/HomePageComponent';
import AdminComponent from './Navigation/AdminComponent';
import UserComponent from './Navigation/UserComponent';
import EmployeeDoctorComponent from './Navigation/EmployeeDoctorComponent';
import EmployeeHospitalManagementComponent from './Navigation/EmployeeHospitalManagementComponent';
import EmployeeMedicalTechnicianComponent from './Navigation/EmployeeMedicalTechnicianComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePageComponent}/> 
          <Route path="/login" exact component={LoginComponent}/>
          <Route path="/admin" exact component={AdminComponent}/>
          <Route path="/user" exact component={UserComponent}/>
          <Route path="/employeeDoctor" exact component={EmployeeDoctorComponent}/>
          <Route path="/employeeHospitalManagement" exact component={EmployeeHospitalManagementComponent}/>
          <Route path="/employeeMedicalTechnician" exact component={EmployeeMedicalTechnicianComponent}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;

import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "./styleNavigation.css"
import DonationTableComponent from "../DonationTable/DonationTableComponent";
import ProfileComponent from "../User/ProfileComponent";
import ProfileList from "../User/ProfileList";
import TransfusionTableComponent from "../TransfusionTable/TransfusionTableComponent";
import EmployeePage from "../UsersPages/EmployeeHospitalManagementPage";

class EmployeeHospitalManagementComponent extends Component {
    render() {
        return ( 
            <Router>
                <div className="home">
                    <EmployeePage/>
                    <Route path="/employeeHospitalManagement/profil" component={ProfileComponent} />
                    <Route path="/employeeHospitalManagement/lista_profila" component={ProfileList} />
                    <Route path="/employeeHospitalManagement/transfuzije_krvi" component={TransfusionTableComponent} />
                    <Route path="/employeeHospitalManagement/tablica_donacija" component={DonationTableComponent} />
                    <a className="odjava" href="/login" >Odjava</a>
                </div>
            </Router>
        )
    }
}
export default EmployeeHospitalManagementComponent
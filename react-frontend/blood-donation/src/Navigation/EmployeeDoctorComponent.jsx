import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "./styleNavigation.css"
import DonationTableComponent from "../DonationTable/DonationTableComponent";
import ProfileComponent from "../User/ProfileComponent";
import ProfileList from "../User/ProfileList";
import TransfusionTableComponent from "../TransfusionTable/TransfusionTableComponent";
import EmployeePage from "../UsersPages/EmployeeDoctorPage"
import AddTransfusion from "../TransfusionTable/AddTransfusion";
import AddDonation from "../DonationTable/AddDonation";
import AddBloodType from "../User/AddBloodType";

class EmployeeDoctorComponent extends Component {
    render() {
        return ( 
            <Router>
                <div className="home">
                    <EmployeePage/>
                    <Route path="/employeeDoctor/profil" component={ProfileComponent} />
                    <Route path="/employeeDoctor/lista_profila" component={ProfileList} />
                    <Route path="/employeeDoctor/transfuzije_krvi" component={TransfusionTableComponent} />
                    <Route path="/employeeDoctor/tablica_donacija" component={DonationTableComponent} />
                    <Route path="/employeeDoctor/dodaj_transfuziju" component={AddTransfusion} />
                    <Route path="/employeeDoctor/dodaj_donaciju" component={AddDonation} />
                    <a className="odjava" href="/login" >Odjava</a>
                </div>
            </Router>
        )
    }
}
export default EmployeeDoctorComponent
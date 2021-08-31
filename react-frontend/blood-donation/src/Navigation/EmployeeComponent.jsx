import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "./styleNavigation.css"
import DonationTableComponent from "../DonationTable/DonationTableComponent";
import ProfileComponent from "../User/ProfileComponent";
import ProfileList from "../User/ProfileList";
import TransfusionTableComponent from "../TransfusionTable/TransfusionTableComponent";
import EmployeePage from "../UsersPages/EmployeePage"
import AddTransfusion from "../TransfusionTable/AddTransfusion";
import AddDonation from "../DonationTable/AddDonation";
import AddBloodType from "../User/AddBloodType";

class EmployeeComponent extends Component {
    render() {
        return ( 
            <Router>
                <div className="home">
                    <EmployeePage/>
                    <Route path="/employee/profil" component={ProfileComponent} />
                    <Route path="/employee/lista_profila" component={ProfileList} />
                    <Route path="/employee/transfuzije_krvi" component={TransfusionTableComponent} />
                    <Route path="/employee/tablica_donacija" component={DonationTableComponent} />
                    <Route path="/employee/dodaj_transfuziju" component={AddTransfusion} />
                    <Route path="/employee/dodaj_donaciju" component={AddDonation} />
                    <Route path="/employee/dodaj_grupu" component={AddBloodType} />
                    <a className="odjavaLink" href="/">Odjava</a>
                </div>
            </Router>
        )
    }
}
export default EmployeeComponent
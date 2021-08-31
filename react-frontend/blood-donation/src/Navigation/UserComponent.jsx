import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "./styleNavigation.css"
import DonationTableComponent from "../DonationTable/DonationTableComponent";
import ProfileComponent from "../User/ProfileComponent";
import TransfusionTableComponent from "../TransfusionTable/TransfusionTableComponent";
import UserPage from "../UsersPages/UserPage"

class UserComponent extends Component {
    render() {
        return ( 
            <Router>
                <div className="home">
                   <UserPage/>
                    <Route path="/user/profil" component={ProfileComponent} />
                    <Route path="/user/transfuzije_krvi" component={TransfusionTableComponent} />
                    <Route path="/user/tablica_donacija" component={DonationTableComponent} />
                    <a className="odjavaLink" href="/">Odjava</a>
                </div>
            </Router>
        )
    }
}
export default UserComponent
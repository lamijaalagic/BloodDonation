import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "./styleNavigation.css"
import DonationTableComponent from "../DonationTable/DonationTableComponent";
import ProfileComponent from "../User/ProfileComponent";
import ProfileList from "../User/ProfileList";
import TransfusionTableComponent from "../TransfusionTable/TransfusionTableComponent"
import AdminPage from "../UsersPages/AdminPage";
import AddUser from "../User/AddUser";
import AddDonation from "../DonationTable/AddDonation";
import AddTransfusion from "../TransfusionTable/AddTransfusion";
import AddRole from "../User/AddRole"
import AddBloodType from "../User/AddBloodType";



class AdminComponent extends Component {

    /*state = { DODAJtransfuziju:"bhxjnko"}
    promijeniTransfuziju = (transfuzija) => {
        this.setState({DODAJtransfuziju:transfuzija})
    }*/


    render() {
        return ( 
            <Router>
                <div className="home">
                    <AdminPage/>
                    <Route path="/admin/profil" component={ProfileComponent} />
                    <Route path="/admin/lista_profila" component={ProfileList} />
                    <Route path="/admin/kreiraj_profil" component={AddUser}/>
                    <Route path="/admin/transfuzije_krvi" component={TransfusionTableComponent } />
                    <Route path="/admin/dodaj_transfuziju" component={AddTransfusion} />
                    <Route path="/admin/tablica_donacija" component={DonationTableComponent} />
                    <Route path="/admin/dodaj_donaciju" component={AddDonation} />
                    <Route path="/admin/dodaj_rolu" component={AddRole} />
                    <Route path="/admin/dodaj_grupu" component={AddBloodType} />
                    
                    <a className="odjava" href="/login" >Odjava</a>
                </div>
            </Router>
        )
    }
}
export default AdminComponent
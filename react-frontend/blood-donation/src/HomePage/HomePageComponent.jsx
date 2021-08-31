import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./HomePage.css";
import crvena_kap from '../crvena_kap.png';
import LoginComponent from '../Login/LoginComponent';


class HomePageComponent extends Component {

    constructor(props) {
        super(props)
        this.state={
            content:''
        }
        this.changeContent = this.changeContent.bind(this)
    }

    changeContent (event) {
        
    }


    render() {
        return (
            <div className="frame">
                <div className="header">
                    <p>Federalna bolnica +387 33 123 456</p>
                    <h1>Doniranje krvi u Bosni i Hercegovini</h1>
                </div>
                <div className="frameRow">
                <div className="lijevi">
                    <button className="ListaButtona" onClick={this.changeContent("Tablica krvnih grupa")}>Tablica krvnih grupa</button>
                    
                    <button className="ListaButtona" onClick={this.changeContent("Zašto darovati krv?")}>Zašto darovati krv?</button>
                    
                    <button className="ListaButtona" onClick={this.changeContent("Kontakt informacije, gdje i kada?")}>Kontakt informacije, gdje i kada?</button>
                    
                    <button className="ListaButtona" onClick={this.changeContent("Koliko često je moguće darovati krv?")}>Koliko često je moguće darovati krv?</button>
                    
                    <button className="ListaButtona" onClick={this.changeContent("Česta pitanja o darivanju krvi")}>Česta pitanja o darivanju krvi</button>
                </div>
                <div className="sredina">
                    <label>Spasimo živote zajedno, donirajte krv.</label>
                    <p>Potrebno dodati neki tekst za sve lijevo navedene tabove</p>
                    {this.state.content}
                </div>
                <div className="desni">
                <br/>
                    <label>Prijavite se na sistem za donaciju krvi.</label>
                    
                    <button className="Login"> <Link className="openLogin" to="/login">Login</Link></button>
                    <br></br>
                    <img src={crvena_kap} alt="Crvena kap"/>
                </div>
                </div>
            </div>
        )
    }
}
export default HomePageComponent
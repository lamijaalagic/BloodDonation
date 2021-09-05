import React, {Component} from 'react'
import { Link } from "react-router-dom"
import "./stylePages.css"

class EmployeeMedicalTechnician extends Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <Link to="/employeeMedicalTechnician/profil">
                        <li>Moj profil</li>
                    </Link>
                    <Link to="/employeeMedicalTechnician/transfuzije_krvi">
                        <li>Pregled potrebnih transfuzija krvi</li>
                    </Link>
                    <Link to="/employeeMedicalTechnician/tablica_donacija">
                        <li>Tabelarni pregled donacija</li>
                    </Link>
                </ul>
                <ul>
                    <Link className="linkovi"  to="/employeeMedicalTechnician/dodaj_transfuziju">
                        <li>Dodaj novu potrebnu transfuziju</li>
                    </Link>
                    <Link className="linkovi"  to="/employeeMedicalTechnician/dodaj_grupu">
                        <li>Dodaj krvnu grupu</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}
export default EmployeeMedicalTechnician
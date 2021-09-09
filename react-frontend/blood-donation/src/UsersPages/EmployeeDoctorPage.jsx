import React, {Component} from 'react'
import { Link } from "react-router-dom"
import "./stylePages.css"

class EmployeeDoctorPage extends Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <Link to="/employeeDoctor/profil">
                        <li>Moj profil</li>
                    </Link>
                    <Link to="/employeeDoctor/lista_profila">
                        <li>Pregled korisnika</li>
                    </Link>
                    <Link to="/employeeDoctor/transfuzije_krvi">
                        <li>Pregled potrebnih transfuzija krvi</li>
                    </Link>
                    <Link to="/employeeDoctor/tablica_donacija">
                        <li>Tabelarni pregled donacija</li>
                    </Link>
                </ul>
                <ul>
                    <Link className="linkovi"  to="/employeeDoctor/dodaj_transfuziju">
                        <li>Dodaj novu potrebnu transfuziju</li>
                    </Link>
                    <Link className="linkovi"  className="linkovi" to="/employeeDoctor/dodaj_donaciju">
                        <li>Dodaj donaciju</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}
export default EmployeeDoctorPage
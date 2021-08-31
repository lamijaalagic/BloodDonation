import React, {Component} from 'react'
import { Link } from "react-router-dom"
import "./stylePages.css"

class EmployeePage extends Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <Link to="/employee/profil">
                        <li>Moj profil</li>
                    </Link>
                    <Link to="/employee/lista_profila">
                        <li>Pregled korisnika</li>
                    </Link>
                    <Link to="/employee/transfuzije_krvi">
                        <li>Pregled transfuzija krvi</li>
                    </Link>
                    <Link to="/employee/tablica_donacija">
                        <li>Tabelarni pregled donacija</li>
                    </Link>
                </ul>
                <ul>
                    <Link className="linkovi"  to="/employee/dodaj_transfuziju">
                        <li>Dodaj transfuziju</li>
                    </Link>
                    <Link className="linkovi"  className="linkovi" to="/employee/dodaj_donaciju">
                        <li>Dodaj donaciju</li>
                    </Link>
                    <Link className="linkovi"  to="/employee/dodaj_grupu">
                        <li>Dodaj grupu</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}
export default EmployeePage
import React, {Component} from 'react'
import { Link } from "react-router-dom"
import "./stylePages.css"

class AdminPage extends Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <Link to="/admin/profil">
                        <li>Moj profil</li>
                    </Link>
                    <Link to="/admin/lista_profila">
                        <li>Pregled korisnika</li>
                    </Link>
                    <Link  to="/admin/transfuzije_krvi">
                        <li>Pregled transfuzija krvi</li>
                    </Link>
                    <Link  to="/admin/tablica_donacija">
                        <li>Tabelarni pregled donacija</li>
                    </Link>
                </ul>
                <ul>
                    <Link className="linkovi"  to="/admin/kreiraj_profil">
                        <li>Kreiraj novog korisnika</li>
                    </Link>
                    <Link className="linkovi"  to="/admin/dodaj_transfuziju">
                        <li>Dodaj transfuziju</li>
                    </Link>
                    <Link className="linkovi"  className="linkovi" to="/admin/dodaj_donaciju">
                        <li>Dodaj donaciju</li>
                    </Link>
                    <Link className="linkovi"  to="/admin/dodaj_rolu">
                        <li>Dodaj ulogu</li>
                    </Link>
                    <Link className="linkovi"  to="/admin/dodaj_grupu">
                        <li>Dodaj grupu</li>
                    </Link>
            </ul>
            </nav>
        )
    }
}
export default AdminPage
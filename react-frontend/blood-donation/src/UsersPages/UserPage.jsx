import React, {Component} from 'react'
import { Link } from "react-router-dom"
import "./stylePages.css"

class UserPage extends Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <Link to="/user/profil">
                        <li>Moj profil</li>
                    </Link>
                    <Link to="/user/transfuzije_krvi">
                        <li>Pregled transfuzija krvi</li>
                    </Link>
                    <Link to="/user/tablica_donacija">
                        <li>Tabelarni pregled donacija</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}
export default UserPage
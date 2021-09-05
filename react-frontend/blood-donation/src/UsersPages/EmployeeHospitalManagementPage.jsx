import React, {Component} from 'react'
import { Link } from "react-router-dom"
import "./stylePages.css"

class EmployeeHospitalManagementPage extends Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <Link to="/employeeHospitalManagement/profil">
                        <li>Moj profil</li>
                    </Link>
                    <Link to="/employeeHospitalManagement/lista_profila">
                        <li>Pregled korisnika</li>
                    </Link>
                    <Link to="/employeeHospitalManagement/transfuzije_krvi">
                        <li>Pregled potrebnih transfuzija krvi</li>
                    </Link>
                    <Link to="/employeeHospitalManagement/tablica_donacija">
                        <li>Tabelarni pregled donacija</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}
export default EmployeeHospitalManagementPage
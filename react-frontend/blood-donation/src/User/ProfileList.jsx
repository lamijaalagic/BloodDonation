import axios from 'axios';
import React, {Component} from 'react';
import { toast } from 'react-toastify';

class ProfileList extends Component {

    constructor(props) {
        super(props)
        this.state={
            useri:[],
            user:{},
            username:'',
            firstname:'',
            lastname:'',
            birthDate:'',
            typeOfBlood:{},
            residencePlace:'',
            address:'',
            phoneNumber:'',
            gender:'',
            donationNeeded:true,
            email:'',
            role:{},
            blood:'A',
            rhF:true,
            tipKrvi: [
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'AB', label: 'AB'}
            ],
            rh: [
                { value: true, label: '+' },
                { value: false, label: '-' }
            ],
            korisnik:'',
            errorMessage:''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8080/user')
        .then (response=>{
            const useri= response.data;
            this.setState({useri});
            //alert(this.state.transfuzije)
            console.log(this.state.useri)
           
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangeTipKrvi = (selectedOption) => {
        if (selectedOption) {
            this.setState({ blood : selectedOption.target.value });
        }
    }

    handleChangeRh = (selectedOption) => {
        if (selectedOption) {
            this.setState({ rhF: selectedOption.target.value });
        }
    }



    filterByTipKrvi(e) {
        console.log(this.state.blood)
        console.log(this.state.rhF)
        e.preventDefault();
        if (this.state.tipKrvi!='') {
            axios.get('http://localhost:8080/user/bloodType?bloodType='+this.state.blood+"&rhFactor="+this.state.rhF).then(
            response => {
                const useri= response.data;
                this.setState({useri});
                this.render();
            }
            ).catch(err => {
                toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            })
        }
        else this.setState({errorMessage:"Unesite tip krvi po kojem zelite filtrirati."})
    }

    filterByUsername(e) {
        e.preventDefault();
        if (this.state.korisnik!='') {
            axios.get('http://localhost:8080/user/username?username='+this.state.korisnik).then(
            response => {
                const useri=[];
                useri.push(response.data);
                this.setState({useri});
            }
            ).catch(err => {
                toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            })
        }
        else this.setState({errorMessage:"Unesite username po kojem zelite filtrirati."})
    }  
     

    render() {
        return ( 
            <div className="userView">
                <h2>Tabela transfuzija</h2>
                <div>
                    <table>
                        <tr>
                            <th>Ime </th>
                            <th>Prezime</th>
                            <th>Username </th>
                            <th>Datum rođenja</th>
                            <th>Krvna grupa</th>
                            <th>Spol</th>
                            <th>Broj telefona</th>
                            <th>Mjesto prebivališta</th>
                            <th>Adresa </th>
                            <th>Dotrebna donacija</th>
                            <th>Email</th>
                            <th>Uloga</th>
                            
                        </tr>
                        {this.state.useri.map(user => {
                        return(
                        <tr key={user.id}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname} </td>
                            <td>{user.username}</td>
                            <td>{user.birthDate}</td>
                            <td>{user.typeOfBlood.bloodType}{user.typeOfBlood.rhFactor ? '+':'-'}</td>
                            <td>{user.gender}</td>                                
                            <td>{user.phoneNumber}</td>
                            <td>{user.residencePlace}</td>
                            <td>{user.address}</td>
                            <td>{user.donationNeeded ? 'Da':'Ne'}</td>
                            <td>{user.email}</td>
                            <td>{user.role.roleName}</td>
                        </tr>)
})}
                    </table>
                </div>
                <div className="filteri">
                    <select className="selectBox" onChange={(e) => {this.handleChangeTipKrvi(e);}} value={this.state.blood} name="blood">
                        {this.state.tipKrvi.map(tipKrvi => <option key={tipKrvi.value} value={tipKrvi.value}>{tipKrvi.label}</option>)}
                    </select>
                    <select className="selectBox" onChange={(e) => {this.handleChangeRh(e);}} value={this.state.rhF} name="rhF">
                        {this.state.rh.map(rh => <option key={rh.value} value={rh.value}>{rh.label}</option>)}
                    </select> 
                    <button type="submit" onClick={e => this.filterByTipKrvi(e)}>Filtriraj po tipu krvi</button>
                    <br/>
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Username korisnika" name="korisnik" />
                    <button type="submit" onClick={e => this.filterByUsername(e)}>Filtriraj po username-u</button>
                    <br/>
                    <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                </div>
            </div>
        )
    }
}
export default ProfileList
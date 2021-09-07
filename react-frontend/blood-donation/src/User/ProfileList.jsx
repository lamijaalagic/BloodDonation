import axios from 'axios';
import React, {Component} from 'react';
import { toast } from 'react-toastify';
import Moment from 'moment';
import user_grupa from '../user_group.png';
import crvena_kap from '../crvena_kap.png';
import filter from '../find.png';
import promijeni from '../modify.png';


class ProfileList extends Component {

    constructor(props) {
        super(props)
        this.state={
            useri:[],
            useriSVI:[],
            userODABRANI:{},
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
            blood:'',
            rhF:true,
            tipKrvi: [
                {value: '', label: ''},
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'AB', label: 'AB'}, 
                { value: '0', label: '0'}
            ],
            rh: [
                {value: '', label: ''},
                { value: true, label: '+' },
                { value: false, label: '-' }
            ],
            korisnik:'',
            errorMessage:'',
            NOVOlastname:'',
            NOVOpassword:'',
            NOVOresidencePlace:'',
            NOVOaddress:'',
            NOVOphoneNumber:'',
            NOVOdonationNeeded:true,
            NOVOemail:'',
            potrebnaDonacija: [
                { value: true, label: 'Da' },
                { value: false, label: 'Ne' }
            ],
            showMe:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.popUpResponse = this.popUpResponse.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8080/user', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('access_token')
            }
    })
        .then (response=>{
            const useri= response.data;
            this.setState({useri});
            const useriSVI= response.data;
            this.setState({useriSVI});
            //alert(this.state.transfuzije)
            console.log(this.state.useri)
           
        })
    }

    popUpResponse (err, res) {
        
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.value=="") {
            this.setState({useri: this.state.useriSVI});
        }
    }

    handleChangeTipKrvi = (selectedOption) => {
        if (selectedOption) {
            this.setState({ blood : selectedOption.target.value });
        }
        if (selectedOption.target.value=="") {
            this.setState({useri: this.state.useriSVI});
        }
    }

    handleChangeRh = (selectedOption) => {
        if (selectedOption) {
            this.setState({ rhF: selectedOption.target.value });
        }
        if (selectedOption.target.value=="") {
            this.setState({useri: this.state.useriSVI});
        }
    }

    handleChangePotrebnaDonacija = (selectedOption) => {
        if (selectedOption) {
            this.setState({ NOVOdonationNeeded: selectedOption.target.value });
        }
    }

    filterByTipKrvi(e) {
        console.log(this.state.blood)
        console.log(this.state.rhF)
        e.preventDefault();
        if (this.state.tipKrvi!='') {
            axios.get('http://localhost:8080/user/bloodType?bloodType='+this.state.blood+"&rhFactor="+this.state.rhF, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
        }).then(
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
            axios.get('http://localhost:8080/user/username?username='+this.state.korisnik, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
        }).then(
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

    uredi(e,profil) {
        this.setState({userODABRANI:profil});
        this.setState({showMe:true});
    }

    modifikujPodatke(e) {
        e.preventDefault();
        const U=this.state.userODABRANI;
        if (this.state.NOVOlastname=='') this.state.NOVOlastname=this.state.userODABRANI.lastname;
        if (this.state.NOVOpassword=='') this.state.NOVOpassword=this.state.userODABRANI.password;
        if (this.state.NOVOresidencePlace=='') this.state.NOVOresidencePlace=this.state.userODABRANI.residencePlace;
        if (this.state.NOVOaddress=='') this.state.NOVOaddress=this.state.userODABRANI.address;
        if (this.state.NOVOphoneNumber=='') this.state.NOVOphoneNumber=this.state.userODABRANI.phoneNumber;
        if (this.state.NOVOemail=='') this.state.NOVOemail=this.state.userODABRANI.email;
        axios.put('http://localhost:8080/user/'+this.state.userODABRANI.id, {
            typeOfBlood: this.state.userODABRANI.typeOfBlood,
            role: this.state.userODABRANI.role,
            username: this.state.userODABRANI.username,
            password: this.state.NOVOpassword,
            firstname: this.state.userODABRANI.firstname,
            lastname: this.state.NOVOlastname,
            birthDate: this.state.userODABRANI.birthDate,
            email: this.state.NOVOemail,
            residencePlace: this.state.NOVOresidencePlace,
            address: this.state.NOVOaddress,
            phoneNumber:this.state.NOVOphoneNumber,
            gender: this.state.userODABRANI.gender,
            donationNeeded: this.state.NOVOdonationNeeded
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('access_token')
            }
    }).then(response => {
            if (response.status === 200 || response.status === 201) {
                this.props.history.push('/')
                alert('Uspješno izmijenjeni podaci')
            }
        }).catch(err => {
            console.log(err.response.data.message.toString())
            //toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
        })
        this.setState({showMe:false});
        axios.get('http://localhost:8080/user', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('access_token')
            }
    })
        .then (response=>{
            const useri= response.data;
            this.setState({useri});
            const useriSVI= response.data;
            this.setState({useriSVI});
        })
    }
     

    render() {
        return ( 
            <div className="userView">
                <img className="sl" src={user_grupa}/>
                <img className="user_img" src={crvena_kap} alt="Crvena kap"/>
                <h2> Lista korisnika</h2>
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
                            <th>Uredi podatke</th>
                            
                        </tr>
                        {this.state.useri.map(user => {
                        return(
                        <tr key={user.id}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname} </td>
                            <td>{user.username}</td>
                            <td>{Moment(user.birthDate).format('DD-MM-YYYY')}</td>
                            <td>{user.typeOfBlood.bloodType}{user.typeOfBlood.rhFactor ? '+':'-'}</td>
                            <td>{user.gender}</td>                                
                            <td>{user.phoneNumber}</td>
                            <td>{user.residencePlace}</td>
                            <td>{user.address}</td>
                            <td>{user.donationNeeded ? 'Da':'Ne'}</td>
                            <td>{user.email}</td>
                            <td>{user.role.roleName}</td>
                            <td><button className="tabelaButton" onClick={(e) => this.uredi(e,user)}> <img className="icons" src={promijeni}/>Uredi</button></td>
                        </tr>)
})}
                    </table>
                </div>
                <div className="filteri">
                    <label><b><i>Filtriraj podatke u tabeli</i></b></label> 
                    
                    <br/>
                    <select className="selectBox" onChange={(e) => {this.handleChangeTipKrvi(e);}} value={this.state.blood} name="blood">
                        {this.state.tipKrvi.map(tipKrvi => <option key={tipKrvi.value} value={tipKrvi.value}>{tipKrvi.label}</option>)}
                    </select>
                    <select className="selectBox" onChange={(e) => {this.handleChangeRh(e);}} value={this.state.rhF} name="rhF">
                        {this.state.rh.map(rh => <option key={rh.value} value={rh.value}>{rh.label}</option>)}
                    </select> 
                    <button className="loginButton" type="submit" onClick={e => this.filterByTipKrvi(e)}> <img className="icons" src={filter}/>Filtriraj po tipu krvi</button>
                    <br/>
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Username korisnika" name="korisnik" />
                    <button className="loginButton" type="submit" onClick={e => this.filterByUsername(e)}> <img className="icons" src={filter}/>Filtriraj po username-u</button>
                    <br/>
                    <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                </div>
                {this.state.showMe? 
                <div className="popup">
                    <label><b><i>Izmijeni podatke odabranog korisnika</i></b></label> 
                    <br/>
                    <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Prezime" name="NOVOlastname"/>
                    <br/>
                    <input className="loginInput" type="password" onChange={e => this.handleChange(e)} placeholder="Password" name="NOVOpassword" />
                    <br/>
                    <input className="loginInput" type="email" onChange={e => this.handleChange(e)} placeholder="Email" name="NOVOemail" />
                    <br/>
                    <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Mjesto prebivalista" name="NOVOresidencePlace" />
                    <br/>
                    <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Adresa" name="NOVOaddress" />
                    <br/>
                    <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Broj telefona" name="NOVOphoneNumber" />
                    <br/>
                    <label>Korisniku je potrebna donacija krvi</label>
                    <select className="selectBox" onChange={(e) => {this.handleChangePotrebnaDonacija(e);}} value={this.state.NOVOdonationNeeded} name="NOVOdonationNeeded">
                        {this.state.potrebnaDonacija.map(potrebnaDonacija => <option key={potrebnaDonacija.value} value={potrebnaDonacija.value}>{potrebnaDonacija.label}</option>)}
                    </select>
                    <br/>
                    <button className="backButton" onClick={e => {this.setState({showMe:false});}} type="submit"> Nazad</button>
                    <button className="okButton" onClick={e => this.modifikujPodatke(e)} type="submit"> Promijeni podatke</button>
                </div>
                 :null}
            </div>
        )
    }
}
export default ProfileList
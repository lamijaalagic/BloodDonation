import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import dodaj_novi from '../add.png';
import crvena_kap from '../crvena_kap.png';
import filter from '../find.png';
import promijeni from '../modify.png';
import prikazi_detalje from '../show_details.png';
import novi_user from '../user-add-icon.png'


class AddUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username:'',
            password:'',
            firstname:'',
            lastname:'',
            birthDate:'',
            krvneGrupe:[],
            odabranaKrvnaGrupa: {},
            KG:'',
            idOdabraneKB:0,
            residencePlace:'',
            address:'',
            phoneNumber:'',
            gender:'M',
            spol: [
                { value: 'M', label: 'Muško' },
                { value: 'Z', label: 'Žensko' }
            ],
            donationNeeded:true,
            potrebnaDonacija: [
                { value: true, label: 'Da' },
                { value: false, label: 'Ne' }
            ],
            email:'',
            uloga:[],
            role:{},
            errorMessage:''
        }
    }

    validateForm = () => {
        /*const validEmailRegex =
            RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        */
        if (this.state.uloga.length===0) {
            this.setState({errorMessage:"Ne postoje uloge u bazi, prvo kreirajte uloge"});
            return false;
        }
        if (this.state.krvneGrupe.length===0) {
            this.setState({errorMessage:"Ne postoje krvne grupe u bazi, prvo kreirajte krvne grupe"});
            return false;
        }
        if (this.state.username.length < 6) {
            this.setState({errorMessage:"Potrebno je da username ima najmanje 6 znakova."});
            return false;
        }
        if ( this.state.password.length < 8) {
            this.setState({errorMessage:"Potrebno je da password ima najmanje 8 znakova."});
            return false;
        }
        if (this.state.firstname.length < 3) {
            this.setState({errorMessage:"Potrebno je da ime ima najmanje 3 znaka."});
            return false;
        }
        if (this.state.lastname.length < 3) {
            this.setState({errorMessage:"Potrebno je da prezime ima najmanje 3 znaka."});
            return false;
        }
        if (this.state.birthDate==='') {
            this.setState({errorMessage:"Unesite datum rodjenja."});
            return false;
        }
        /*if (!validEmailRegex.test(this.state.email)) {
            this.setState({errorMessage:"Email nije validan."});
            return false;
        } */      
        if (this.state.residencePlace.length===0) {
            this.setState({errorMessage:"Unesite odgovarajuce podatke za mjesto prebivalista."});
            return false;
        }
        if (this.state.address.length===0) {
            this.setState({errorMessage:"Unesite odgovarajuce podatke za adresu."});
            return false;
        }
        if (this.state.phoneNumber.length===0) {
            this.setState({errorMessage:"Unesite broj telefona."});
            return false;
        }
        return true;
    }

    componentDidMount() {
        axios.get('http://localhost:8080/role', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('access_token')
            }
    }).then(
            res => {
                const uloga = res.data
                this.setState({ uloga })
                console.log(uloga);
                if (this.state.uloga.length!=0) {
                    this.setState({role:this.state.uloga[0]});
                }

            }
        ).catch(err => {
            toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
        })

        axios.get('http://localhost:8080/bloodType', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('access_token')
            }
    }).then(
            res => {
                const krvneGrupe = res.data
                this.setState({ krvneGrupe })
                console.log(this.state.krvneGrupe);
                if (this.state.krvneGrupe.length!=0) {
                    this.setState({odabranaKrvnaGrupa:this.state.krvneGrupe[0]});
                }

            }
        ).catch(err => {
            toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
        })
    }

    handleChangeTipKrvi = (selectedOption) => {
        if (selectedOption) {
            const arrayelemnt = this.state.krvneGrupe.filter(item => item.id == selectedOption.target.value)
            this.setState({
                odabranaKrvnaGrupa: arrayelemnt[0],
                KG:selectedOption.target.value,
                idOdabraneKB:arrayelemnt[0].id
            });
            //console.log(arrayelemnt);
        }
    }

    handleChangeSpol = (selectedOption) => {
        if (selectedOption) {
            this.setState({ gender: selectedOption.target.value });
        }
    }

    handleChangePotrebnaDonacija = (selectedOption) => {
        if (selectedOption) {
            this.setState({ donationNeeded: selectedOption.target.value });
        }
    }

    handleChangeUloga = (selectedOption) => {
        if (selectedOption) {
            const arrayelemnt = this.state.uloga.filter(item => item.roleName == selectedOption.target.value)
            this.setState({
                role: arrayelemnt[0]
            });
            //console.log(this.state.role);
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createUser = (event) => {
        event.preventDefault();
        if (!this.validateForm()) toast.error("Unesite vrijednosti", { position: toast.POSITION.TOP_RIGHT })
        else {
            axios.post('http://localhost:8080/user', {
                typeOfBlood: this.state.odabranaKrvnaGrupa,
                role: this.state.role,
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                birthDate: this.state.birthDate,
                email: this.state.email,
                residencePlace: this.state.residencePlace,
                address: this.state.address,
                phoneNumber:this.state.phoneNumber,
                gender: this.state.gender,
                donationNeeded: this.state.donationNeeded
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
        }).then(response => {
                if (response.status === 200 || response.status === 201) {
                    this.props.history.push('/')
                    alert('Uspješno kreiran racun')
                }
            }).catch(err => {
                console.log(err.response.data.message.toString())
                //toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            })
        }
    }

    render() {
        const { errors } = this.state
        return (
            <div className="userDiv">
                <form className="registerForma">
                
                <img className="icon_image" src={novi_user}/>
                    <h2>Kreiraj novog korisnika</h2>
                    <div className="inputGroup">
                        <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Ime" name="firstname"/>
                        <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Prezime" name="lastname"/>
                        <br/>
                        <label>Datum rođenja: </label>
                        <input className="loginInput" type="date" onChange={e => this.handleChange(e)} placeholder="Datum rodjenja" name="birthDate" />
                    </div>
                    <div className="inputGroup">
                        <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Username" name="username" />
                        <input className="loginInput" type="password" onChange={e => this.handleChange(e)} placeholder="Password" name="password" />
                        <input className="loginInput" type="email" onChange={e => this.handleChange(e)} placeholder="Email" name="email" />
                    </div>
                    <div className="inputGroup">
                        <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Mjesto prebivalista" name="residencePlace" />
                        <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Adresa" name="address" />
                        <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Broj telefona" name="phoneNumber" />
                    </div>
                    <div className="inputGroup">
                     
                    <div className="selectWrapper">
                        <label>Krvna grupa: </label>
                        <select className="selectBox" onChange={(e) => {this.handleChangeTipKrvi(e);}} value={this.state.KG} name="KG">
                            {this.state.krvneGrupe.map(grupa => <option key={grupa.id} value={grupa.id} >{grupa.bloodType}{grupa.rhFactor ? '+':'-'}</option>)}
                        </select>
                        <button className="loginButton"> <Link className="openLogin" to="/admin/dodaj_grupu">Dodaj krvnu grupu</Link> </button>
                    </div>

                    </div>
                    <div className="selectWrapper">
                        <label>Spol: </label>
                        <select className="selectBox" onChange={(e) => {this.handleChangeSpol(e);}} value={this.state.gender} name="gender">
                            {this.state.spol.map(spol => <option key={spol.value} value={spol.value}>{spol.label}</option>)}
                        </select>
                    </div>

                    <div className="selectWrapper">
                        <label>Korisniku je potrebna donacija krvi</label>
                        <select className="selectBox" onChange={(e) => {this.handleChangePotrebnaDonacija(e);}} value={this.state.donationNeeded} name="donationNeeded">
                            {this.state.potrebnaDonacija.map(potrebnaDonacija => <option key={potrebnaDonacija.value} value={potrebnaDonacija.value}>{potrebnaDonacija.label}</option>)}
                        </select>
                    </div>

                    <div className="selectWrapper">
                        <label>Korisniku se dodjeljuje : </label>
                        <select className="selectBox" onChange={(e) => {this.handleChangeUloga(e);}} value={this.state.roleName} name="roleName">
                            {this.state.uloga.map(uloga => <option key={uloga.roleName} value={uloga.roleName}>{uloga.roleName}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                        <br/>
                        <button className="okButton" onClick={e => this.createUser(e)} type="submit"> <img className="icons" src={dodaj_novi}/> Kreiraj korisnika</button>
                    </div>
                </form>
            </div>
        )
    }

}
export default AddUser
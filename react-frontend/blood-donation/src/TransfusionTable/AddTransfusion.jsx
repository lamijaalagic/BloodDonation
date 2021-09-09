import axios from 'axios';
import React, {Component} from 'react';
import { toast } from 'react-toastify';
import dodaj_novi from '../add.png';
import crvena_kap from '../crvena_kap.png';

class AddTransfusion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            korisnici:[],
            odabrani:{},
            placeOfNeededDonation:'',
            publishingDate:'',
            emergency:true,
            hitno: [
                { value: true, label: 'Da' },
                { value: false, label: 'Ne' }
            ],
            bloodQuantityNeeded:'',
            details:'',
            username:'',
            errorMessage:''
        }
    }

    validateForm = () => {
        if (this.state.placeOfNeededDonation==='') {
            this.setState({errorMessage:"Unesite mjesto donacije"});
            return false;
        }   
        if (this.state.publishingDate==='') {
            this.setState({errorMessage:"Unesite datum objave potrebne donacije"});
            return false;
        }
        if (this.state.korisnici.length===0) {
            this.setState({errorMessage:"Ne postoje korisnici u sistemu, prvo kreirajte korisnika"});
            return false;
        }
        if (this.state.bloodQuantityNeeded ==='' || this.state.bloodQuantityNeeded<0) {
            this.setState({errorMessage:"Unesite ispravan broj potrebnih donacija, ne moze biti negativan."});
            return false;
        }
        return true;
    }

    componentDidMount() {
        axios.get('http://localhost:8080/user', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('access_token')
            }
    }).then(
            res => {
                const korisnici = res.data
                this.setState({ korisnici })
                if (this.state.korisnici.length!==0)
                    this.setState({odabrani:this.state.korisnici[0]})
                //console.log(korisnici);

            }
        ).catch(err => {
            toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
        })

        axios.get('http://localhost:8080/bloodType', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('access_token')
            }
    }).then(
            response=>{
                const krv=response.data
                this.setState({krv})
            }
        )
    }

    handleChangeKorisnici = (selectedOption) => {
        if (selectedOption) {
            //alert(selectedOption)
            const arrayelemnt = this.state.korisnici.filter(item => item.id == selectedOption.target.value)
            this.setState({
                odabrani: arrayelemnt[0],
                username:selectedOption.target.value
            });
            //console.log(this.state.odabrani);
        }
    }

    handleChangeHitno = (selectedOption) => {
        if (selectedOption) {
            this.setState({ emergency: selectedOption.target.value });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createTransfusion = (event) => {
        console.log(this.state.odabrani)
        event.preventDefault();
        if (!this.validateForm()) toast.error("Unesite vrijednosti", { position: toast.POSITION.TOP_RIGHT })
        else {
            axios.post('http://localhost:8080/transfusionTable', {
                bloodType: this.state.odabrani.typeOfBlood,
                user: this.state.odabrani,
                placeOfNeededDonation: this.state.placeOfNeededDonation,
                publishingDate: this.state.publishingDate,
                emergency: this.state.emergency,
                bloodQuantityNeeded: this.state.bloodQuantityNeeded,
                details: this.state.details
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
        }).then(response => {
                if (response.status === 200 || response.status === 201) {
                    this.props.history.push('/')
                    alert("Uspješno dodana potrebna donacija/transfuzija.");
                }
            }).catch(err => {
                console.log(err.response.data.message.toString())
                toast(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            })
        }
    }

    render() {
        return (
            <div className="userDiv">
                <form className="registerForma">
                <img className="user_img" src={crvena_kap} alt="Crvena kap"/>
                    <h2>Dodaj novu potrebnu transfuziju/donaciju</h2>
                    <div className="inputGroup">
                        <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Mjesto potrebne donacije" name="placeOfNeededDonation"/>
                        <br/>
                        <label>Datum objave: </label>
                        <input className="loginInput" type="date" onChange={e => this.handleChange(e)} placeholder="Datum objave" name="publishingDate"/>
                        <br/>
                        <input className="loginInput" type="number" onChange={e => this.handleChange(e)} placeholder="Kolicina potrebnih doza krvi" name="bloodQuantityNeeded" />
                        <br/>
                        <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Detalji" name="details" />
                    </div>
                    <div className="selectWrapper">
                        <label>Donacija je potrebna hitno </label>
                        <br/>
                        <select className="selectBox" onChange={(e) => {this.handleChangeHitno(e);}} value={this.state.emergency} name="emergency">
                            {this.state.hitno.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
                        </select>
                    </div>

                    <div className="selectWrapper">
                        <label>Transfuzija je potrebna (username): </label>
                        <br/>
                        <select className="selectBox" onChange={(e) => {this.handleChangeKorisnici(e);}} value={this.state.username} name="username" >
                            {this.state.korisnici.map(kor => <option key={kor.id} value={kor.id}>{kor.username}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                        <br/>
                        <button className="okButton" onClick={e => this.createTransfusion(e)} type="submit"> <img className="icons" src={dodaj_novi}/> Kreiraj transfuziju</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddTransfusion
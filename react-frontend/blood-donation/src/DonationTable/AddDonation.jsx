import axios from 'axios';
import React, {Component} from 'react';
import { toast } from 'react-toastify';


class AddDonation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            korisnici:[],
            donationDate:'',
            donationPlace:'',
            bloodQuantity:'',
            odabrani:{},
            username:'',
            errorMessage:''
        }
    }

    validateForm = () => {
        if (this.state.korisnici.length===0) {
            this.setState({errorMessage:"Ne postoje korisnici u sistemu, prvo kreirajte korisnika"});
            return false;
        }
        if (this.state.donationDate==='') {
            this.setState({errorMessage:"Unesite datum kada je donirana krv."});
            return false;
        }
        if (this.state.donationPlace==='') {
            this.setState({errorMessage:"Unesite mjesto donacije"});
            return false;
        }   
        if (this.state.bloodQuantity ==='' || this.state.bloodQuantity<0) {
            this.setState({errorMessage:"Unesite kolicinu doniranih doza, broj ne moze biti negativan."});
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
            }
        ).catch(err => {
            toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
        })
    }

    handleChangeKorisnici = (selectedOption) => {
        if (selectedOption) {
            alert(selectedOption)
            const arrayelemnt = this.state.korisnici.filter(item => item.id == selectedOption.target.value)
            this.setState({
                odabrani: arrayelemnt[0],
                username:selectedOption.target.value
            });
            console.log(this.state.odabrani);
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createDonation = (event) => {
        console.log(this.state.odabrani)
        event.preventDefault();
        if (!this.validateForm()) toast.error("Unesite vrijednosti", { position: toast.POSITION.TOP_RIGHT })
        else {
            
            axios.post('http://localhost:8080/donations', {
                user: this.state.odabrani,
                donationDate: this.state.donationDate,
                donationPlace:this.state.donationPlace,
                bloodQuantity:this.state.bloodQuantity
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
        }).then(response => {
                if (response.status === 200 || response.status === 201) {
                    this.props.history.push('/')
                    toast.success('Uspješno kreirana donacija', { position: toast.POSITION.TOP_RIGHT })
                }
            }).catch(err => {
                console.log(err.response.data.message.toString())
                toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            })
        }
    }

    render() {
        return (
            <div className="userDiv">
                <form className="registerForma">
                    <h2>Dodaj novu donaciju</h2>
                    <div className="inputGroup">
                        <label>Datum donacije: </label>
                        <input className="loginInput" type="date" onChange={e => this.handleChange(e)} placeholder="Datum doniranja" name="donationDate"/>
                        <br/>
                        <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Mjesto donacije" name="donationPlace"/>
                        <br/>
                        <input className="loginInput" type="number" onChange={e => this.handleChange(e)} placeholder="Kolicina donirane krvi" name="bloodQuantity" />
                    </div>
                    <div className="selectWrapper">
                        <label>Krv je donirao (username):</label>
                        <br/>
                        <select className="selectBox" onChange={(e) => {this.handleChangeKorisnici(e);}} value={this.state.username} name="username" >
                            {this.state.korisnici.map(kor => <option key={kor.id} value={kor.id}>{kor.username}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                        <br/>
                        <button className="loginButton" onClick={e => this.createDonation(e)} type="submit"> Dodaj donaciju</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddDonation
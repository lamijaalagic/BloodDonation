import axios from 'axios';
import React, {Component} from 'react';
import * as moment from 'moment';
import { toast } from 'react-toastify';
import "./Transfusion.css"

class TransfusionTableComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            transfuzije:[],
            transfuzijeSVE:[],
            transfuzijaODABRANA:{},
            bloodType:{},
            placeOfNeededDonation:'',
            publishingDate:'',
            emergency:false,
            bloodQuantityNeeded:'',
            details:'',
            trans:{},
            tipKrvi:'',
            hitnost:true,
            hitno: [
                { value: '', label:''},
                { value: true, label: 'Da' },
                { value: false, label: 'Ne' }
            ],
            mjestoPotrebne:'',
            showMe:false,
            NOVOplaceOfNeededDonation:'',
            NOVOemergency:false,
            NOVObloodQuantityNeeded:'',
            NOVOdetails:''

        }
        this.handleChange = this.handleChange.bind(this)
    }

    realizovanaTransfuzija (event, tranfuzija) {
        event.preventDefault();
        if (localStorage.getItem('role')==="ADMIN") {
            this.props.history.push('/admin/dodaj_donaciju');
        }
        else alert("Opcija omogućena samo za privilegovanog korisnika.");
        //dodati dio ako zele donirati krv, potrebno napraviti u bazi tabelu, da bi admin mogao znati
    }

    componentDidMount() {
        axios.get('http://localhost:8080/transfusionTable', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('access_token')
            }
    })
        .then (response=>{
            const transfuzije= response.data;
            this.setState({transfuzije});
            const transfuzijeSVE= response.data;
            this.setState({transfuzijeSVE});           
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.value=="") {
            this.setState({transfuzije: this.state.transfuzijeSVE});
        }
    }

    handleChangeHitnost = (selectedOption) => {
        if (selectedOption) {
            this.setState({ hitnost: selectedOption.target.value });
        }
        if (selectedOption.target.value=="") {
            this.setState({transfuzije: this.state.transfuzijeSVE});
        }
    }

    filterByTipKrvi(e) {
        e.preventDefault();
        if (this.state.tipKrvi!='') {
            axios.get('http://localhost:8080/transfusionTable/transfusions/blood_type?bloodType='+this.state.tipKrvi, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
        }).then(
            response => {
                const transfuzije= response.data;
                this.setState({transfuzije});
                this.render();
            }
            ).catch(err => {
                toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            })
        }
        else this.setState({errorMessage:"Unesite tip krvi po kojem zelite filtrirati."})
    }

    filterByHitnost(e) {
        e.preventDefault();
        axios.get('http://localhost:8080/transfusionTable/transfusions/emergency?emergency='+this.state.hitnost, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('access_token')
            }
    }).then(
        response => {
            const transfuzije= response.data;
            this.setState({transfuzije});
        }
        ).catch(err => {
            toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
        })
    }   
    
    filterByPotrebnomMjestu(e) {
        e.preventDefault();
        if (this.state.mjesto!='') {
            axios.get('http://localhost:8080/transfusionTable/transfusions/place_of_needed_donation?place_of_needed_donation='+this.state.mjestoPotrebne, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
        }).then(
            response => {
                const transfuzije= response.data;
                this.setState({transfuzije});
            }
            ).catch(err => {
                toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            })
        }
        else this.setState({errorMessage:"Unesite naziv mjesta po kojem zelite filtrirati."})
    } 

    uredi(e,profil) {
        this.setState({transfuzijaODABRANA:profil});
        this.setState({showMe:true});
    }

    handleChangeHitno = (selectedOption) => {
        if (selectedOption) {
            this.setState({ NOVOemergency: selectedOption.target.value });
        }
    }

    modifikujPodatke(e) {
        e.preventDefault();
        if (this.state.NOVOplaceOfNeededDonation=='') this.state.NOVOplaceOfNeededDonation=this.state.transfuzijaODABRANA.placeOfNeededDonation;
        if (this.state.NOVObloodQuantityNeeded=='') this.state.NOVObloodQuantityNeeded=this.state.transfuzijaODABRANA.bloodQuantityNeeded;
        if (this.state.NOVOdetails=='') this.state.NOVOdetails=this.state.transfuzijaODABRANA.details;
        axios.put('http://localhost:8080/transfusionTable/'+this.state.transfuzijaODABRANA.id, {
            bloodType: this.state.transfuzijaODABRANA.bloodType,
            user: this.state.transfuzijaODABRANA.user,
            placeOfNeededDonation: this.state.NOVOplaceOfNeededDonation,
            publishingDate: this.state.transfuzijaODABRANA.publishingDate,
            emergency: this.state.NOVOemergency,
            bloodQuantityNeeded: this.state.NOVObloodQuantityNeeded,
            details: this.state.NOVOdetails
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
        })
        this.setState({showMe:false});
        axios.get('http://localhost:8080/transfusionTable', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('access_token')
            }
    })
        .then (response=>{
            const transfuzije= response.data;
            this.setState({transfuzije});
            const transfuzijeSVE= response.data;
            this.setState({transfuzijeSVE});           
        })
    }
    render() {
        return ( 
            <div className="userView">
                <h2>Tabela transfuzija</h2>
                <div>
                    <table>
                        <tr>
                            <th>Doniraj</th>
                            <th>Potrebna krvna grupa</th>
                            <th>Mjesto</th>
                            <th>Datum</th>
                            <th>Da li je hitno potrebna krv</th>
                            <th>Količina potrebnih doza</th>
                            <th>Detalji</th>
                            <th>Izmijeni podatke</th>
                        </tr>
                        {this.state.transfuzije.map(trans => {
                        return(
                        <tr key={trans.id}>
                            <td><button className="tabelaButton" onClick={e => this.realizovanaTransfuzija(e,trans)}>Doniraj</button></td>
                            <td>{trans.bloodType.bloodType} {trans.bloodType.rhFactor ? '+':'-'}</td>
                            <td>{trans.placeOfNeededDonation}</td>
                            <td>{trans.publishingDate}</td>
                            <td>{trans.emergency ? 'Da':'Ne'}</td>
                            <td>{trans.bloodQuantityNeeded}</td>                                
                            <td>{trans.details}</td>
                            <td><button className="tabelaButton" onClick={e => this.uredi(e,trans)}>Uredi</button></td>
                        </tr>)
})}
                    </table>
                </div>
                <div className="filteri">
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Tip krvi" name="tipKrvi"/>
                    <button type="submit" onClick={e => this.filterByTipKrvi(e)}>Filtriraj po tipu krvi</button>
                    <br/>
                    <select className="selectBox" onChange={(e) => {this.handleChangeHitnost(e);}} value={this.state.hitnost} name="hitnost">
                        {this.state.hitno.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
                    </select>
                    <button type="submit" onClick={e => this.filterByHitnost(e)}>Filtriraj po hitnosti</button>
                    <br/>
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Mjesto potrebne transfuzije" name="mjestoPotrebne" />
                    <button type="submit" onClick={e => this.filterByPotrebnomMjestu(e)}>Filtriraj po mjestu potrebne transfuzije</button>
                    <br/>
                    <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                </div>
                {this.state.showMe? 
                <div >
                    <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Mjesto potrebne donacije" name="NOVOplaceOfNeededDonation"/>
                        <br/>
                        <input className="loginInput" type="number" onChange={e => this.handleChange(e)} placeholder="Kolicina potrebnih doza krvi" name="NOVObloodQuantityNeeded" />
                        <br/>
                        <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Detalji" name="NOVOdetails" />
                        <br/>
                    <label>Hitno potrebna transfuzija: </label>
                    <select className="selectBox" onChange={(e) => {this.handleChangeHitno(e);}} value={this.state.NOVOemergency} name="NOVOemergency">
                        {this.state.hitno.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
                    </select>
                    <br/>
                    <button className="loginButton" onClick={e => {this.setState({showMe:false});}} type="submit"> Nazad</button>
                    <button className="loginButton" onClick={e => this.modifikujPodatke(e)} type="submit"> Promijeni podatke</button>
                </div>
                 :null}
            </div>
        )
    }
}
export default TransfusionTableComponent
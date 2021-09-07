import axios from 'axios';
import React, {Component} from 'react';
import Moment from 'moment';
import { toast } from 'react-toastify';
import "./Transfusion.css";
import generateTransfusionPDF from './ReportTransfusion';
import crvena_kap from '../crvena_kap.png';
import filter from '../find.png';
import promijeni from '../modify.png';
import dodaj_novi from '../add.png';
import prikazi_detalje from '../show_details.png';


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
            NOVOdetails:'',
            traziMjesec:0,
            traziGodina:'',
            poruka:'Izvjestaj',
            mjesec: [
                { value: '0', label: ''},
                { value: '1', label: 'Januar' },
                { value: '2', label: 'Februar' },
                { value: '3', label: 'Mart' },
                { value: '4', label: 'April' },
                { value: '5', label: 'Maj' },
                { value: '6', label: 'Juni' },
                { value: '7', label: 'Juli' },
                { value: '8', label: 'August' },
                { value: '9', label: 'Septembar' },
                { value: '10', label: 'Oktobar' },
                { value: '11', label: 'Novembar' },
                { value: '12', label: 'Decembar' }
            ],
            odDatuma:null,
            doDatuma:null
        }
        this.handleChange = this.handleChange.bind(this)
       
    }

    realizovanaTransfuzija (event, tranfuzija) {
        event.preventDefault();
        
        if (localStorage.getItem('role')==="ADMIN") {
            sessionStorage.setItem('primalac',tranfuzija.user.id);
            sessionStorage.setItem('idt',tranfuzija.id);
            this.props.history.push('/admin/dodaj_donaciju');
        }
        else if (localStorage.getItem('role')==="EMPLOYEE_DOCTOR") {
            sessionStorage.setItem('primalac',tranfuzija.user.id);
            sessionStorage.setItem('idt',tranfuzija.id);
            this.props.history.push('/employeeDoctor/dodaj_donaciju');
        }
        else alert("Opcija omogućena samo za privilegovanog korisnika.");
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

    handleChangeMjesec = (selectedOption) => {
        if (selectedOption) {
            this.setState({ traziMjesec: selectedOption.target.value });
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

    kreirajIzvjestaj(e) {
        e.preventDefault();
        var di=[];
        if (this.state.traziGodina!='' && this.state.traziMjesec!=0) {
            for (let index = 0; index < this.state.transfuzijeSVE.length; index++) {
                const element = this.state.transfuzijeSVE[index];
                var datum=new Date(element.publishingDate)
                if (datum.getFullYear()==this.state.traziGodina && datum.getMonth()==this.state.traziMjesec-1) {
                    di.push(element);
                }    
            }
            this.state.poruka="Mjesečni izvještaj transfuzija krvi za mjesec "+this.state.traziMjesec; 
        }
        else if (this.state.traziGodina!='') {
            for (let index = 0; index < this.state.transfuzijeSVE.length; index++) {
                const element = this.state.transfuzijeSVE[index];
                var datum=new Date(element.publishingDate)
                if (datum.getFullYear()==this.state.traziGodina) {
                    di.push(element);
                }    
            }
            this.state.poruka="Godišnji izvještaj transfuzija krvi za godinu "+this.state.traziGodina; 
        }
        else {
            di=this.state.transfuzijeSVE;
            this.state.poruka="Izvještaj svih transfuzija krvi.";
        }
        generateTransfusionPDF(di, this.state.poruka);
    }

    render() {
        return ( 
            <div className="userView">
                <img className="user_img" src={crvena_kap} alt="Crvena kap"/>
                <h2>Tabela potrebnih transfuzija krvi</h2>
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
                            <td>{Moment(trans.publishingDate).format('DD-MM-YYYY')}</td>
                            <td>{trans.emergency ? 'Da':'Ne'}</td>
                            <td>{trans.bloodQuantityNeeded}</td>                                
                            <td>{trans.details}</td>
                            <td><button className="tabelaButton" onClick={e => this.uredi(e,trans)}><img className="icons" src={promijeni}/>Uredi</button></td>
                        </tr>)
})}
                    </table>
                </div>
                <div className="filteri">
                    <label><b><i>Filtriraj podatke u tabeli</i></b></label>
                    <br/>
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Tip krvi" name="tipKrvi"/>
                    <button  className="loginButton" type="submit" onClick={e => this.filterByTipKrvi(e)}><img className="icons" src={filter}/>Filtriraj po tipu krvi</button>
                    <br/>
                    <select className="selectBox" onChange={(e) => {this.handleChangeHitnost(e);}} value={this.state.hitnost} name="hitnost">
                        {this.state.hitno.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
                    </select>
                    <button  className="loginButton" type="submit" onClick={e => this.filterByHitnost(e)}><img className="icons" src={filter}/>Filtriraj po hitnosti</button>
                    <br/>
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Mjesto potrebne transfuzije" name="mjestoPotrebne" />
                    <button  className="loginButton" type="submit" onClick={e => this.filterByPotrebnomMjestu(e)}><img className="icons" src={filter}/>Filtriraj po mjestu potrebne transfuzije</button>
                    <br/>
                    <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                </div>

                <div className="filteri">
                    <div >
                        <label><b><i>Kreiraj izvještaj</i></b></label>
                        <br/>
                        <p>Kreiraj mjesečni/godišnji izvještaj<br/>
                            Ukoliko želite godišnji izvještaj, odaberite godinu.<br/>
                            Ukoliko želite mjesečni izvještaj odaberite i mjesec i godinu.
                        </p>
                    </div>
                    <div>
                        <label>Izvještaj za mjesec: </label>
                        <select className="selectBox" onChange={(e) => {this.handleChangeMjesec(e);}} value={this.state.traziMjesec} name="traziMjesec">
                            {this.state.mjesec.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                        <input className="loginInput"  type="number" onChange={e => this.handleChange(e)} placeholder="Izvještaj za godinu: " name="traziGodina" />
                        <button className="loginButton" onClick={e => this.kreirajIzvjestaj(e)} type="submit">Kreiraj mjesečni/godišnji izvještaj</button>
                    </div>
                    
                </div>

                {this.state.showMe? 
                <div className="filteri">
                    <label><b><i>Izmijeni podatke odabrane transfuzije</i></b></label>
                        <br/>
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
                    <button className="backButton" onClick={e => {this.setState({showMe:false});}} type="submit"> Nazad</button>
                    <button className="okButton" onClick={e => this.modifikujPodatke(e)} type="submit"> Promijeni podatke</button>
                </div>
                 :null}
            </div>
        )
    }
}
export default TransfusionTableComponent
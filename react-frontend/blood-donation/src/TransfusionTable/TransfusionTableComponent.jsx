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
            user:{},
            bloodType:{},
            placeOfNeededDonation:'',
            publishingDate:'',
            emergency:false,
            bloodQuantityNeeded:'',
            details:'',
            trans:{},
            tipKrvi:'',
            hitno:true,
            mjestoPotrebne:''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    posaljiObavijest(idTranfuzije) {
        //dodati dio ako zele donirati krv, potrebno napraviti u bazi tabelu, da bi admin mogao znati
    }

    componentDidMount() {
        axios.get('http://localhost:8080/transfusionTable')
        .then (response=>{
            const transfuzije= response.data;
            this.setState({transfuzije});
            //alert(this.state.transfuzije)
            console.log(this.state.transfuzije)
           
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    filterByTipKrvi(e) {
        e.preventDefault();
        if (this.state.tipKrvi!='') {
            axios.get('http://localhost:8080/transfusionTable/transfusions/blood_type?bloodType='+this.state.tipKrvi).then(
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
        const fMjesto=this.state.mjesto;
        axios.get('http://localhost:8080/transfusionTable/transfusions/emergency?emergency='+this.state.hitno).then(
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
            const fMjesto=this.state.mjesto;
            axios.get('http://localhost:8080/transfusionTable/transfusions/place_of_needed_donation?place_of_needed_donation='+this.state.mjestoPotrebne).then(
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
                        </tr>
                        {this.state.transfuzije.map(trans => {
                        return(
                        <tr key={trans.id}>
                            <td><button onClick={this.posaljiObavijest(trans.id)}>Doniraj</button></td>
                            <td>{trans.bloodType.bloodType} {trans.bloodType.rhFactor ? '+':'-'}</td>
                            <td>{trans.placeOfNeededDonation}</td>
                            <td>{trans.publishingDate}</td>
                            <td>{trans.emergency ? 'Da':'Ne'}</td>
                            <td>{trans.bloodQuantityNeeded}</td>                                
                            <td>{trans.details}</td>
                        </tr>)
})}
                    </table>
                </div>
                <div className="filteri">
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Tip krvi" name="tipKrvi"/>
                    <button type="submit" onClick={e => this.filterByTipKrvi(e)}>Filtriraj po tipu krvi</button>
                    <br/>
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Tip hitnosti" name="hitno" />
                    <button type="submit" onClick={e => this.filterByHitnost(e)}>Filtriraj po hitnosti</button>
                    <br/>
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Mjesto potrebne transfuzije" name="mjestoPotrebne" />
                    <button type="submit" onClick={e => this.filterByPotrebnomMjestu(e)}>Filtriraj po mjestu potrebne transfuzije</button>
                    <br/>
                    <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                </div>
            </div>
        )
    }
}
export default TransfusionTableComponent
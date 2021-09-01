import axios from 'axios';
import React, {Component} from 'react';
import { toast } from 'react-toastify';
import "./Donation.css";

class DonationTableComponent extends Component {

    constructor(props) {
        super(props)
        this.state={
            donacije:[],
            donacijeSVE:[],
            donacijaODABRANA:{},
            user:{},
            donationDate:'',
            donationPlace:'',
            bloodQuantity:'',
            AllUsers:{},
            mjesto:'',
            filterUsername:'',
            errorMessage:'',
            showMe:false,
            NOVOdonationPlace:'',
            NOVObloodQuantity:0
        }
        this.handleChange = this.handleChange.bind(this)
        /*this.filterByMjesto=this.filterByMjesto(this)
        this.filterByUser=this.filterByUser(this)*/
    }

    componentDidMount() {
        if(localStorage.getItem('role')==="ADMIN") {
            axios.get('http://localhost:8080/donations')
            .then (response=>{
                const donacije= response.data;
                this.setState({donacije});
                const donacijeSVE=response.data;
                this.setState({donacijeSVE});
            })
        }
        /*else {
            axios.get('http://localhost:8080/user?username='+localStorage.getItem('username'))
            .then (response=>{
                const donacije= response.data;
                this.setState({donacije});
            })
        }*/
        
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.value=="") {
            this.setState({donacije: this.state.donacijeSVE});
        }
    }

    filterByUser(e) {
        e.preventDefault();
        if (this.state.filterUsername!=='') {
            axios.get('http://localhost:8080/donations/user?username='+this.state.filterUsername).then(
            response => {
                const donacije= response.data;
                this.setState({donacije});
                this.render();
            }
            ).catch(err => {
                toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            })
        }
        else this.setState({errorMessage:"Unesite naziv mjesta po kojem zelite filtrirati."})
    }

    filterByMjesto(e) {
        e.preventDefault();
        if (this.state.mjesto.length !== 0) {
            //const fMjesto=this.state.mjesto;
            axios.get('http://localhost:8080/donations/donationPlace?donationPlace='+this.state.mjesto).then(
            response => {
                const donacije= response.data;
                this.setState({donacije});
            }
            ).catch(err => {
                toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            })
        }
        else this.setState({errorMessage:"Unesite naziv mjesta po kojem zelite filtrirati."})
    }

    uredi(e,profil) {
        this.setState({donacijaODABRANA:profil});
        this.setState({showMe:true});
    }

    modifikujPodatke(e) {
        e.preventDefault();
        if (this.state.NOVObloodQuantity==0) this.state.NOVObloodQuantity=this.state.donacijaODABRANA.bloodQuantity;
        if (this.state.NOVOdonationPlace=='') this.state.NOVOdonationPlace=this.state.donacijaODABRANA.donationPlace;
        axios.put('http://localhost:8080/donations/'+this.state.donacijaODABRANA.id, {
                user: this.state.donacijaODABRANA.user,
                donationDate: this.state.donacijaODABRANA.donationDate,
                donationPlace:this.state.NOVOdonationPlace,
                bloodQuantity:this.state.NOVObloodQuantity
        }).then(response => {
            if (response.status === 200 || response.status === 201) {
                this.props.history.push('/')
                alert('Uspješno izmijenjeni podaci')
            }
        }).catch(err => {
            console.log(err.response.data.message.toString())
        })
        this.setState({showMe:false});
    }
    
    render() {
        return ( 
            <div className="userView">
                <h2>Tabela donacija</h2>
                <div>
                    <table>
                        <tr>
                            <th>User id</th>
                            <th>Datum donacije</th>
                            <th>Mjesto donacije</th>
                            <th>Količina doniranih doza</th>
                            <th>Uredi podatke</th>
                        </tr>
                        {this.state.donacije.map(don => {
                        return(
                        <tr key={don.id}>
                            <td>{don.user.id}</td>
                            <td>{don.donationDate}</td>
                            <td>{don.donationPlace}</td>
                            <td>{don.bloodQuantity}</td>
                            <td><button className="tabelaButton" onClick={e => this.uredi(e,don)}>Uredi</button></td>
                        </tr>)
})}
                    </table>
                </div>
                <div className="filteri">
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Mjesto donacije" name="mjesto"/>
                    <button type="submit" onClick={e => this.filterByMjesto(e)}>Filtriraj po mjestu</button>
                    <br/>
                    <input type="text" onChange={e => this.handleChange(e)} placeholder="Username" name="filterUsername" />
                    <button type="submit" onClick={e => this.filterByUser(e)}>Filtriraj po korisniku</button>
                    <br/>
                    <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                </div>

                {this.state.showMe? 
                <div >
                    <input className="loginInput" type="text" onChange={e => this.handleChange(e)} placeholder="Mjesto donacije" name="NOVOdonationPlace"/>
                    <br/>
                    <input className="loginInput" type="number" onChange={e => this.handleChange(e)} placeholder="Kolicina doza krvi" name="NOVObloodQuantity" />
                    <br/>
                    <button className="loginButton" onClick={e => {this.setState({showMe:false});}} type="submit"> Nazad</button>
                    <button className="loginButton" onClick={e => this.modifikujPodatke(e)} type="submit"> Promijeni podatke</button>
                </div>
                 :null}
            </div>
        )
    }

}
export default DonationTableComponent
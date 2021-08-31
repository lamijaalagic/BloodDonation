import axios from 'axios';
import React, {Component} from 'react';
import { toast } from 'react-toastify';
import "./Donation.css";

class DonationTableComponent extends Component {

    constructor(props) {
        super(props)
        this.state={
            donacije:[],
            user:{},
            donationDate:'',
            donationPlace:'',
            bloodQuantity:'',
            AllUsers:{},
            mjesto:'',
            filterUsername:'',
            errorMessage:''
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
                console.log(this.state.donacije)
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
                        </tr>
                        {this.state.donacije.map(don => {
                        return(
                        <tr key={don.id}>
                            <td>{don.user.id}</td>
                            <td>{don.donationDate}</td>
                            <td>{don.donationPlace}</td>
                            <td>{don.bloodQuantity}</td>
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
            </div>
        )
    }

}
export default DonationTableComponent
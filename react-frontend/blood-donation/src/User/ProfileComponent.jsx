import axios from 'axios';
import React, {Component} from 'react';
import crvena_kap from '../crvena_kap.png';
import { toast } from 'react-toastify';
import "./styleUser.css"

class ProfileComponent extends Component {

    constructor(props) {
        super(props)
        this.state={
            userId:'',
            username:'',
            firstname:'',
            lastname:'',
            birthDate:'',
            typeOfBlood: {
                id:'',
                bloodType:'',
                rhFactor:true
            },
            rh:true,
            residencePlace:'',
            address:'',
            phoneNumber:'',
            gender:'',
            donationNeeded:true,
            email:'',
            role:{
                roleName:''
            },
            userData:{},
            token:'',
            nextDonationDate:''
        }
    }
    componentDidMount() {
        //dohvatanje podataka
        //alert(localStorage.getItem('access_token'))
        axios.get('http://localhost:8080/user/username?username='+localStorage.getItem('username'), {
            /*headers:{
                'Authorization':'Bearer ${token}'
            }*/
        }).then(response=>{
            const userData = response.data;
            this.setState({ userData })
            //alert(JSON.stringify(this.state.userData.typeOfBlood))
            const typeOfBlood = this.state.userData.typeOfBlood;
            this.setState({typeOfBlood})
            const role=this.state.userData.role;
            this.setState({role})
            
            
        }).catch(err => {
            if (err.response.data.errors !== undefined) {
                toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            }
        })
        
    }

    nextDonationPosible() {
        axios.get('http://localhost:8080/donations/user?username='+localStorage.getItem('username'))
        .then (response=>{
            const data=response.data;
            //pronaci najveci datum i njemu dodati 3 ili 4 mjeseca
            const duzina=Object.keys(data).length
            var datum = '';
            var i=0;
            data.forEach(element => {
                if(i===0) {
                    datum = element.donationDate
                }
                else if (element.donationDate>datum) {
                    datum=element.donationDate
                }
                if(i+1<duzina) i++;
            });
            datum=new Date(datum)
            var month=0
            if (this.state.gender==='Z')
                month = datum.getMonth() + 4;
            else {
                month = datum.getMonth() + 3;
            }
            var day = datum.getDate();
            var year = datum.getFullYear();
            this.state.nextDonationDate = year + '-' + month + '-' + day;
        })
    }

    render() {
        return ( 
            <div className="glavni" >
                <div className="left">
                <h2>Detalji o meni</h2>
                <img className="slika" src={crvena_kap} alt="Crvena kap"/>
                </div>
                <div className="right">
                <div className="okvir">
                    <label><b>Ime i prezime: </b></label>
                    <label>{this.state.userData.firstname}</label>
                    <label>{this.state.userData.lastname}</label>
                </div>
                <div className="okvir">
                    <label><b>Krvna grupa: </b></label>
                    <lable>{this.state.typeOfBlood.bloodType}</lable>
                    <label>{this.state.typeOfBlood.rhFactor ? '+':'-'}</label>
                    
                </div>
                <div className="okvir">
                    <label><b>Datum rođenja: </b></label>
                    <label>{this.state.userData.birthDate}</label>
                    <br/>
                    <label><b>Spol: </b></label>
                    <label>{this.state.userData.gender}</label>
                </div>
                <div className="okvir">
                    <label><b>Mjesto prebivališta: </b></label>
                    <label>{this.state.userData.residencePlace}</label>
                    <br/>
                    <label><b>Adresa: </b></label>
                    <label>{this.state.userData.address}</label>
                    <br/>
                    <label><b>Broj telefona: </b></label>
                    <label>{this.state.userData.phoneNumber}</label>
                    <br/>
                    <label><b>Email: </b></label>
                    <label>{this.state.email}</label>
                </div>
                <div className="okvir">
                    <label><b>Potrebna donacija: </b></label>
                    <label>{this.state.userData.donationNeeded ? 'Da':'Ne'}</label>
                    <br/>
                    <label><b>Username: </b></label>
                    <label>{this.state.userData.username}</label>
                    <br/>
                    <label><b>Uloga</b></label>
                    <label>{this.state.role.roleName}</label>
                </div>
                <div>
                    <label><b>Sljedeća donacija moguća:</b></label>
                    <label onLoad={this.nextDonationPosible()}>{this.state.nextDonationDate}</label>
                </div>
                </div>
            </div>
        )
    }
}
export default ProfileComponent
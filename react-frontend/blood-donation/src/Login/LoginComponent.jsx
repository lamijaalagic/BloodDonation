import React, {Component} from 'react';
import "./LoginComponent.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import LocalStorageService from '../LocalStorage.js';
import jwt from 'jsonwebtoken'

class LoginComponent extends Component {

    /*constructor(props) {
        super(props)
        this.state={
            username:"",
            password:"",
            errorMessage:""
        }
        this.handleSubmit= this.handleSubmit.bind(this)
        this.handleChange= this.handleChange.bind(this)
    }

    handleSubmit(event) {
        alert("localstorage")
        axios.post('http://localhost:8080/authenticate', {
            username: this.state.username,
            password: this.state.password
        })
        .then ((response) => {
            this.setState({errorMessage:""})
            //potrebno je u localStorage spremiti podatke, username i token da bi se mogla provjeriti njihova ispravnost i validnost
            //najlakse je dodati i rolu i na osnovu nje podijeliti pristupne panele
            localStorage.token="ok"
            window.alert("localstorage")
            localStorage.username=this.state.username
        }, (error) => {
            this.setState({errorMessage:"Neispravni pristupni podaci"})
        }
        );
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }*/

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            role:'',
            token:'',
            errorMessage:"",
            decoded_token:""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const localStorageService = LocalStorageService.getService();

        axios.post('http://localhost:8080/authenticate', {
            username: this.state.username,
            password: this.state.password,
        })
            .then((response) => {
                if(response.status === 200 || response.status === 201) {
                    localStorageService.setToken(response.data)
                    console.log(response)
                    this.state.decoded_token=jwt.decode(response.data.token)
                    console.log(this.state.decoded_token)
                    if (this.state.decoded_token.role === "ADMIN") {
                        this.props.history.push('/admin')
                    }
                    else if (this.state.decoded_token.role === "USER") {
                        this.props.history.push('/user')
                    }
                    else if (this.state.decoded_token.role === "EMPLOYEE") {
                        this.state.token = response.data.token
                    }
                    toast.success('Uspjesna prijava na sistem', { position: toast.POSITION.TOP_RIGHT })
                }
            }).catch (err => {
                console.log(err)
                if (!!err && err.response.data.message != null) {
                    toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
                    this.setState({errorMessage:err.response.data.message.toString()});
                }
                else {
                    toast.error('Pogresni podaci', { position: toast.POSITION.TOP_RIGHT })
                }
            });
    }

    render() {
        return (
            <div className="frame">
                <div className="header">
                    <h1>Blood donation</h1>
                    <h2>Unesite podatke</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                    <br/>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                    <br/>
                    <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                    <br/>
                    <input className="submit-btn" type="submit" value="Login" />
                </form>
            </div>
        )
    }
}
export default LoginComponent
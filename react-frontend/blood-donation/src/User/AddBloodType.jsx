import axios from 'axios';
import React, {Component} from 'react';
import { toast } from 'react-toastify';


class AddBloodType extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bloodType:'A',
            rhFactor:true,
            tipKrvi: [
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'AB', label: 'AB'}
            ],
            rh: [
                { value: true, label: '+' },
                { value: false, label: '-' }
            ]
        }
    }

    componentDidMount() {
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangeTipKrvi = (selectedOption) => {
        if (selectedOption) {
            this.setState({ bloodType : selectedOption.target.value });
        }
    }

    handleChangeRh = (selectedOption) => {
        if (selectedOption) {
            this.setState({ rhFactor: selectedOption.target.value });
        }
    }

    createBloodType = (event) => {
        event.preventDefault();
            axios.post('http://localhost:8080/bloodType', {
                bloodType:this.state.bloodType,
                rhFactor:this.state.rhFactor
            }).then(response => {
                if (response.status === 200 || response.status === 201) {
                    this.props.history.push('/')
                    toast.success('Uspješno kreirana krvna grupa', { position: toast.POSITION.TOP_RIGHT })
                }
            }).catch(err => {
                console.log(err.response.data.message.toString())
                toast.error(err.response.data.message.toString(), { position: toast.POSITION.TOP_RIGHT })
            })
    }

    render() {
        return (
            <div className="userDiv">
                <form className="registerForma">
                    <h2>Dodaj novu krvnu grupu</h2>
                    <div className="inputGroup">
                        <select className="selectBox" onChange={(e) => {this.handleChangeTipKrvi(e);}} value={this.state.bloodType} name="bloodType">
                            {this.state.tipKrvi.map(tipKrvi => <option key={tipKrvi.value} value={tipKrvi.value}>{tipKrvi.label}</option>)}
                        </select>
                        <br/>
                        <select className="selectBox" onChange={(e) => {this.handleChangeRh(e);}} value={this.state.rhFactor} name="rhFactor">
                            {this.state.rh.map(rh => <option key={rh.value} value={rh.value}>{rh.label}</option>)}
                        </select>                    
                    </div>
                    <div>
                        <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                        <br/>
                        <button className="loginButton" onClick={e => this.createBloodType(e)} type="submit"> Dodaj krvnu grupu</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddBloodType
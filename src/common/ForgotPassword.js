import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import userService from '../services/Services';
import jwt_decode from "jwt-decode";
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            display1: 'hidden',
            display2: 'hidden',
            display3: 'hidden'
        }
    }
    changeFormData = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (this.state.password.trim() === '') {
            this.setState({
                display2: 'hidden'
            })
        }
        if (this.state.email.trim() === '') {
            this.setState({
                display1: 'hidden'
            })
        }
    }
    handleLogin = event => {
        let token = '';
        event.preventDefault();
        if (this.state.email.trim() === '' || this.state.password.trim() === '') {
            if (this.state.email.trim() === '') {
                this.setState({
                    display1: ''
                })
            }
            else {
                this.setState({
                    display1: 'hidden'
                })
            }
            if (this.state.password.trim() === '') {
                this.setState({
                    display2: ''
                })
            }
            else {
                this.setState({
                    display2: 'hidden'
                })
            }
        }
        else {
            userService.login(this.state.email, this.state.password).then(
                res => {
                    token = res.headers["token"];
                    var decoded_token = jwt_decode(token);
                    console.log(decoded_token);
                    if (decoded_token.role === "employee") {
                        localStorage.setItem('role', decoded_token.role)

                        localStorage.setItem('id', decoded_token.userId)
                        localStorage.setItem("token", token);
                        this.props.history.push("/home");
                        window.location.reload();
                    } else if (decoded_token.role === "manager") {
                        localStorage.setItem('role', decoded_token.role)
                        localStorage.setItem('id', decoded_token.userId)
                        localStorage.setItem("token", token);
                        this.props.history.push("/home");
                        window.location.reload();
                    }

                },

            ).catch(err => {
                console.log("inside error")
                this.setState({
                    display3: ''
                })
            })
            // var decoded_token = jwt_decode(token);
            // if (decoded_token.role === "employee") {
            //     localStorage.setItem("token", token);
            //     this.props.history.push("/home");
            //     window.location.reload();
            // } else if (decoded_token.role === "manager") {
            //     localStorage.setItem("token", token);
            //     this.props.history.push("/home");
            //     window.location.reload();
            // } else {
            //     localStorage.clear();
            //     alert("Invalid Login Credentials");
            //     this.props.history.push("/login");
            // }
        }
    }
    handleClose = (event) => {
        event.preventDefault();
        this.setState({
            display3: 'hidden',
        })
    }

    render() {
        return (
            <div className="container login-container">
                <h1 className="text-monospace heading-leaderboard">Forgot Password</h1>
                <form onSubmit={this.handleForgotPassword}>
                    <div className={`alert alert-danger alert-dismissible fade in ${this.state.display3}`}>
                        <a href="#" class="close" aria-label="close" onClick={this.handleClose}>&times;</a>
                        <strong>Error!</strong> Invalid Credentials.
                    </div>
                    <div className="form-group group-edit">
                        <input type="email" name="email" required placeholder="Email" onChange={this.changeFormData} className="form-control login-form-input" />
                        <font className={`error-data ${this.state.display1}`}>Invalid email!</font>
                    </div>
                    <div className="form-group">
                        <button className="form-control btn btn-primary login-button-edit" >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
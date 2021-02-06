import React from "react";
import axios from 'axios';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    handleSubmit(event) {

        axios.post('/api/register', {
            'name':this.state.name,
            'email': this.state.email,
            'password':this.state.password,
            'password_confirmation':this.state.password_confirmation
        })
        .then(res => {
            console.log(res.data.accessToken);
        }).catch(err => {
           alert(err)
        })
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="grid-container">
                    <div className="grid-x grid-padding-x">
                        <div className="medium-6 cell">
                            <label>Name
                            <input
                                type="text"
                                name="name"
                                placeholder="Georges"
                                value={this.state.name}
                                onChange={this.handleChange.bind(this)}
                            />
                            </label>
                        </div>
                        <div className="medium-6 cell">
                            <label>Email
                            <input
                                type="text"
                                name="email"
                                placeholder="john@doe.com"
                                value={this.state.email}
                                onChange={this.handleChange.bind(this)}
                            />
                            </label>
                        </div>
                            <div className="medium-6 cell">
                                <label>Password
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange.bind(this)}
                            />
                                </label>
                            </div>
                                <div className="medium-6 cell">
                                    <label>retype Password
                            <input
                                type="password"
                                name="password_confirmation"
                                value={this.state.password_confirmation}
                                onChange={this.handleChange.bind(this)}
                            />
                                    </label>
                                    <input type="submit" value="Envoyer"/>
                                </div>
                            </div>
                        </div>
            </form>
    );
    }
    }


    export default RegisterForm;


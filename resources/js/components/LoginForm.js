import React, { useState } from 'react';
import axios from 'axios';


async function LoginUser(userInfo)
{
    return axios.post('/api/login', userInfo)
        .then(res =>{
            return res.data.accessToken;
        })
}




export default function LoginForm({setToken, setIsregister})
{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token =  LoginUser({
            email,
            password,
        });
        setToken(token)
    }
    const handleRegister= async e => {
        console.log("click")
        setIsregister("1");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid-container">
                <div className="grid-x grid-padding-x">
                    <div className="medium-6 cell">
                        <label>Email
                            <input
                                type="text"
                                name="email"
                                placeholder="john@doe.com"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </label>
                        <label>Password
                            <input
                                type="password"
                                name="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </label>
                        <input type="submit" value="Connexion"/>
                        <p className="help-text" >pas encore inscrit? clique <a onClick={handleRegister} >ici</a></p>
                    </div>
                </div>
            </div>
        </form>
    );
}





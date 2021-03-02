import React, { useState } from 'react';
import axios from 'axios';


 async function registerUser(userInfo) {
     return await axios.post('/api/register', userInfo)
         .then(res => {
             return res.data.accessToken;
         })
 }




export default  function RegisterForm({setToken})
    {
        const [name, setName] = useState();
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        const [password_confirmation, setpassword_confirmation] = useState();

        const handleSubmit = async e => {
            e.preventDefault();
          const token =  registerUser({
                name,
                email,
                password,
                password_confirmation,
            });
            token.then(r => {
                setToken(r)
            })
        }


        return (
            <form onSubmit={handleSubmit}>
                <div className="grid-container">
                    <div className="grid-x grid-padding-x">
                        <div className="medium-6 cell">
                            <label>Name
                            <input
                                type="text"
                                name="name"
                                placeholder="Georges"
                                onChange={e => setName(e.target.value)}
                            />
                            </label>
                        </div>
                        <div className="medium-6 cell">
                            <label>Email
                            <input
                                type="text"
                                name="email"
                                placeholder="john@doe.com"
                                onChange={e => setEmail(e.target.value)}
                            />
                            </label>
                        </div>
                            <div className="medium-6 cell">
                                <label>Password
                            <input
                                type="password"
                                name="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                                </label>
                            </div>
                                <div className="medium-6 cell">
                                    <label>retype Password
                            <input
                                type="password"
                                name="password_confirmation"
                                onChange={ e => setpassword_confirmation(e.target.value)}
                            />
                                    </label>
                                    <input type="submit" value="Envoyer"/>
                                </div>
                            </div>
                        </div>
            </form>
    );
    }





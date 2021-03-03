import React, { useState } from "react";
import axios from "axios";
import "../../css/styles.css";
import "./LoginAnimators";

async function LoginUser(userInfo) {
    return await axios.post("/api/login", userInfo).then((res) => {
        return res.data.accessToken;
    });
}

export default function LoginForm({ setToken, setIsregister }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = LoginUser({
            email,
            password,
        });
        token.then((r) => {
            setToken(r);
        });
    };
    const handleRegister = async (e) => {
        console.log("click");
        setIsregister("1");
    };

    return (
        <section className="forms-section">
            <h1 className="section-title">InstISEN</h1>
            <div className="forms">
                <div className="form-wrapper is-active">
                    <button type="button" className="switcher switcher-login">
                        Login
                        <span className="underline"></span>
                    </button>
                    <form className="form form-login">
                        <fieldset>
                            <legend>
                                Please, enter your email and password for login.
                            </legend>
                            <div className="input-block">
                                <label htmlFor="login-email">E-mail</label>
                                <input
                                    id="login-email"
                                    type="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="login-password">Password</label>
                                <input
                                    id="login-password"
                                    type="password"
                                    name="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </fieldset>
                        <button
                            type="submit"
                            className="btn-login"
                            onSubmit={handleSubmit}
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div className="form-wrapper">
                    <button type="button" className="switcher switcher-signup">
                        Sign Up
                        <span className="underline"></span>
                    </button>
                    <form className="form form-signup">
                        <fieldset>
                            <legend>
                                Please, enter your email, password and password
                                confirmation for sign up.
                            </legend>
                            <div className="input-block">
                                <label htmlFor="signup-email">E-mail</label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="signup-password">
                                    Password
                                </label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    required
                                />
                            </div>
                        </fieldset>
                        <button type="submit" className="btn-signup">
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

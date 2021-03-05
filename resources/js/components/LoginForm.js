import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/styles.css";

async function LoginUser(userInfo) {
    return await axios.post("/api/login", userInfo).then((res) => {
        return res.data.accessToken;
    });
}

async function registerUser(userInfo) {
    return await axios.post("/api/register", userInfo).then((res) => {
        return res.data.accessToken;
    });
}

export default function LoginForm({ setToken, setIsregister }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [name, setName] = useState("");
    const [password_confirmation, setpassword_confirmation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "" && password_confirmation === "") {
            const token = LoginUser({
                email,
                password,
            });
            token.then((r) => {
                setToken(r);
            });
        }
        if (name != "" && password_confirmation != "") {
            registerUser({
                name,
                email,
                password,
                password_confirmation,
            });
            setName("");
            setpassword_confirmation("");
        }
    };

    useEffect(() => {
        const switchers = [...document.querySelectorAll(".switcher")];
        switchers.forEach((item) => {
            item.addEventListener("click", function () {
                switchers.forEach((item) =>
                    item.parentElement.classList.remove("is-active")
                );
                this.parentElement.classList.add("is-active");
            });
        });
    }, []);

    return (
        <section className="forms-section">
            <h1 className="section-title">InstISEN</h1>
            <div className="forms">
                <div className="form-wrapper is-active">
                    <button type="button" className="switcher switcher-login">
                        Login
                        <span className="underline"></span>
                    </button>
                    <form className="form form-login" onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn-login">
                            Login
                        </button>
                    </form>
                </div>
                <div className="form-wrapper">
                    <button type="button" className="switcher switcher-signup">
                        Sign Up
                        <span className="underline"></span>
                    </button>
                    <form className="form form-signup" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>
                                Please, enter your email, password and password
                                confirmation for sign up.
                            </legend>
                            <div className="input-block">
                                <label htmlFor="signup-name">Pseudo</label>
                                <input
                                    id="signup-password-confirmation"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <label htmlFor="signup-email">E-mail</label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                <label htmlFor="signup-password-confirmation">
                                    Password Confirmation
                                </label>
                                <input
                                    id="signup-password-confirmation"
                                    type="password"
                                    onChange={(e) =>
                                        setpassword_confirmation(e.target.value)
                                    }
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

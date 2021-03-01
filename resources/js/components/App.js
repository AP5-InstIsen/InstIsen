import React, { useState } from "react";
import ReactDOM from "react-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Header from "./Header";

function App() {
    const [token, setToken] = useState();
    const [isregister, setIsregister] = useState();

    if (!token && !isregister) {
        return (
            <LoginForm
                setToken={setToken}
                setIsregister={setIsregister}
            ></LoginForm>
        );
    }
    if (!token && isregister === "1") {
        return <RegisterForm setToken={setToken}></RegisterForm>;
    } else {
        console.log(`token Value : ${token}`);
        return (
            <Header token={token}></Header>
        );
    }
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}

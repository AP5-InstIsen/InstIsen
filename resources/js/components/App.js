import React, { useState } from "react";
import ReactDOM from "react-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Header from "./Header";

function App() {
    const [token, setToken] = useState();

    if (!token) {
        return (
            <LoginForm
                setToken={setToken}
            />
        );
    }
    else {
        console.log(`token Value : ${token}`);
        return (
            <Header AuthToken={token} setToken={setToken}/>
        );
    }
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}

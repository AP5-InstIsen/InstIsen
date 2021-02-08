import React, { useState } from "react";
import ReactDOM from "react-dom";
import RegisterForm from "./RegisterForm";
import MainPage from "./Mainpage";
import LoginForm from "./LoginForm";
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
        return <MainPage></MainPage>;
    }
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}

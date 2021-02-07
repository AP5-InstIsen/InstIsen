import React, { useState } from 'react';
import ReactDOM from "react-dom";
import RegisterForm from "./RegisterForm";
import MainPage from  "./Mainpage";
function App() {
    const [token,setToken] = useState();
    if(!token)
    {
        return (
            <RegisterForm setToken={setToken} ></RegisterForm>
        )
    }


    return (
        <MainPage></MainPage>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}

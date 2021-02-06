import React from "react";
import ReactDOM from "react-dom";
import RegisterForm from "./RegisterForm";

function App() {
    const [token,setToken] = useState();
    return (
        if(!token)
<RegisterForm setToken={setToken} ></RegisterForm>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}

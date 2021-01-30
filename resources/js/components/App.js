import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Name from "./SecondExample";

function App() {
    return (
        <div className="container">
            <Header></Header>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">
                            I'm an example component!
                        </div>
                    </div>
                    <Name name="John"></Name>
                    <Name name="Doe"></Name>
                </div>
            </div>
        </div>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}

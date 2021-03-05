import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import Picture from "./Picture";
import Favorites from "./Favorites";
import Home from "./Home";
import Logout from "./Logout";
import UploadImageForm from "./UploadImageForm";
import MainPage from "./Mainpage"

export default function Header(AuthToken) {

    return (
        <header>
            <nav>
                <BrowserRouter>
                    <div>
                        <ul className="menu expanded">
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </ul>
                        <div className="small 12 columns">
                            <div className="button-group">
                                <Link to="/home">
                                    <i className="fas fa-home"></i>
                                    <a className="button">Home</a>
                                </Link>
                                <Link to="/picture">
                                    <a className="button">Picture</a>
                                </Link>
                                <Link to="/favorites">
                                    <a className="button">Favorites</a>
                                </Link>
                                <Link to="/profile">
                                    <a className="button">profile</a>
                                </Link>
                            </div>
                        </div>
                        <div className="main-route-place">
                            <Route exact path="/home" component={() => <MainPage AuthToken={AuthToken} />} />
                            <Route exact path="/logout" component={Logout}/>
                            <Route exact path="/profile" component={() => <Profile AuthToken={AuthToken.token} />} />
                            <Route exact path="/picture" component={() => <UploadImageForm AuthToken={AuthToken} />} />
                            <Route exact path="/favorites" component={Favorites} />
                            <Route exact path="/" component={() => <MainPage AuthToken={AuthToken} />} />
                        </div>
                    </div>
                </BrowserRouter>
            </nav>
        </header>
    );
}

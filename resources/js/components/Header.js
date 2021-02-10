import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import Picture from "./Picture";
import Favorites from "./Favorites";
import Home from "./Home";
import Logout from "./Logout";

export default function Header() {
    console.log("Header");
    return (
        <header>
            <nav>
                <BrowserRouter>
                    <div>
                        <ul class="menu align-right">
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </ul>
                        <div class="small 12 columns">
                            <div class="button-group">
                                <Link to="/home">
                                    <i class="fas fa-home"></i>
                                    <a class="button">Home</a>
                                </Link>
                                <Link to="/picture">
                                    <a class="button">Picture</a>
                                </Link>
                                <Link to="/favorites">
                                    <a class="button">Favorites</a>
                                </Link>
                            </div>
                        </div>
                        <div className="main-route-place">
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/logout" component={Logout}/>
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/picture" component={Picture} />
                            <Route exact path="/favorites" component={Favorites} />
                            
                        </div>
                    </div>
                </BrowserRouter>
            </nav>
        </header>
    );
}

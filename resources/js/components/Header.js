import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import Picture from "./Picture";
import Favorites from "./Favorites";
import Search from "./Search";
import Home from "./Home";

const Header = () => (
    <header>
        <nav>
            <BrowserRouter>
                <div>
                    <ul class="menu align-right">
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/login">Logout</Link>
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
                            <Link to="/search">
                                <a class="button">Search</a>
                            </Link>
                        </div>
                    </div>
                    <div className="main-route-place">
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/picture" component={Picture} />
                        <Route exact path="/favorites" component={Favorites} />
                        <Route exact path="/search" component={Search} />
                    </div>
                </div>
            </BrowserRouter>
        </nav>
    </header>
);

export default Header;

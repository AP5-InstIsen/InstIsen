import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import Picture from "./Picture";
import Favorites from "./Favorites";
import Home from "./Home";
import Logout from "./Logout";

export default function Header() {
    return (
        <header>
            <nav>
                <BrowserRouter>
                    <div>
                        <div
                            class="title-bar"
                            data-responsive-toggle="example-animated-menu"
                            data-hide-for="medium"
                        >
                            <button
                                class="menu-icon"
                                type="button"
                                data-toggle
                            ></button>
                            <div class="title-bar-title">Menu</div>
                        </div>
                        <div
                            class="top-bar"
                            id="example-animated-menu"
                            data-animate="hinge-in-from-top spin-out"
                        >
                            <div class="top-bar-left">
                                <ul class="dropdown menu" data-dropdown-menu>
                                    <li class="menu-text">InstISEN</li>
                                    <li>
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/picture">Picture</Link>
                                    </li>
                                    <li>
                                        <Link to="/favorites">Favorites</Link>
                                    </li>
                                </ul>
                            </div>
                            <div class="top-bar-middle">
                                <ul class="dropdown menu" data-dropdown-menu>
                                    <li>
                                        <input
                                            type="search"
                                            placeholder="Search"
                                        />
                                    </li>
                                    <li>
                                        <button type="button" class="button">
                                            Search
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div class="top-bar-right"></div>
                            <ul class="dropdown menu" data-dropdown-menu>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/logout">Logout</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="main-route-place">
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/logout" component={Logout} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/picture" component={Picture} />
                            <Route
                                exact
                                path="/favorites"
                                component={Favorites}
                            />
                        </div>
                    </div>
                </BrowserRouter>
            </nav>
        </header>
    );
}

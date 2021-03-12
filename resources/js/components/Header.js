import React, { useState, useEffect }from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import Picture from "./Picture";
import Favorites from "./Favorites";
import Home from "./Home";
import Logout from "./Logout";
import UploadImageForm from "./UploadImageForm";
import MainPage from "./Mainpage"
import axios from "axios";

export default function Header(AuthToken) {
    const [tagList,SetTagList] = useState();
    const BearerToken = 'Bearer '+AuthToken.token;

    let config = {
        headers: {
            Authorization: BearerToken,
        }
    }
    const handleSubmit = async e => {
        const data = new FormData();
        data.append("tag",tagList)
        const tmp = axios.post('/api/search_by_tag', data, config)
        tmp.then( resp =>{
            console.log(resp.data)
        })
    console.log(e.target)
    }


    return (
        <header>
        <nav>
            <BrowserRouter>
                <div>
                    <div
                        className="title-bar"
                        data-responsive-toggle="example-animated-menu"
                        data-hide-for="medium"
                    >
                        <button
                            className="menu-icon"
                            type="button"
                            data-toggle
                        ></button>
                        <div className="title-bar-title">Menu</div>
                    </div>
                    <div
                        className="top-bar"
                        id="example-animated-menu"
                        data-animate="hinge-in-from-top spin-out"
                    >
                        <div className="top-bar-left">
                            <ul className="dropdown menu" data-dropdown-menu>
                                <li className="menu-text">InstISEN</li>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/picture">Picture</Link>
                                </li>
                                <li>
                                    <Link to="/favorites">Favorites</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="top-bar-middle">
                            <ul className="dropdown menu" data-dropdown-menu>
                            <form onSubmit={handleSubmit} >

                                        <input
                                            type="text"
                                            placeholder="Search"
                                            name="tag"
                                        />
                                        <input type="submit" value="lol" className="button" />
                                </form>

                            </ul>
                        </div>
                        <div className="top-bar-right"></div>
                        <ul className="dropdown menu" data-dropdown-menu>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                        <div className="main-route-place">
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




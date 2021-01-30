import React from "react";

const Header = () => (
    <header>
        <nav>
            <ul class="menu align-right">
                <li>
                    <a href="#">One</a>
                </li>
                <li>
                    <a href="#">Two</a>
                </li>
                <li>
                    <a href="#">Three</a>
                </li>
                <li>
                    <a href="#">Four</a>
                </li>
            </ul>
            <div class="small 12 columns">
                <div class="button-group">
                    <a class="secondary button">View</a>
                    <a class="success button">Edit</a>
                    <a class="warning button">Share</a>
                    <a class="alert button">Delete</a>
                </div>
            </div>
        </nav>
    </header>
);

export default Header;

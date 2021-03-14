import React, { useEffect } from "react";
import { Redirect} from "react-router-dom";

import axios from "axios";

export default function Logout({ setToken, AuthToken }) {
    let  logout="";
    console.log(AuthToken)
    const data = new FormData();
    const BearerToken = "Bearer " + AuthToken;
    let config = {
        headers: {
            Authorization: BearerToken,
        },
    };
    useEffect(() => {
        axios
            .post("./api/logout", data, config)
            .then((resp) => {
                setToken()
            });
    },[]);

    return (<Redirect push to ="/login"/>)


}


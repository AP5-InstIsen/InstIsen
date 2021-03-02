import React from "react";
import axios from "axios";

async function LogoutUser() {
    return axios.post("./api/logout").then(() => (location.href = "/"));
}

export default LogoutUser;

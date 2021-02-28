import React from "react";
import axios from "axios";

async function Logout(data, header) {
    return axios.post("./api/logout", data, header).then((res) => {
        return res;
    });
}

export default function LogoutForm(AuthToken) {
    const BearerToken = "Bearer " + AuthToken.token;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append(null);
        let config = {
            headers: {
                Authorization: BearerToken,
            },
        };
        const token = Logout(data, config);

        return <form onSubmit={handleSubmit}></form>;
    };
}

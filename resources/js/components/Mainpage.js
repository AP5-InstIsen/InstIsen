import React from "react";
import Header from "./Header";



async function GetImageIdList(Token)
{
    const data = new FormData();
    let config = {
        headers: {
            Authorization: Token,
        }
    }
    return axios.post('/api/get_wall',data,config)
        .then(res =>{
            console.log(`results api getWall : ${res}`)
            return res;
        })
}


export default function MainPage(AuthToken)
{
    const BearerToken = 'Bearer '+AuthToken.AuthToken.token;
    GetImageIdList(BearerToken);
    return(
        <div>
            <p>{BearerToken}</p>
        </div>
    )
}


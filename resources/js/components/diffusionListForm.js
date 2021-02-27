import React, { useState, useEffect }from 'react';
import axios from 'axios';

async function uploadImage(data,header)
{
    return axios.post('/api/upload', data,header)
        .then(res =>{
            return res;
        })
}


export default  function UploadImageForm(AuthToken)
{
    const BearerToken = 'Bearer '+AuthToken.AuthToken.token;
    let config = {
        headers: {
            Authorization: BearerToken,
        }
    }
    const [DiffusionListName, setDiffusionListName] = useState();
    const [UserList, setUserList] = useState([]);
    const [BroadcastList, setBroadcastList] = useState();

    useEffect(() =>{
        let list = [];
        const tmp = axios.post('/api/get_users_list', null, config)
        tmp.then( resp =>{
            setUserList(resp.data.users)
        })
    },[]);

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', DiffusionListName);


        await uploadImage(data,config);
    }
    const legendChangedHandler = async e =>{
        setLegend(e.target.value)
    }
    const userListChangeHandler = e => {
        console.log(e.target)
    }
    return (
        <div className="grid-container">
            <form onSubmit={handleSubmit}>
                <div className="grid-x grid-padding-x">
                    <div className="medium-6 cell">
                        <label>Image to send
                            <input type="mail" onChange={legendChangedHandler} required/>
                        </label>
                        <label>
                            liste de diffusion
                            <input type="text" list="data" onChange={userListChangeHandler} required/>
                            <datalist id="data">
                                {UserList.map((item) =>
                                    <option key={item.id} value={item.email} />
                                )}
                            </datalist>
                        </label>
                        <input type="submit" value="enregistrer"/>
                    </div>
                </div>
            </form>
            {$imagePreview}
        </div>

    );
}





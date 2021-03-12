import React, { useState, useEffect }from 'react';
import axios from 'axios';

async function uploadDiffusionList(data,header)
{
    return axios.post('/api/create_broadcast_list', data,header)
        .then(res =>{
            return res;
        })
}


export default  function DiffusionListForm(AuthToken)
{
    const BearerToken = 'Bearer '+AuthToken.AuthToken;
    console.log(BearerToken)
    let config = {
        headers: {
            Authorization: BearerToken,
        }
    }
    const [DiffusionListName, setDiffusionListName] = useState();
    const [UserList, setUserList] = useState([]);
    const [BroadcastList,SetBroadcastList] = useState();


    useEffect(() =>{
        const tmp = axios.post('/api/get_users_list', null, config)
        tmp.then( resp =>{
            setUserList(resp.data.users)
        })
    },[]);
    const handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', DiffusionListName);
        const tab = BroadcastList.split(",")
        let tmp = [];
        for (const i in tab) {
            for (const j in UserList){
                if(tab[i] === UserList[j].email){
                    tmp.push(UserList[j].id);
                }
            }
        }
        console.log(tmp.join(","))
        data.append("broadcast",tmp.join(","));
console.log(data)
        await uploadDiffusionList(data,config);
    }
    const DiffusionListNameChangeHandler = async e =>{
        setDiffusionListName(e.target.value)
    }
    const BroadcastListListChangeHandler = async e =>{
        SetBroadcastList(e.target.value)
    }
    return (
        <div className="grid-container">
            <form onSubmit={handleSubmit}>
                <label>
                    nom de la liste de diffusion
                    <input type="text"  onChange={DiffusionListNameChangeHandler} required/>
                </label>
                        <label>
                            liste de diffusion
                            <input type="email" list="data" onChange={BroadcastListListChangeHandler} multiple   required/>
                                <datalist id="data">
                                    {UserList.map((item) =>
                                        <option key={item.id} value={item.email} />
                                    )}
                                </datalist>
                        </label>
                        <input type="submit" value="enregistrer"/>
            </form>
        </div>

    );
}





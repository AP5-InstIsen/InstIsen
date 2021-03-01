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
    const [path, setPath] = useState();
    const [ImageSelected, setImageSelected] = useState();
    const [Legend, setLegend] = useState();
    const [UserList, setUserList] = useState([]);
    const [BroadcastList,SetBroadcastList] = useState();

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
        data.append('image', ImageSelected);
        data.append('legend',Legend);
        data.append('id_broadcast_list',BroadcastList)

        await uploadImage(data,config);
    }
    const legendChangedHandler = async e =>{
    setLegend(e.target.value)
    }
    const fileChangedHandler = e => {
         setImageSelected(e.target.files[0])
         let reader = new FileReader();
         reader.onloadend = () => {
                setPath(reader.result);
         }
         reader.readAsDataURL(e.target.files[0])
     }
    const userListChangeHandler = e => {
    console.log(e.target
    )
    }
    let $imagePreview = (<div className="previewText image-container">Please select an Image file for Display</div>);
    if (path) {
        $imagePreview = (<div className="image-container" ><img src={path} alt="icon" width="400" /> </div>);
    }
    return (
        <div className="grid-container">
        <form onSubmit={handleSubmit}>
                <div className="grid-x grid-padding-x">
                    <div className="medium-6 cell">
                        <label>Image to send
                            <input type="hidden" name="MAX_FILE_SIZE" value="15000000" />
                            <input type="file" onChange={fileChangedHandler} required/>
                        </label>
                        <label> légende de la photo
                             <input type="text" onChange={legendChangedHandler} required/>
                        </label>
                        <label>
                            liste de diffusion
                            <input type="text" list="data" onChange={userListChangeHandler} required/>
                            <datalist id="data">
                                {UserList.map((item) =>
                                    <option key={item.id} value={item.email} />
                                )}
                            </datalist>
                            <p className="help-text" >tu n'as pas encore crée de liste de diffusion ? clique <a  >ici</a></p>
                        </label>
                        <input type="submit" value="enregistrer"/>
                    </div>
                </div>
        </form>
            {$imagePreview}
        </div>

    );
}





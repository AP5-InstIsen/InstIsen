import React, { useState, useEffect }from 'react';
import axios from 'axios';
import ImageDisplay from './ImageDisplay'

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
    const [BroadcastList,SetBroadcastList] = useState([]);
    const [BroadcastListName,setBroadcastListName] = useState();
    const [Tags, setTags] = useState();
   useEffect(() =>{
       const tmp = axios.post('/api/get_broadcast_lists', null, config)
       tmp.then( resp =>{
           console.log(resp.data.broadcast_lists)
           SetBroadcastList(resp.data.broadcast_lists)
       })
   },[]);

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        for( const i in BroadcastList)
        {
            if(BroadcastListName === BroadcastList[i].name)
            {
                data.append('id_broadcast_list',BroadcastList[i].id);
                console.log(BroadcastList[i])
            }
        }

        data.append('image', ImageSelected);
        data.append('legend',Legend);
        data.appen('tags',Tags)
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
    setBroadcastListName(e.target.value)
    }

    const tagsChangedHandler = e => {
        setTags(e.target.value)
    }

    let $imagePreview = (<div className="previewText image-container">Please select an Image file for Display</div>);
    if (path) {
        $imagePreview = (
        <div className="image-container" >

            <ImageDisplay src={path} legend={Legend} note={5} token={BearerToken}  tagsList={Tags} preview={"1"}/>
        </div>);
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
                                {BroadcastList.map((item) =>
                                    <option key={item.id} value={item.name} />
                                )}
                            </datalist>
                            <p className="help-text" >tu n'as pas encore crée de liste de diffusion ? clique <a  >ici</a></p>
                        </label>
                        <label> tags de la photo
                            <input type="text" onChange={tagsChangedHandler} required/>
                        </label>
                        <input type="submit" value="enregistrer"/>
                    </div>
                </div>
        </form>
            {$imagePreview}
        </div>

    );
}





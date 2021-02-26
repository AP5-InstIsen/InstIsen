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
    const [UserList, setUserList] = useState();
    useEffect(()=>{
        const fetchData = async () => {
            const tmp = await axios.post('/api/get_users_list',null,config)
            setUserList(tmp.data);
        };
        fetchData();
    },[])
    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append('image', ImageSelected);
        data.append('legend',Legend)
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
    let $imagePreview = (<div className="previewText image-container">Please select an Image file for Display</div>);

    if (path)
    {
        $imagePreview = (<div className="image-container" ><img src={path} alt="icon" width="400" /> </div>);
    }
    return (
        <div className="grid-container">
        <form onSubmit={handleSubmit}>

                <div className="grid-x grid-padding-x">
                    <div className="medium-6 cell">
                        <label>Image to send
                            <input type="hidden" name="MAX_FILE_SIZE" value="15000000" />
                            <input type="file" onChange={fileChangedHandler}/>
                        </label>
                        <label> légende de la photo
                             <input type="text" onChange={legendChangedHandler}/>
                        </label>
                        <label>
                            liste de diffusion
                            <input type="text" list="data" onChange={legendChangedHandler} />

                            <datalist id="data">
                                {
                                    UserList.map(test =>{
                                        console.log(test)
                                    })
                               }
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





import React, { useState } from 'react';
import axios from 'axios';


async function uploadImage(data,header)
{
    return axios.post('/api/upload', data,header)
        .then(res =>{
            return res;
        })
}

export default function UploadImageForm(AuthToken)
{
    const BearerToken = 'Bearer '+AuthToken.AuthToken.token;

    const [path, setPath] = useState();
    const [ImageSelected, setImageSelected] = useState();
    console.log(`token Value in UploadImageForm : ${BearerToken}`);

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append('image', ImageSelected);
        let config = {
            headers: {
                Authorization: BearerToken,
            }
        }
        const  token = uploadImage(data,config);

    }
     const fileChangedHandler = e => {
        console.log(e.target.files[0])
         setImageSelected(e.target.files[0])
         let reader = new FileReader();
         reader.onloadend = () => {
                setPath(reader.result);
                console.log(path)
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
                            <input type="file" onChange={fileChangedHandler}
                            />
                        </label>
                        <input type="submit" value="enregistrer"/>
                    </div>
                </div>
        </form>
            {$imagePreview}
        </div>

    );
}





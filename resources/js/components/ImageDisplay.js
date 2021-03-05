import React, { useState } from 'react';
import axios from "axios";






export default function ImageDisplay({src, legend,note,token,idImage}) {

    const [noteImage, setNote] = useState(note);
    const [noteForm, SetnoteForm] = useState();
    let config = {
        headers: {
            Authorization: token,
        }
    }
    let Ntes = note
    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append("idImage",idImage);
        data.append("note",noteForm)
        Updatenote(data,config);
    }
    async function Updatenote(userInfo,header) {
        axios.post('/api/create_user_note', userInfo,header)
            .then(res =>{
                setNote(res.data.userNote.note)
            })
    }

    return(
        <div className="grid-container fluid">
            <div className="grid-x grid-margin-x">
                <div className="cell-2">
                    <p>Legend {legend}</p>
                    <img src={src}  width="300" height="300"/>
                    <p> Note : {noteImage}</p>
                     <form onSubmit={handleSubmit}>
                         <input
                             type="text"
                             name="note"
                             placeholder="5"
                             onChange={e => SetnoteForm(e.target.value)}
                         />
                         <input type="submit" value="voter"/>
                    </form>
                </div>
            </div>
        </div>
    )

}

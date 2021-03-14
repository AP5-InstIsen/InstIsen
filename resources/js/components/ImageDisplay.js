import React, { useState } from "react";
import axios from "axios";

export default function ImageDisplay({
    src,
    legend,
    note,
    token,
    idImage,
    tagsList,
    preview,
}) {
    const [noteImage, setNote] = useState(note);
    const [noteForm, SetnoteForm] = useState();
    let config = {
        headers: {
            Authorization: token,
        },
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("idImage", idImage);
        data.append("note", noteForm);
        Updatenote(data, config);
    };
    async function Updatenote(userInfo, header) {
        axios.post("/api/create_user_note", userInfo, header).then((res) => {
            setNote(res.data.userNote.note);
        });
    }

    if (preview === "1") {
        return (
            <div className="grid-container fluid">
                <div className="container-center">
                    <div className="grid-x grid-margin-x">
                        <div className="center">
                            <h4>Legend {legend}</h4>
                            <img src={src} width="300" height="300" />
                            <h4> Note : {noteImage}</h4>
                            <h4>Tags = {tagsList}</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (preview === "0") {
        return (
            <div className="grid-container fluid">
                <div className="grid-x grid-margin-x">
                    <div className="center">
                        <h4>Legend {legend}</h4>
                        <img src={src} width="300" height="300" />
                        <h4> Note : {noteImage}</h4>
                        <h4>Tags = {tagsList}</h4>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="note"
                                placeholder="5"
                                onChange={(e) => SetnoteForm(e.target.value)}
                            />
                            <input type="submit" value="voter" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

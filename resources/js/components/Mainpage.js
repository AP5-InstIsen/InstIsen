import React, { useEffect, useState } from "react";
import ImageDisplay from "./ImageDisplay";

export default function MainPage(AuthToken) {
    const [ImageList, setImageList] = useState({ images_list: [] });

    console.log(`ImageList ${ImageList}`);
    {
        useEffect(GetImageIdList, []);
    }

    const BearerToken = "Bearer " + AuthToken.AuthToken.token;

    function GetImageIdList() {
        const data = new FormData();
        let config = {
            headers: {
                Authorization: BearerToken,
            },
        };
        axios.post("/api/get_wall", data, config).then((res) => {
            setImageList(res.data);
        });
    }

    const classNames = `Wall `;
    return (
        <div className={classNames}>
            {ImageList.images_list.map((image) => (
                <ImageDisplay
                    src={image.path}
                    key={image.id}
                    legend={image.legend}
                    note={image.note}
                    token={BearerToken}
                    idImage={image.id}
                    tagsList={image.tags}
                    preview={"0"}
                />
            ))}
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import ImageDisplay from "./ImageDisplay";



export default function MainPage(AuthToken)
{
    const [ImageList,setImageList] = useState({"images_list":[]});
    useEffect(GetImageIdList, []);
    const BearerToken = 'Bearer '+AuthToken.AuthToken.token;

     function GetImageIdList()
    {
        const data = new FormData();
        let config = {
            headers: {
                Authorization: BearerToken,
            }
        }
         axios.post('/api/get_wall',data,config)
            .then(res =>{

                console.log(`results api getWall : ${res.data}`)
                setImageList(res.data);
            })
    }

    const classNames = `videoList ${ImageList?.length ? '' : 'is-loading'}`;
    return (
        <div className="container">
            <header>
                <h1>Recommandations</h1>
            </header>
            <div className={classNames}>
                {
                    ImageList.images_list.map(image => (
                    <ImageDisplay src={image.path} key={image.id} legend={image.legend} note={image.note} token={BearerToken} idImage={image.id} preview={"0"}/>
                ))}
            </div>
        </div>
    );
}


import React, { useEffect, useState } from 'react';




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
                {ImageList.images_list.map(image => (
                    <img src={image.path} key={image.id}/>
                ))}
            </div>
        </div>
    );
}


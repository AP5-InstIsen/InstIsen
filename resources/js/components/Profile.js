import React from "react";
import DiffusionListForm from "./diffusionListForm"

export default function Profile(AuthToken) {
        return (
            <div>
                <DiffusionListForm AuthToken={AuthToken.AuthToken}/>
            </div>
        );
    }




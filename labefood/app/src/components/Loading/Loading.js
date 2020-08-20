import React from "react";
import { LoadingContainer, LoadingElipses, LoadingElipse } from "./styles";

export const Loading = () => {

    return (
        <LoadingContainer>
           <LoadingElipses>
                <LoadingElipse />
                <LoadingElipse />
                <LoadingElipse />
                <LoadingElipse />
            </LoadingElipses> 
        </LoadingContainer>
    )
}
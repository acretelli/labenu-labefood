import React from "react";
import { useHistory } from "react-router-dom";
import { ErrorContainer, ErrorMessage } from "./styles";

export const ErrorPage = () => {
    const history = useHistory();
    const goToHome = () => {
        history.push('/restaurants')
    }

    return (
        <ErrorContainer>
           <ErrorMessage>Ops, há algo errado que não está certo o.O</ErrorMessage>
           <button onClick={goToHome}>Voltar para um lugar seguro</button>
           <ErrorMessage>Ai que loucura!</ErrorMessage>
        </ErrorContainer>
    )
}
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LogoImg, HomeContainer } from "./styles";

import logoLabefood from "../../images/labefood-white.svg";

export const HomeAnimation = () => {
    const history = useHistory();

    const animateOut = () => {
        setTimeout(() => {
        history.push('/restaurants')
        }, 3000)
    }

    useEffect(() => {
        animateOut();
    }, [])

    return (
        <HomeContainer>
           <LogoImg src={logoLabefood} alt="Logo da Labefood" /> 
        </HomeContainer>
    )
}
import React from "react";
import { useHistory } from "react-router-dom";
import { Footer, MenuContainer, MenuIcon } from "./styles";

export const Menu = () => {
    const history = useHistory();

    const goToHome = () => {
        history.push('/restaurants')
    }

    const goToCart = () => {
        history.push('/cart')
    }

    const goToProfile = () => {
        history.push('/profile')
    }

    return (
        <Footer>
            <MenuContainer>
                <MenuIcon onClick={goToHome}>home</MenuIcon>
                <MenuIcon onClick={goToCart}>cart</MenuIcon>
                <MenuIcon onClick={goToProfile}>profile</MenuIcon>
            </MenuContainer>
        </Footer>
    )
}
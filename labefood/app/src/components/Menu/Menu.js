import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Footer, MenuContainer, MenuIcon } from "./styles";

import iconHome from "../../images/home.svg";
import iconCart from "../../images/cart.svg";
import iconUser from "../../images/user.svg";

import iconHomeActive from "../../images/home-active.svg";
import iconCartActive from "../../images/cart-active.svg";
import iconUserActive from "../../images/user-active.svg";

export const Menu = () => {
    const history = useHistory();
    const location = useLocation();

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
                <MenuIcon onClick={goToHome} src={location.pathname === '/restaurants' ? iconHomeActive : iconHome} alt="Botão Home"/>
                <MenuIcon onClick={goToCart} src={location.pathname === '/cart' ? iconCartActive : iconCart} alt="Botão Carrinho"/>
                <MenuIcon onClick={goToProfile} src={location.pathname === '/profile' ? iconUserActive : iconUser} alt="Botão Perfil"/>
            </MenuContainer>
        </Footer>
    )
}
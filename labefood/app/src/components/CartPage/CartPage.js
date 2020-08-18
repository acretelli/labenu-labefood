import React from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { Menu } from "../Menu/Menu";

export const CartPage = () => {

    return (
        <div className="container">
            <h2>Carrinho</h2>
            <Menu />
        </div>
    )
}
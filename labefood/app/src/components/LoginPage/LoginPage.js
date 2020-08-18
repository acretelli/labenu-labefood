import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from '../../context/AppContext';
import { Menu } from '../Menu/Menu'

export const LoginPage = () => {

    return (
        <div className="container">
            <Menu />
            <h2>Login</h2>
            <form>
                <div className="textfield">
                    <label for="email">E-mail</label>
                    <input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@email.com"
                    />
                </div>
                <div className="textfield">
                    <label for="password">Senha</label>
                    <input 
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>
            </form>
        </div>
    )
}
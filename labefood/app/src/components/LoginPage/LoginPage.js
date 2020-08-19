import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { baseUrl } from '../../variables/variables';
import { Menu } from '../Menu/Menu';
import AppContext from "../../context/AppContext";

import { MainContainer, Container, Header, TextLarge, TextRegular } from "../../styles/mainStyles";

export const LoginPage = () => {
    const appContext = useContext(AppContext);
    const history = useHistory();
    const { form, onChange, resetForm } = useForm({ email: "", password: ""});

    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value)
    }

    const handleLogin = event => {
        event.preventDefault();
        const body = {
            "email": form.email,
            "password": form.password,
        }

        axios.post(`${baseUrl}/login`, body)
        .then( response => {
            window.localStorage.setItem("token", response.data.token);
            getProfile(response.data.token)
            history.push('/restaurants');
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getProfile = token  => {
        axios.get(`${baseUrl}/profile`, {
            headers: {
                auth: token,
            }
        })
        .then( response => {
            appContext.dispatch({ type: "LOAD_PROFILE", profile: response.data.user });
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <MainContainer>
            <TextRegular>Entre</TextRegular>
            <form onSubmit={handleLogin}>
                <div className="textfield">
                    <label htmlFor="email">E-mail</label>
                    <input 
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        placeholder="email@email.com"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="textfield">
                    <label htmlFor="password">Senha</label>
                    <input 
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        placeholder="Mínimo 6 caracteres"
                        onChange={handleInputChange}
                    />
                </div>
                <button>Entrar</button>
            </form>
            <TextRegular>
                Não possui cadastro? <Link to={`/signup`}>Clique aqui</Link></TextRegular>
        </MainContainer>
    )
}
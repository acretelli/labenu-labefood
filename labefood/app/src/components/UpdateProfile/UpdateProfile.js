import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from '../../context/AppContext';
import { useForm } from '../../hooks/useForm';
import { baseUrl } from '../../variables/variables';
import { useProtectedRoute } from "../../hooks/useProtectedRoute";

import { MainContainer, Container, Header, TextLarge, BackBtn } from "../../styles/mainStyles";

import iconBack from '../../images/back.svg';

export const UpdateProfile = (props) => {
    const appContext = useContext(AppContext);
    const { form, onChange, resetForm } = useForm({ 
        name: "", 
        email: "", 
        cpf:"",
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value)
    }

    const token = useProtectedRoute();
  
    const axiosConfig = {
      headers: {
        auth: token,
      }
    }

    const handleUpdateProfile = event => {
        event.preventDefault();

        const body = {
            "name": form.name,
            "email": form.email,
            "cpf": form.cpf
        }
        
        axios.put(`${baseUrl}/profile`, body, axiosConfig)
        .then( () => {
            alert('Sucesso')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <MainContainer>
            <Header><BackBtn src={iconBack} alt="Botão de voltar" onClick={props.onClick} /><TextLarge>Editar</TextLarge></Header>
            <Container>
                <form onSubmit={handleUpdateProfile}>
                    <div className="textfield">
                        <label htmlFor="name">Nome*</label>
                        <input 
                            required
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            placeholder={appContext.profile.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="email">E-mail*</label>
                        <input 
                            required
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            placeholder={appContext.profile.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="cpf">CPF*</label>
                        <input 
                            required
                            id="cpf"
                            name="cpf"
                            type="number"
                            value={form.cpf}
                            placeholder={appContext.profile.cpf}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button>Atualizar</button>
                </form>
            </Container>
        </MainContainer>
    )
}
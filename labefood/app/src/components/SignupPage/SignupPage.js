import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from '../../hooks/useForm';
import { baseUrl } from '../../variables/variables';
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
  
export const SignupPage = () => {
    const { form, onChange, resetForm } = useForm({ 
        name: "", 
        email: "", 
        cpf:"",
        password:"",
        passwordConfirm:"",
        street: "",
        number: "",
        neighbourhood: "",
        city: "",
        state: "",
        complement: "" 
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

    const handleSignupProfile = event => {
        event.preventDefault();

        const body = {
            "name": form.name,
            "email": form.email,
            "cpf": form.cpf,
            "password": form.password,
        }
        
        axios.put(`${baseUrl}/profile`, body, axiosConfig)
        .then( () => {
            alert('Sucesso')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleSignupAddress = event => {
        event.preventDefault();
        const body =  {
            "street": form.street,
            "number": form.number,
            "neighbourhood": form.neighbourhood,
            "city": form.city,
            "state": form.state,
            "complement": form.complement
        }
        axios.put(`${baseUrl}/address`, body, axiosConfig)
        .then( () => {
            alert("Sucesso")
        })
        .catch( err => {
            console.log(err)
        })
    }

    return (
        <div  className="container">
            <div>
                <h2>Cadastro</h2>
                <form onSubmit={handleSignupProfile}>
                    <div className="textfield">
                        <label for="name">Nome*</label>
                        <input 
                            required
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nome e sobrenome"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label for="email">E-mail*</label>
                        <input 
                            required
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email@email.com"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label for="cpf">CPF*</label>
                        <input 
                            required
                            id="cpf"
                            name="cpf"
                            type="number"
                            placeholder="000.000.000-00"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label for="password">Senha*</label>
                        <input 
                            required
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label for="password-confirm">Confirmar senha*</label>
                        <input 
                            required
                            id="password-confirm"
                            name="passwordConfirm"
                            type="password"
                            placeholder="Confirme a senha anterior"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button>Cadastrar</button>
                </form>
            </div>
            <div>
                <h2>Endereço</h2>
                <form onSubmit={handleSignupAddress}>
                    <div className="textfield">
                        <label for="street">Logradouro*</label>
                        <input 
                            required
                            id="street"
                            name="street"
                            type="text"
                            placeholder="Rua/ Av."
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label for="Número">Número*</label>
                        <input 
                            required
                            id="number"
                            name="number"
                            type="number"
                            placeholder="Número"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label for="complement">Complemento</label>
                        <input 
                            id="complement"
                            name="complement"
                            type="text"
                            placeholder="Apto./Bloco"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label for="neighbourhood">Bairro*</label>
                        <input 
                            required
                            id="neighbourhood"
                            name="neighbourhood"
                            type="text"
                            placeholder="Bairro"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label for="city">Cidade*</label>
                        <input 
                            required
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Cidade"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label for="state">Estado*</label>
                        <input 
                            required
                            id="state"
                            name="state"
                            type="text"
                            placeholder="Estado"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
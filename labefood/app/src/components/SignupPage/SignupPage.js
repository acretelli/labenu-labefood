import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { baseUrl } from '../../variables/variables';

import { MainContainer, Container, Header, TextLarge, BackBtn } from "../../styles/mainStyles";

import iconBack from "../../images/back.svg";

export const SignupPage = () => {
    const history = useHistory();
    const [ addressPage, setAddressPage ] = useState(false);
    const [ token, setToken ] = useState('');
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

    const handleSignupProfile = event => {
        event.preventDefault();
        const body = {
            "name": form.name,
            "email": form.email,
            "cpf": form.cpf,
            "password": form.password,
        }
        
        if ( form.password === form.passwordConfirm) {
            
            axios.post(`${baseUrl}/signup`, body)
            .then( response => {
                alert('Sucesso');
                setToken(response.data.token);
                setAddressPage(true);
            })
            .catch(err => {
                alert("Email ou cpf já cadastrados");
            });

        } else {
            alert("A confirmação de senha deve igual à senha.");
        }
    }

    const handleSignupAddress = event => {
        event.preventDefault();

        const axiosConfig = {
          headers: {
            auth: token,
          }
        }

        const body =  {
            "street": form.street,
            "number": form.number,
            "neighbourhood": form.neighbourhood,
            "city": form.city,
            "state": form.state,
            "complement": form.complement
        }

        if(form.street === "" || form.number === "" || form.neighbourhood === "" || form.city === "" || form.state === "") {
            alert("Você deve preencher todos os campos obrigatórios.")
        } else {
            axios.put(`${baseUrl}/address`, body, axiosConfig)
            .then( response => {
                window.localStorage.setItem("token", response.data.token);
                alert("Sucesso");
                history.push('/restaurants');
            })
            .catch( err => {
                console.log(err)
            })
        }
    }

    const goToLogin = () => {
        history.push('/login')
    }

    const goToSignUp = () => {
        setAddressPage(false)
    }

    return (
        <MainContainer>
            {!addressPage ? <Header><BackBtn src={iconBack} alt="Botão de voltar" onClick={goToLogin}/><TextLarge>Cadastro</TextLarge></Header> : <Header><BackBtn src={iconBack} alt="Botão de voltar" onClick={goToSignUp}/><TextLarge>Endereço</TextLarge></Header> }
            {!addressPage ? <Container>
                <form>
                    <div className="textfield">
                        <label htmlFor="name">Nome*</label>
                        <input 
                            required
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nome e sobrenome"
                            value={form.name}
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
                            placeholder="email@email.com"
                            value={form.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="cpf">CPF*</label>
                        <input 
                            required
                            id="cpf"
                            name="cpf"
                            type="text"
                            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                            placeholder="Digite um CPF no formato: 000.000.000-00"
                            value={form.cpf}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="password">Senha*</label>
                        <input 
                            required
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={form.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="password-confirm">Confirmar senha*</label>
                        <input 
                            required
                            id="password-confirm"
                            name="passwordConfirm"
                            type="password"
                            placeholder="Confirme a senha anterior"
                            value={form.passwordConfirm}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={handleSignupProfile}>Próximo</button>
                </form>
            </Container>: <Container>
                <h2>Endereço</h2>
                 <form onSubmit={handleSignupAddress}>
                    <div className="textfield">
                         <label htmlFor="street">Logradouro*</label>
                         <input 
                            required
                            id="street"
                            name="street"
                            type="text"
                            placeholder="Rua/ Av."
                            value={form.street}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="Número">Número*</label>
                        <input 
                            required
                            id="number"
                            name="number"
                            type="number"
                            placeholder="Número"
                            value={form.number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="complement">Complemento</label>
                        <input 
                            id="complement"
                            name="complement"
                            type="text"
                            placeholder="Apto./Bloco"
                            value={form.complement}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="neighbourhood">Bairro*</label>
                        <input 
                            required
                            id="neighbourhood"
                            name="neighbourhood"
                            type="text"
                            placeholder="Bairro"
                            value={form.neighbourhood}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="city">Cidade*</label>
                        <input 
                            required
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Cidade"
                            value={form.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="state">Estado*</label>
                        <input 
                            required
                            id="state"
                            name="state"
                            type="text"
                            placeholder="Estado"
                            value={form.state}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button>Salvar</button>
                </form>
            </Container>}
        </MainContainer>
    )
}
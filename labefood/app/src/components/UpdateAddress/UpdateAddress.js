import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import { useForm } from '../../hooks/useForm';
import { baseUrl } from '../../variables/variables';
import { useProtectedRoute } from "../../hooks/useProtectedRoute";

import { MainContainer, Container, Header, TextLarge, BackBtn } from "../../styles/mainStyles";
  
import iconBack from '../../images/back.svg';

export const UpdateAddress = (props) => {
    const [ address, setAddress ] = useState();
    const [ loading, setLoading ] = useState(true);
    const { form, onChange, resetForm } = useForm({
        street: "",
        number: "",
        neighbourhood: "",
        city: "",
        state: "",
        complement: "" 
    });

    const token = useProtectedRoute();
  
    const axiosConfig = {
      headers: {
        auth: token,
      }
    }

    useEffect(() => {
        axios.get(`${baseUrl}/profile/address`, axiosConfig)
        .then(response => {
            setAddress(response.data.address);
            setLoading(false);
        })
        .catch(err => {
            console.log(err.message);
        })
    }, [])

    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value)
    }

    const handleAddressUpdate = event => {
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
        <MainContainer>
            <Header><BackBtn src={iconBack} alt="Botão de voltar" onClick={props.onClick} /><TextLarge>Endereço</TextLarge></Header>
            <Container>
                {loading ? <Loading /> : <form onSubmit={handleAddressUpdate}>
                    <div className="textfield">
                        <label htmlFor="street">Logradouro*</label>
                        <input 
                            required
                            id="street"
                            name="street"
                            type="text"
                            value={form.street}
                            placeholder={address.street}
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
                            value={form.number}
                            placeholder={address.number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="textfield">
                        <label htmlFor="Complemento">Complemento</label>
                        <input 
                            id="Complemento"
                            name="complement"
                            type="text"
                            value={form.complement}
                            placeholder={address.complement}
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
                            value={form.neighbourhood}
                            placeholder={address.neighbourhood}
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
                            value={form.city}
                            placeholder={address.city}
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
                            value={form.state}
                            placeholder={address.state}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button>Atualizar</button>
                </form>}
            </Container>
        </MainContainer>
    )
}
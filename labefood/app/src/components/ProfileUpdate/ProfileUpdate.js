import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from '../../context/AppContext';
  
export const ProfileUpdate = () => {

    return (
        <div className="container">
            <div>
                <h2>Edite o Perfil</h2>
                <form>
                    <div className="textfield">
                        <label for="name">Nome*</label>
                        <input 
                            required
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nome e sobrenome"
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
                        />
                    </div>
                    <div className="textfield">
                        <label for="password-confirm">Confirmar senha*</label>
                        <input 
                            required
                            id="password-confirm"
                            name="password-confirm"
                            type="password"
                            placeholder="Confirme a senha anterior"
                        />
                    </div>
                    <button>Criar</button>
                </form>
            </div>
            <div>
                <h2>Endereço</h2>
                <form>
                    <div className="textfield">
                        <label for="street">Logradouro*</label>
                        <input 
                            required
                            id="street"
                            name="street"
                            type="text"
                            placeholder="Rua/ Av."
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
                        />
                    </div>
                    <div className="textfield">
                        <label for="Complemento">Complemento</label>
                        <input 
                            id="Complemento"
                            name="Complemento"
                            type="text"
                            placeholder="Apto./Bloco"
                        />
                    </div>
                    <div className="textfield">
                        <label for="region">Bairro*</label>
                        <input 
                            required
                            id="region"
                            name="region"
                            type="text"
                            placeholder="Bairro"
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
                        />
                    </div>
                    <button>Criar</button>
                </form>
            </div>
        </div>
    )
}
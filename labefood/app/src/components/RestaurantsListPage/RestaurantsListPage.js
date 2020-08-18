import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AppContext from '../../context/AppContext';
import { Menu } from '../Menu/Menu';
  
const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/restaurants";
  
const axiosConfig = {
  headers: {
    auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ikxtc1lsT3piZnM5T29hT2FvSVI4IiwibmFtZSI6IkFtYW5kYSBKb25hcyIsImVtYWlsIjoiYW1hbmRham9uYXNAZ21haWwuY29tIiwiY3BmIjoiMDEzLjg3MS42MTAtMjQiLCJoYXNBZGRyZXNzIjp0cnVlLCJhZGRyZXNzIjoiUnVhIHRlc3RlLCA3MiwgNzIgLSBDYXNhcsOjbyIsImlhdCI6MTU5NzcwNjQwNX0.O2dHVZ5mKN7TkZ88l0bc1kYPUgatu5XHxggFfNDNTss",
  }
}

export const RestaurantsListPage = () => {
    const [ loading, setLoading ] = useState(true);
    const appContext = useContext(AppContext);

    useEffect(() => {
        axios.get(baseUrl, axiosConfig)
        .then( response => {
            appContext.dispatch({ type: "LOAD_RESTAURANTSLIST", restaurantsList: response.data.restaurants });
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
        })
    }, [appContext.dispatch, setLoading]);

    return (
        <div>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <ul>
                    {appContext.restaurantsList.slice(0, 15).map(item => {
                        const { id, name, logoUrl, deliveryTime, shipping } = item;
                        return (
                            <li key={id}>
                                <Link to={`/restaurants/${id}`} data-testid={id}>
                                    <img src={logoUrl} alt={name} />
                                    <h3>{name}</h3>
                                    <p>{deliveryTime} min</p>
                                    <p>R${shipping.toFixed(2).replace(".", ",")}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
            <Menu />
        </div>
    )
}
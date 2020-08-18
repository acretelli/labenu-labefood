import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { Menu } from '../Menu/Menu';
  
const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/restaurants";
  
const axiosConfig = {
  headers: {
    auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ikxtc1lsT3piZnM5T29hT2FvSVI4IiwibmFtZSI6IkFtYW5kYSBKb25hcyIsImVtYWlsIjoiYW1hbmRham9uYXNAZ21haWwuY29tIiwiY3BmIjoiMDEzLjg3MS42MTAtMjQiLCJoYXNBZGRyZXNzIjp0cnVlLCJhZGRyZXNzIjoiUnVhIHRlc3RlLCA3MiwgNzIgLSBDYXNhcsOjbyIsImlhdCI6MTU5NzcwNjQwNX0.O2dHVZ5mKN7TkZ88l0bc1kYPUgatu5XHxggFfNDNTss",
  }
}

export const RestaurantItemPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const appContext = useContext(AppContext);

    const { name, logoUrl, products, category, deliveryTime, shipping, address} = appContext.activeRestaurant;

    useEffect(() => {
        axios
          .get(`${baseUrl}/${id}`, axiosConfig)
          .then( response => {
            appContext.dispatch({ type: "LOAD_SINGLE_RESTAURANT", restaurant: response.data.restaurant });
            setLoading(false);
          });
    }, [id, appContext.appDispatch]);

    let productsCategory = [];
    if(products) {
        const getCategories  = products.map( product => product.category);
        
        productsCategory = getCategories.filter( (category, idx) => {
            if(getCategories.indexOf(category) === idx) {
                return category
            }
        })
    }

    return (
        <div className="restaurant-item">
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div>
                    <h2>{name}</h2>
                    <p>{category}</p>
                    <img src={logoUrl} alt={name} />
                    <p>{deliveryTime} min</p>
                    <p>R${shipping.toFixed(2).replace('.', ',')}</p>
                    <p>{address}</p>
                    <div>
                        {products && productsCategory.map(category => {
                            return <ul key={category}>
                                    <h3>{category}</h3>
                                    {products.map(product => {
                                        if(category === product.category) {
                                            return (
                                                <li key={product.key}>
                                                    <h4>{product.name}</h4>
                                                    <p>{product.description}</p>
                                                    <p>{product.price}</p>
                                                    <img src={product.photoUrl} alt={product.name}/>
                                                </li>
                                            )
                                        }
                                    })}
                                </ul>
                            }
                        )}
                    </div>
                </div>
            )}
            <Menu />
        </div>
    )
}
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { Menu } from '../Menu/Menu';
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import { baseUrl } from '../../variables/variables';

import { MainContainer, Container, Header, TextLarge, FlexSpaceBetween, Card, CardRestaurantImg, CardProductImg, ProductCategories, TextContent, TextMedium, TextSmall, TextRegular } from "../../styles/mainStyles";
 
export const RestaurantItemPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ quantity, setQuantity ] = useState(0);
    const [ adding, setAdding ] = useState(false);
    const appContext = useContext(AppContext); 

    const token = useProtectedRoute();
    const axiosConfig = {
      headers: {
        auth: token,
      }
    }
    
    const { name, logoUrl, products, category, deliveryTime, shipping, address} = appContext.activeRestaurant;

    useEffect(() => {
        axios
          .get(`${baseUrl}/restaurants/${id}`, axiosConfig)
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

    const openQuantityBox = productId => {
        const indexId = products.findIndex( product => {
          return product.id === productId
        });
    
        const produto = products[indexId];
    
        setAdding(produto)
    }

    const sumToCounter = () => {
        appContext.dispatch({ type: "SUM_QUANTITY", count: appContext.count + 1 })
    };

    const subtractFromCounter = () => {
        if (appContext.count > 0) {
            appContext.dispatch({ type: "SUBTRACT_QUANTITY" });
        }
    };
  
    const addQuantity = (product, restaurantId) => {
        appContext.dispatch({ type: "ADD_TO_CART", product: product, restaurantId: restaurantId });
    }


    return (
        <MainContainer>
            <Header><TextLarge>Restaurante</TextLarge></Header>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <Container>
                    <CardRestaurantImg src={logoUrl} alt={name} />
                    <TextMedium>{name}</TextMedium>
                    <TextSmall>{category}</TextSmall>
                    <TextSmall>{address}</TextSmall>
                    <FlexSpaceBetween>
                        <TextSmall>{deliveryTime} min</TextSmall>
                        <TextSmall>Frete R${shipping.toFixed(2).replace('.', ',')}</TextSmall>
                    </FlexSpaceBetween>
                    <div>
                        {products && productsCategory.map(category => {
                            return <div key={category}>
                                    <ProductCategories>{category}</ProductCategories>
                                    {products.map(product => {
                                        if(category === product.category) {
                                            return <Card key={product.id}>
                                                    <FlexSpaceBetween>
                                                    <CardProductImg src={product.photoUrl} alt={product.name}/>
                                                    <TextContent>
                                                    <TextMedium>{product.name}</TextMedium>
                                                    <TextSmall>{product.description}</TextSmall>
                                                    <TextRegular>R$ {product.price.toFixed(2).replace(".", ",")}</TextRegular>
                                                    {appContext.cart.findIndex(productCart => product.id === productCart.id) === -1 ? <button onClick={() => openQuantityBox(product.id)}>Adicionar</button> : <button>Remover</button>}
                                                    </TextContent>
                                                    </FlexSpaceBetween>
                                                    {adding.id === product.id && <div>
                                                        <p>Selecione a quantidade desejada</p>
                                                        <div>
                                                            <div onClick={subtractFromCounter}>-</div>
                                                            <div>{appContext.count}</div>
                                                            <div onClick={sumToCounter}>+</div>
                                                        </div>
                                                        <button onClick={() => addQuantity(product, appContext.activeRestaurant.id)}>Adicionar</button>
                                                    </div> } 
                                                </Card>
                                        }
                                    })}
                                </div>
                            }
                        )}
                    </div>
                </Container>
            )}
            <Menu />
        </MainContainer>
    )
}
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { Menu } from '../Menu/Menu';
import { Loading } from '../Loading/Loading';
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import { baseUrl } from '../../variables/variables';

import { MainContainer, Container, Header, TextLarge, FlexSpaceBetween, Card, CardRestaurantImg, CardProductImg, ProductCategories, TextContent, TextMedium, TextSmall, TextRegular, QuantityValue, AddBtn, BackBtn } from "../../styles/mainStyles";

import { Overlay, BoxQuantity, BoxQuantityContainer, QuantityBtn, QuantityBtnContainer, QuantityCounter } from './styles';
 
import iconBack from "../../images/back.svg";

export const RestaurantItemPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ adding, setAdding ] = useState(false);
    const appContext = useContext(AppContext); 
    const history = useHistory();

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
  
    const removeQuantity = (product) => {
        appContext.dispatch({ type: "REMOVE_FROM_CART", product: product});
    }

    const addQuantity = (product, restaurantId) => {
        appContext.dispatch({ type: "ADD_TO_CART", product: product, restaurantId: restaurantId });
        setAdding(false);
    }
  
    const closeBoxQuantity = () => {
        setAdding(false);
    }

    const goToRestaurantsList = () => {
        history.push('/restaurants')
    }

    return (
        <MainContainer>
            {adding && <Overlay />}
            <Header><BackBtn src={iconBack} alt="Botão de voltar" onClick={goToRestaurantsList}/><TextLarge>Restaurante</TextLarge></Header>
            {loading ? (
                <Loading />
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
                                                    {appContext.cart && appContext.cart.map( productCart => product.id === productCart.id && <QuantityValue>{productCart.quantity}</QuantityValue>)}
                                                    {appContext.cart.findIndex(productCart => product.id === productCart.id) === -1 ? <AddBtn onClick={() => openQuantityBox(product.id)}>Adicionar</AddBtn> : <AddBtn onClick={() => removeQuantity(product)}>Remover</AddBtn>}
                                                    </TextContent>
                                                    </FlexSpaceBetween>
                                                    {adding.id === product.id && <BoxQuantityContainer>
                                                        <BoxQuantity>
                                                            <TextRegular>Selecione a quantidade desejada</TextRegular>
                                                            <QuantityBtnContainer>
                                                                <QuantityBtn onClick={subtractFromCounter}>-</QuantityBtn>
                                                                <QuantityCounter>{appContext.count}</QuantityCounter>
                                                                <QuantityBtn onClick={sumToCounter}>+</QuantityBtn>
                                                            </QuantityBtnContainer>
                                                            {appContext.count !== 0 ? <button onClick={() => addQuantity(product, appContext.activeRestaurant.id)}>Adicionar</button> : <button onClick={closeBoxQuantity}>Cancelar</button>}
                                                        </BoxQuantity>
                                                    </BoxQuantityContainer> } 
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
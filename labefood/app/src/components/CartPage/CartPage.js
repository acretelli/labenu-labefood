import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Menu } from "../Menu/Menu";
import { baseUrl } from "../../variables/variables";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import AppContext from "../../context/AppContext";

import { InputRadio, RadioField } from "./styles";
import { MainContainer, Container, Header, TextLarge, FlexSpaceBetween, Card, CardProductImg, ProductCategories, TextContent, TextMedium, TextSmall, TextRegular, QuantityValue, AddBtn, TextSmallRight, TextContentColor } from "../../styles/mainStyles";
import { Loading } from "../Loading/Loading";

export const CartPage = () => {
    const appContext = useContext(AppContext);
    const [ address, setAddress ] = useState();
    const [ paymentMethod, setPaymentMethod ] = useState();
    const [ loading, setLoading ] = useState(true);
    const token = useProtectedRoute();
    const axiosConfig = {
        headers: {
            auth: token,
        }
    }

    useEffect(() => {
        axios.get(`${baseUrl}/profile/address`, axiosConfig)
        .then( response => {
            setAddress(response.data.address);
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
        })
    }, [setLoading]);
    
    const restaurantOrder = appContext.restaurantsList.filter(restaurant => {
        if(appContext.cart.length !== 0  && restaurant.id === appContext.cart[0].restaurantId) {
        return restaurant
        }
    });

    const shipping = restaurantOrder.length !== 0 ? restaurantOrder[0].shipping : 0

    let total = 0;
    appContext.cart.forEach( product => {
        total = total + product.price * product.quantity;
    });
    const handleInputRadio = event => {
        setPaymentMethod(event.target.value)
    }

    const handlePlaceOrder = event => {
        event.preventDefault();

        const productsOrder = appContext.cart.map( product => {
            return {
                "quantity": Number(product.quantity),
                "id": product.id
            }
        });

        const restaurantId = appContext.cart[0].restaurantId;

        const body = {
            "products": productsOrder,
            "paymentMethod": paymentMethod
        }

        axios.post(`${baseUrl}/restaurants/${restaurantId}/order`, body, axiosConfig)
        .then( () => {
            alert("sucesso")
        })
        .catch( err => {
            console.log(err)
        })
    }

    return (
        <MainContainer>
            <Header><TextLarge>Meu carrinho</TextLarge></Header>
            {loading ? <Loading /> : (
                <TextContentColor>
                    <TextMedium>Endereço de entrega</TextMedium>
                    <TextSmall>{address.street}, {address.number} { address.apartment && <span>, {address.apartment}</span>}</TextSmall>
                </TextContentColor>
            )}
            <Container>
                {appContext.cart[0] ? appContext.restaurantsList.map(restaurant => {
                    if(restaurant.id === appContext.cart[0].restaurantId) {
                    return <div key={restaurant.id}>
                        <TextMedium>{restaurant.name}</TextMedium>
                        <TextSmall>{restaurant.address}</TextSmall>
                        <TextSmall>{restaurant.deliveryTime}</TextSmall>
                    </div>
                    }
                }) : <TextSmall>Não há produtos no carrinho.</TextSmall>}
                {appContext.cart.map(product => {
                    return <Card key={product.id}>
                        <FlexSpaceBetween>
                            <CardProductImg src={product.photoUrl} />
                            <TextContent>
                                <TextMedium>{product.name}</TextMedium>
                                <TextSmall>{product.descriptions}</TextSmall>
                                <TextSmall>R${product.price.toFixed(2).replace(".", ".")}</TextSmall>
                            </TextContent>
                        </FlexSpaceBetween>
                        <QuantityValue>{product.quantity}</QuantityValue>
                        <AddBtn>remover</AddBtn>
                    </Card>
                })}
                <TextSmallRight>Frete: R${shipping.toFixed(2).replace(".", ",")}</TextSmallRight>
                <TextMedium>Subtotal</TextMedium>
                <TextRegular>R$ {(total + shipping).toFixed(2).replace(".", ".")}</TextRegular>
                <ProductCategories>Forma de pagamento</ProductCategories>
                <form onSubmit={handlePlaceOrder}>
                    <RadioField>
                        <InputRadio 
                            type="radio" 
                            name="payment" 
                            value="money" 
                            id="money"
                            onChange={handleInputRadio}
                        />
                        <label htmlFor="money">Dinheiro</label>
                    </RadioField>
                    <RadioField>
                        <InputRadio 
                            type="radio" 
                            name="payment" 
                            value="creditcard" 
                            id="creditcard"
                            onChange={handleInputRadio}
                        />
                        <label htmlFor="creditcard">Cartão de crédito</label>
                    </RadioField>
                    <button>Confirmar</button>
                </form>
            </Container>
            <Menu />
        </MainContainer>
    )
}
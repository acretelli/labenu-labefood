import React, { useState, useEffect } from "react";
import axios from "axios";
import { ActiveOrderContainer, TextRegularWhite, ActiveOrderBox } from "./styles";
import { useProtectedRoute } from '../../hooks/useProtectedRoute';
import { baseUrl } from '../../variables/variables';

export const ActiveOrder = () => {
    const [ activeOrder, setActiveOrder ] = useState();
    const token = useProtectedRoute();

    const axiosConfig = {
        headers: {
          auth: token,
        }
    }

    useEffect(() => {
        axios.get(`${baseUrl}/active-order`, axiosConfig)
        .then( response => {
            setActiveOrder(response.data.order)
        })
        .catch( err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            {activeOrder ? <ActiveOrderContainer>
                <ActiveOrderBox>
                    <TextRegularWhite>Pedido em andamento</TextRegularWhite>
                    <p>{activeOrder.restaurantName}</p> 
                    <p><strong>SUBTOTAL: </strong>R$ {activeOrder.totalPrice.toFixed(2).replace(".", ",")}</p> 
                </ActiveOrderBox>
            </ActiveOrderContainer> : null}
        </>
    )
}
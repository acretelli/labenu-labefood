import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from '../../context/AppContext';
import { UpdateProfile } from "../UpdateProfile/UpdateProfile";
import { UpdateAddress } from "../UpdateAddress/UpdateAddress";
import { Menu } from "../Menu/Menu";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import { baseUrl } from "../../variables/variables";

import { MainContainer, Container, Header, TextLarge, Card, ProductCategories, TextContent, TextMedium, TextSmall, TextRegular } from "../../styles/mainStyles";
  
export const ProfilePage = () => {
    const appContext = useContext(AppContext);
    const [ loading, setLoading ] = useState(true);
    const [ currentPage, setCurrentPage ] = useState('profile');
    const [ ordersHistory, setOrdersHistory ] = useState();
    const token = useProtectedRoute();
    const axiosConfig = {
        headers: {
            auth: token,
        }
    }

    const getProfile = () => {
        axios.get(`${baseUrl}/profile`, axiosConfig)
        .then( response => {
            appContext.dispatch({ type: "LOAD_PROFILE", profile: response.data.user });
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getOrdersHistory = () => {
        axios.get(`${baseUrl}/orders/history`, axiosConfig)
        .then( response => {
            setOrdersHistory(response.data.orders);
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getProfile();
        getOrdersHistory();
    }, [appContext.dispatch, setLoading]);


    const formatDate = date => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-GB')
    }

    const onClickEditProfile = () => {
        setCurrentPage('edit')
    }

    const onClickEditAddress = () => {
        setCurrentPage('address')
    }

    const onClickGoBack = () => {
        setCurrentPage('profile')
    }

    const page = () => {
        switch(currentPage) {
            case 'edit':
                return <UpdateProfile onClick={onClickGoBack} />
            case 'address':
                return <UpdateAddress onClick={onClickGoBack} />
            default:
                return <MainContainer>
                <Header><TextLarge>Meu perfil</TextLarge></Header>
                {loading ? <p>Carregando...</p> : (
                    <Container>
                        <div>
                            <TextMedium>{appContext.profile.name}</TextMedium>
                            <TextSmall>{appContext.profile.email}</TextSmall>
                            <TextSmall>{appContext.profile.cpf}</TextSmall>
                            <button onClick={onClickEditProfile}>editar</button>
                            <TextMedium>Endereço cadastrado</TextMedium>
                            <TextSmall>{appContext.profile.address}</TextSmall>
                            <button onClick={onClickEditAddress}>editar</button>
                        </div>
                        <ProductCategories>Histórico de pedidos</ProductCategories>
                        {ordersHistory ? ordersHistory.map(order => {
                            return <Card key={order.createdAt}>
                                <TextContent>
                                    <TextMedium>{order.restaurantName}</TextMedium>
                                    <TextSmall>{formatDate(order.createdAt)}</TextSmall>
                                    <TextSmall>R$ {order.totalPrice.toFixed(2).replace(".", ",")}</TextSmall>
                                </TextContent>
                            </Card>
                        }) : <TextSmall>Você não realizou nenhum pedido</TextSmall>}
                    </Container>
                )}
            </MainContainer>;
        }
    }

    return (
        <MainContainer>
            {page()}
            <Menu />
        </MainContainer>
    )
}
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AppContext from '../../context/AppContext';
import { UpdateProfile } from "../UpdateProfile/UpdateProfile";
import { UpdateAddress } from "../UpdateAddress/UpdateAddress";
import { Menu } from "../Menu/Menu";
import { Loading } from "../Loading/Loading";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import { baseUrl } from "../../variables/variables";

import { MainContainer, Container, Header, TextLarge, Card, ProductCategories, TextContent, TextMedium, TextSmall, TextRegular, EditBtn, TextContentColor } from "../../styles/mainStyles";

import iconEdit from '../../images/edit.svg'

export const ProfilePage = () => {
    const appContext = useContext(AppContext);
    const history = useHistory();
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
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
                {loading ? <Loading /> : (
                    <div>
                        <TextContent>
                            <EditBtn src={iconEdit} alt="Botão de editar endereço" onClick={onClickEditProfile} />
                            <TextMedium>{appContext.profile.name}</TextMedium>
                            <TextSmall>{appContext.profile.email}</TextSmall>
                            <TextSmall>{appContext.profile.cpf}</TextSmall>
                        </TextContent>
                        <TextContentColor>
                            <EditBtn src={iconEdit} alt="Botão de editar endereço" onClick={onClickEditAddress} />
                            <TextMedium>Endereço cadastrado</TextMedium>
                            <TextSmall>{appContext.profile.address}</TextSmall>
                        </TextContentColor>
                        <Container>
                            <ProductCategories>Histórico de pedidos</ProductCategories>
                            {ordersHistory && ordersHistory.length !== 0 ? ordersHistory.map(order => {
                                return <Card key={order.createdAt}>
                                    <TextContent>
                                        <TextMedium>{order.restaurantName}</TextMedium>
                                        <TextSmall>{formatDate(order.createdAt)}</TextSmall>
                                        <TextSmall>R$ {order.totalPrice.toFixed(2).replace(".", ",")}</TextSmall>
                                    </TextContent>
                                </Card>
                            }) : <TextSmall>Você não realizou nenhum pedido</TextSmall>}
                        <button onClick={handleLogout}>Logout</button>
                        </Container>
                    </div>
                )}
            </MainContainer>
        }
    }

    return (
        <MainContainer>
            {page()}
            <Menu />
        </MainContainer>
    )
}
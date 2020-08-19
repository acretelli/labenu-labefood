import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AppContext from '../../context/AppContext';
import { Menu } from '../Menu/Menu';
import { baseUrl } from '../../variables/variables';
import { useProtectedRoute } from "../../hooks/useProtectedRoute";

import { MainContainer, Container, Header, ImgSmall, FlexSpaceBetween, Categories, Card, CardRestaurantImg, TextContent, TextMedium, TextSmall, TextLarge } from "../../styles/mainStyles";

import logoLabefood from "../../images/labefood-red.svg";

export const RestaurantsListPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ searching, setSearching ] = useState(false);
    const appContext = useContext(AppContext);
    const token = useProtectedRoute();
  
    const axiosConfig = {
      headers: {
        auth: token,
      }
    }

    useEffect(() => {
        axios.get(`${baseUrl}/restaurants`, axiosConfig)
        .then( response => {
            appContext.dispatch({ type: "LOAD_RESTAURANTSLIST", restaurantsList: response.data.restaurants });
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
        })
    }, [appContext.dispatch, setLoading]);

    let categories = [];
    if(appContext.restaurantsList) {
        const getCategories  = appContext.restaurantsList.map( restaurant => restaurant.category);
        
        categories = getCategories.filter( (category, idx) => {
            if(getCategories.indexOf(category) === idx) {
                return category
            }
        })
    }

    return (
        <MainContainer>
            {!searching ? <Header><ImgSmall src={logoLabefood} alt="Logo Labefood"/></Header> : <Header><TextLarge>Busca</TextLarge></Header>}
            {loading ? (
                <p>Carregando...</p>
                ) : (
                <Container>
                    {!searching && <FlexSpaceBetween>
                        {categories.map( category => {
                            return <Categories>{category}</Categories>
                        })}
                    </FlexSpaceBetween>}
                    {appContext.restaurantsList.map(item => {
                        const { id, name, logoUrl, deliveryTime, shipping } = item;
                        return (
                            <Card key={id}>
                                <Link to={`/restaurants/${id}`} data-testid={id}>
                                    <CardRestaurantImg src={logoUrl} alt={name} />
                                    <TextContent>
                                        <TextMedium>{name}</TextMedium>
                                        <FlexSpaceBetween>
                                            <TextSmall>{deliveryTime} min</TextSmall>
                                            <TextSmall>Frete R${shipping.toFixed(2).replace(".", ",")}</TextSmall>
                                        </FlexSpaceBetween>
                                    </TextContent>
                                </Link>
                            </Card>
                        )
                    })}
                </Container>
            )}
            <Menu />
        </MainContainer>
    )
}
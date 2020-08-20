import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AppContext from '../../context/AppContext';
import { Menu } from '../Menu/Menu';
import { Loading } from '../Loading/Loading';
import { baseUrl } from '../../variables/variables';
import { useProtectedRoute } from "../../hooks/useProtectedRoute";

import { MainContainer, Container, Header, ImgSmall, FlexSpaceBetween, Categories, Card, CardRestaurantImg, TextContent, TextMedium, TextSmall, TextLarge, FlexSpaceBetweenCategories, BackBtn, InputSearch } from "../../styles/mainStyles";

import iconBack from "../../images/back.svg";

export const RestaurantsListPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ searching, setSearching ] = useState(false);
    const [ inputSearch, setInputSearch ] = useState('');
    const [ clickedCategory, setClickedCategory ] = useState('');
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
            setTimeout(() => {
                setLoading(false);
            }, 1000);
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

    const onClickCategory = category => {
        if ( clickedCategory === category ) {
            setClickedCategory('')
        } else {
            setClickedCategory(category)
        }
    }

    let filteredList = appContext.restaurantsList;

    if ( clickedCategory !== '' ) {
        filteredList = filteredList.filter( restaurant => {
            if (restaurant.category.includes(clickedCategory)) {
                return restaurant
            }
        })
    }

    if ( inputSearch !== '' ) {
        filteredList = filteredList.filter( restaurant => {
            if (restaurant.name.toLowerCase().includes(inputSearch.toLowerCase())) {
                return restaurant
            }
        })
    }
    
    const onChangeInput = event => {
        setSearching(true);
        setInputSearch(event.target.value);
    }
    
    const goToRestaurantsList = () => {
        setSearching(false);
        setInputSearch('');
    }

    return (
        <MainContainer>
            {!searching ? <Header><TextLarge>Labefood</TextLarge></Header> : <Header><BackBtn src={iconBack} alt="Botão de voltar" onClick={goToRestaurantsList}/><TextLarge>Busca</TextLarge></Header>}
            <Container>
                <InputSearch value={inputSearch} placeholder="Restaurante" onChange={onChangeInput}/>
            </Container>
            {loading ? (
                <Loading />
                ) : (
                <Container>
                    {!searching && <FlexSpaceBetweenCategories>
                        {categories.map( category => {
                            return <Categories key={category} onClick={() => onClickCategory(category)} isActive={clickedCategory} active={category}>{category}</Categories>
                        })}
                    </FlexSpaceBetweenCategories>}
                    {filteredList.length !== 0 ? filteredList.map(item => {
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
                    }) : <TextSmall>Nada encontrado :(</TextSmall>}
                </Container>
            )}
            <Menu />
        </MainContainer>
    )
}
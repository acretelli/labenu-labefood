import styled from "styled-components";

import iconSearch from "../images/search.svg";

export const MainContainer = styled.div`
    padding-bottom: 48px;
`

export const Container = styled.div`
    padding: 16px;
`

export const Header = styled.div`
    padding: 8px;
    margin-bottom: 8px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    background-color: #EE766C;
    position: relative;
`

export const ImgSmall = styled.img`
    height: 24px;
`

export const FlexSpaceBetween = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const FlexSpaceBetweenCategories = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow-x: scroll;
`

export const Card = styled.div`
    margin: 16px 0;
    border-radius: 8px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    position: relative;
`

export const CardRestaurantImg = styled.img `
    width: 100%;
    height: 120px;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
`

export const CardProductImg = styled.img `
    width: 30%;
    height: 120px;
    border-radius: 8px 0 0 8px;
    object-fit: cover;
`

export const TextContent = styled.div `
    width: 100%;
    padding: 8px 16px 16px 16px;
`

export const TextContentColor = styled.div `
    width: 100%;
    padding: 16px;
    background-color: #FFF9F8;
`

export const TextLarge = styled.h4 `
    font-size: 1.15rem;
    text-align: center;
    color: #fff;
`

export const TextMedium = styled.h2 `
    margin-bottom: 8px;
    font-size: 1.15rem;
    line-height: 1.25rem;
    color: #EE766C;
`

export const Categories = styled.h3 `
    margin: 0 8px;
    font-size: 1rem;
    font-weight: 400;
    color: ${props => {
        if(props.active === props.isActive) {
          return '#EE766C'
        } else {
          return 'black'
        }
    }};
    cursor: pointer;
`

export const ProductCategories = styled.h3 `
    margin: 16px 0 8px 0;
    border-bottom: 1px solid #EE766C;
    font-size: 1rem;
    font-weight: 400;
    color: #EE766C;
`

export const TextSmall = styled.p `
    margin: 4px 0;
    font-size: 0.95rem;
    line-height: 120%;
    opacity: 0.6;
`

export const TextSmallRight = styled.p `
    margin: 4px 0;
    font-size: 0.95rem;
    text-align: right;
    line-height: 120%;
    opacity: 0.6;
`

export const TextRegular = styled.p `
    font-size: 1rem;
    line-height: 120%;
`

export const QuantityValue = styled.p `
    padding: 8px;
    line-height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    border-radius: 0 8px 0 0;
`

export const AddBtn = styled.button `
    max-width: 80px;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 8px;
    border-radius: 0 0 8px 0;
`

export const BackBtn = styled.img `
    width: 16px;
    height: 16px;
    position: absolute;
    left: 8px;
    top: 16px;
    object-fit: contain;
    cursor: pointer;
`

export const EditBtn = styled.img `
    width: 16px;
    height: 16px;
    float: right;
    object-fit: contain;
    cursor: pointer;
`

export const InputSearch = styled.input `
    display: block;
    width: 100%;
    padding: 16px 16px 16px 32px;
    border-radius: 4px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    font-family: 'Baloo Tamma 2', cursive;
    line-height: 100%;
    background-image: url(${iconSearch});
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 8px 16px;
`
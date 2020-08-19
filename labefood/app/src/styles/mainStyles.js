import styled from "styled-components";

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
`

export const ImgSmall = styled.img`
    height: 24px;
`

export const FlexSpaceBetween = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`

export const Card = styled.div`
    margin: 16px 0;
    border-radius: 8px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
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

export const TextLarge = styled.h2 `
    font-size: 1.1rem;
    text-align: center;
    color: #EE766C;
`

export const TextMedium = styled.h3 `
    margin-bottom: 4px;
    font-size: 1rem;
    color: #EE766C;
`

export const Categories = styled.h3 `
    margin: 0 8px;
    font-size: 1rem;
    font-weight: 400;
    color: ${props => {
        if(props.active) {
          return '#EE766C'
        } else {
          return 'black'
        }
    }};
`

export const ProductCategories = styled.h3 `
    margin: 16px 0 8px 0;
    padding-bottom: 4px;
    border-bottom: 1px solid #EE766C;
    font-size: 1rem;
    font-weight: 400;
    color: #EE766C;
`

export const TextSmall = styled.p `
    font-size: 0.9rem;
    opacity: 0.6;
`

export const TextRegular = styled.p `
    font-size: 1rem;
`
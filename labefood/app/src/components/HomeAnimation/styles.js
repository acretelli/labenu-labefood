import styled, { keyframes } from "styled-components";

const scaleOut = keyframes`
    0% {
        transform: scaleX(1);
        opacity: 1;
    }
    100% {
        transform: scaleX(0);
        opacity: 1;
    }
`;


export const HomeContainer = styled.div `
    width: 100%;
    height: 100vh;
    background-color: #EE766C;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: ${scaleOut} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 2s both;
`

export const LogoImg = styled.img `
    max-width: 296px;
`
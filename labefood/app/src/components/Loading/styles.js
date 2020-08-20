import styled, { keyframes } from "styled-components";

const ldsEllipsis1 = keyframes`
    0% {
    transform: scale(0);
    }
    100% {
    transform: scale(1);
    }
`;

const ldsEllipsis2 = keyframes`
    0% {
    transform: translate(0, 0);
    }
    100% {
    transform: translate(24px, 0);
    }
`;

const ldsEllipsis3 = keyframes`
    0% {
    transform: scale(1);
    }
    100% {
    transform: scale(0);
    }
`;


export const LoadingContainer = styled.div `
    width: 100%;
    height: 100vh;
    background-color: #EE766C;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
`

export const LoadingElipses = styled.div `
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
`

export const LoadingElipse = styled.div `
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
        left: 8px;
        animation: ${ldsEllipsis1} 0.6s infinite;
    }

    &:nth-child(2) {
        left: 8px;
        animation: ${ldsEllipsis2} 0.6s infinite;
    }

    &:nth-child(3) {
        left: 32px;
        animation: ${ldsEllipsis2} 0.6s infinite;
    }

    &:nth-child(4) {
        left: 56px;
        animation: ${ldsEllipsis3} 0.6s infinite;
    }
`
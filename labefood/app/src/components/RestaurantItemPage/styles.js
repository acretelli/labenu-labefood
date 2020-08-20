import styled from "styled-components";

export const Overlay = styled.div `
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
`

export const BoxQuantityContainer = styled.div `
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
`

export const BoxQuantity = styled.div `
    max-width: 280px;
    padding: 24px 16px;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`

export const QuantityBtnContainer = styled.div `
    margin: 16px 0 8px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 4px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
`

export const QuantityBtn = styled.p `
    margin: 0 16px;
    background-color: none;
    font-size: 1.25rem;
    line-height: 120%;
    font-weight: 400;
    color: #EE766C;
    cursor: pointer;
`

export const QuantityCounter = styled.p `
    line-height: 100%;
`
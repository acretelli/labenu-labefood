import styled from "styled-components";

export const ActiveOrderContainer = styled.div `
    width: 100%;
    padding: 16px 16px 64px 16px;
    background-color: #EE766C;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ActiveOrderBox = styled.div `
    max-width: 450px;
    background-color: #EE766C;
`

export const TextRegularWhite = styled.p `
    line-height: 120%;
    color: #fff;
`
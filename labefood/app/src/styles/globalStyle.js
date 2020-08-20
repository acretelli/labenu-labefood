import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        border: none;
        outline: none;
    }
    body {
        background-color: #EE766C;
        font-family: 'Baloo Tamma 2', cursive;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    .App {
        max-width: 450px;
        min-height: 100vh;
        margin: auto;
        background-color: #fff;
    }
    .container {
        padding: 16px;
    }
    img {
        width: 100%;
    }
    input, button {
        display: block;
        width: 100%;
        padding: 16px;
        border-radius: 4px;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
        font-family: 'Baloo Tamma 2', cursive;
        line-height: 100%;
    }
    button {
        font-weight: 500;
        margin-top: 16px;
        color: #fff;
        background-color: #EE766C;
        cursor: pointer;
        &:hover {
            opacity: 0.6;
        }
    }
    .textfield {
        margin: 8px 0;
        padding: 8px 0;
        position: relative;
        
        label {
            padding: 0 4px;
            position: absolute;
            top: 0;
            left: 12px;
            background-color: #fff;
            color: rgba(0, 0, 0, 0.25);
            font-size: 12px;
        }
    }
`
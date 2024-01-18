import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    html {
        height: 100%;
    }
    #root {
        height: 100%;
    }
    body {
        height : 100%;
        padding: 0;
        margin: 0;
        font-family: 'Lato', sans-serif;
        color: ${({ theme }) => theme.colors.text}
    }
    *::-webkit-scrollbar {
        width: 5px; /* ширина scrollbar */
        border-radius: 50%;
        height: 8px;
    }

    *::-webkit-scrollbar-track {
        background: transparent; /* цвет дорожки */
    }
    *::-webkit-scrollbar-thumb {
        background-color: #A0A0A0; /* цвет плашки */
        border-radius: 20px; /* закругления плашки */
    }
`

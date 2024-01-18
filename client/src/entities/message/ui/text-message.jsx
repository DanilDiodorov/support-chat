import styled from 'styled-components'

export const TextMessage = ({ text }) => {
    return <Main>{text}</Main>
}

const Main = styled.div`
    white-space: pre-wrap;
`

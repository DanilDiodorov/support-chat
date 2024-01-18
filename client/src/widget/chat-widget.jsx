import styled from 'styled-components'

const ChatWidget = ({ children }) => {
    return <Main>{children}</Main>
}

const Main = styled.div`
    background-color: ${({ theme }) => theme.colors.bgContent};
`

export default ChatWidget

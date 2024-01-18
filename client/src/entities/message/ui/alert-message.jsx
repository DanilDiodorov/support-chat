import styled from 'styled-components'

export const AlertMessage = ({ message }) => {
    return (
        <Main>
            <Text>{message.text}</Text>
            <Divide />
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 30px 0;
`

const Text = styled.div`
    padding: 0 20px;
    background-color: ${({ theme }) => theme.colors.bgContent};
    position: absolute;
    margin-top: -8px;
`

const Divide = styled.div`
    background-color: grey;
    height: 1px;
    width: 100%;
`

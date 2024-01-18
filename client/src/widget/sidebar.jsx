import { LogoutButton } from 'features/authentication'
import { Link } from 'shared'
import styled from 'styled-components'
import { SlSettings } from 'react-icons/sl'
import { BsChatLeftText } from 'react-icons/bs'
import { OperatorPhoto } from 'entities/user'

const Sidebar = () => {
    return (
        <Main>
            <Top>
                <OperatorPhoto status="online" size="40px" />
            </Top>
            <Middle>
                <Link to="/" style={{ color: 'white' }}>
                    <BsChatLeftText />
                </Link>
                <Link to="profile" style={{ color: 'white' }}>
                    <SlSettings />
                </Link>
            </Middle>
            <Bottom>
                <LogoutButton />
            </Bottom>
        </Main>
    )
}

const Main = styled.div`
    background-color: ${({ theme }) => theme.colors.sidebar};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    color: white;
    font-size: 24px;
`

const Middle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Top = styled.div``
const Bottom = styled.div``

export default Sidebar

import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Sidebar from 'widget/sidebar'

const MainPage = () => {
    return (
        <Main>
            <Sidebar />
            <Outlet />
        </Main>
    )
}

const Main = styled.div`
    display: grid;
    grid-template-columns: 50px 1fr;
    height: 100%;
`

export default MainPage

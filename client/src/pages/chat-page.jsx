import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import ChatWidget from 'widget/chat-widget'
import ChatListWidget from 'widget/chats-list-widget'

const ChatPage = () => {
    return (
        <Main>
            <ChatListWidget />
            <ChatWidget>
                <Outlet />
            </ChatWidget>
        </Main>
    )
}

const Main = styled.div`
    display: grid;
    height: 100%;
    grid-template-columns: 300px 1fr;
`

export default ChatPage

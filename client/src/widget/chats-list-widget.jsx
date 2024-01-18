import { ChatsList } from 'entities/chat'
import { selectCurrentChats } from 'entities/chat/model/slice'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ChatListWidget = () => {
    const chats = useSelector(selectCurrentChats)

    return (
        <Main>
            <ChatListHeader>
                <h3>Входящие обращения</h3>
                {chats.length > 0 && <Count>{chats.length}</Count>}
            </ChatListHeader>
            <ChatsList />
        </Main>
    )
}

const Main = styled.div`
    border-right: 1px solid ${({ theme }) => theme.colors.grey};
`

const ChatListHeader = styled.div`
    height: 60px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    gap: 20px;
`

const Count = styled.div`
    width: 25px;
    height: 25px;
    background-color: ${({ theme }) => theme.colors.danger};
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
`

export default ChatListWidget

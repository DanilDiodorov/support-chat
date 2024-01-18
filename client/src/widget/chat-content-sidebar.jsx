import { CloseChatButton, TransferChatButton } from 'features/chat'
import { ProfilePhoto, getDate, getTime } from 'shared'
import styled from 'styled-components'

const ChatContentSideBar = ({ currentChat }) => {
    return (
        <Main>
            <MainPhoto>
                <ProfilePhoto
                    name={currentChat.clientName}
                    size="150px"
                    status="none"
                />
            </MainPhoto>
            <Name>{currentChat.clientName}</Name>
            <DateText>
                Дата обращения: {getTime(Number(currentChat.createdAt))}{' '}
                {getDate(Number(currentChat.createdAt))}
            </DateText>
            <Divide />
            <Buttons>
                <TransferChatButton currentChat={currentChat} />
                <CloseChatButton currentChat={currentChat} />
            </Buttons>
        </Main>
    )
}

const Main = styled.div`
    border-left: 1px solid ${({ theme }) => theme.colors.grey};
    background-color: white;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const MainPhoto = styled.div`
    display: flex;
    justify-content: center;
`

const Buttons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
`

const Name = styled.h1`
    text-align: center;
`

const DateText = styled.div`
    color: grey;
    text-align: center;
    margin-top: -30px;
`

const Divide = styled.div`
    background-color: ${({ theme }) => theme.colors.grey};
    height: 1px;
    margin: 20px 0;
`

export default ChatContentSideBar

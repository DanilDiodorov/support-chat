import { MessagesList } from 'entities/message'
import { MessageTools } from 'features/message'
import styled from 'styled-components'

const ChatContentMain = ({ currentMessages, currentChat }) => {
    return (
        <Main>
            <MessagesList
                currentMessages={currentMessages}
                currentChat={currentChat}
            />
            <MessageTools currentChat={currentChat} />
        </Main>
    )
}

const Main = styled.div`
    height: 100vh;
    min-width: 400px;
`

export default ChatContentMain

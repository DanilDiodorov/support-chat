import { selectCurrentChats } from 'entities/chat/model/slice'
import { selectCurrentMessages } from 'entities/message'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import ChatContentMain from 'widget/chat-content-main'
import ChatContentSideBar from 'widget/chat-content-sidebar'

const ChatContentPage = () => {
    const { chatId } = useParams()
    const chats = useSelector(selectCurrentChats)
    const messages = useSelector(selectCurrentMessages)
    const navigate = useNavigate()

    const [currentChat, setCurrentChat] = useState({})
    const [currentMessages, setCurrentMessages] = useState([])

    useEffect(() => {
        const newChats = chats.filter(
            (chat) => chat.id.toString() === chatId.toString()
        )[0]
        if (newChats) {
            setCurrentChat(newChats)
        } else {
            navigate('/')
        }
    }, [chats, chatId, navigate])

    useEffect(() => {
        setCurrentMessages(
            messages.filter(
                (message) => message.chatId.toString() === chatId.toString()
            )
        )
    }, [messages, chatId])

    return (
        <Main>
            <ChatContentMain
                currentChat={currentChat}
                currentMessages={currentMessages}
            />
            <ChatContentSideBar currentChat={currentChat} />
        </Main>
    )
}

const Main = styled.div`
    display: grid;
    grid-template-columns: 1fr 400px;
    height: 100%;
`

export default ChatContentPage

import styled from 'styled-components'
import { MessageCard } from './message-card'
import { AlertMessage } from './alert-message'
import { useEffect } from 'react'
import { animateScroll } from 'react-scroll'
import { useDispatch } from 'react-redux'
import { setIsRead } from '../model'

export const MessagesList = ({ currentChat, currentMessages }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentChat) {
            dispatch(setIsRead(currentChat.id))
        }
    }, [currentChat, currentMessages, dispatch])

    useEffect(() => {
        animateScroll.scrollToBottom({
            duration: 0,
            containerId: 'messageBlock',
        })
    }, [currentChat])

    return (
        <Main id="messageBlock">
            {currentMessages?.map((message) => {
                if (message.type === 'alert') {
                    return <AlertMessage message={message} />
                }
                return (
                    <MessageCard message={message} currentChat={currentChat} />
                )
            })}
        </Main>
    )
}

const Main = styled.div`
    height: calc(100% - 130px);
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    overflow-y: auto;
`

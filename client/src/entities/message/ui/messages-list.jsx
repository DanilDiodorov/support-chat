import styled from 'styled-components'
import { MessageCard } from './message-card'
import { AlertMessage } from './alert-message'
import { useEffect, useState } from 'react'
import { animateScroll } from 'react-scroll'
import { useDispatch } from 'react-redux'
import { setIsRead } from '../model'

export const MessagesList = ({ currentChat, currentMessages }) => {
    const dispatch = useDispatch()
    const [active, setActive] = useState(true)

    useEffect(() => {
        function handleFocus() {
            setActive(true)
        }
        function handleBlur() {
            setActive(false)
        }
        window.addEventListener('focus', handleFocus)
        window.addEventListener('blur', handleBlur)

        return () => {
            window.removeEventListener('focus', handleFocus)
            window.removeEventListener('blur', handleBlur)
        }
    }, [])

    useEffect(() => {
        if (currentChat && active) {
            dispatch(setIsRead(currentChat.id))
        }
    }, [currentChat, currentMessages, dispatch, active])

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

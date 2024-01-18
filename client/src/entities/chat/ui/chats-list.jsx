import styled from 'styled-components'
import { useGetChats } from '../hooks/use-get-chats'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentChats, setChats } from '../model/slice'
import { ChatCard } from './chat-card'
import { selectCurrentMessages } from 'entities/message'
import { useGetMessages } from 'entities/message/hooks/use-get-messages'
import { ThreeDots } from 'react-loader-spinner'

export const ChatsList = () => {
    const { data, isError, error, isLoading: chatsLoading } = useGetChats()
    const { isLoading: messagesLoading } = useGetMessages()
    const chats = useSelector(selectCurrentChats)
    const messages = useSelector(selectCurrentMessages)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(error.response.data.messasge)
        } else if (!chatsLoading) {
            dispatch(setChats(data))
        }
    }, [error, isError, data, chatsLoading, dispatch])

    useEffect(() => {
        const favicon = document.querySelector('#icon')
        favicon.href = chats.length > 0 ? 'favicon_2.ico' : 'favicon_1.ico'
    }, [chats])

    return (
        <Main>
            {messagesLoading || chatsLoading ? (
                <Loading>
                    <ThreeDots
                        visible={true}
                        height="40"
                        width="40"
                        color="grey"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </Loading>
            ) : (
                chats.map((chat) => {
                    let lastMessageText = ''
                    let lastMessageTime = ''
                    let newMessagesCount = 0
                    const chatMessages = messages.filter((message) => {
                        if (
                            message.chatId.toString() === chat.id.toString() &&
                            message.isRead === false
                        ) {
                            newMessagesCount++
                        }
                        return message.chatId.toString() === chat.id.toString()
                    })
                    if (
                        chatMessages[chatMessages.length - 1]?.type ===
                            'text' ||
                        chatMessages[chatMessages.length - 1]?.type === 'alert'
                    ) {
                        if (chatMessages[chatMessages.length - 1]?.isOperator)
                            lastMessageText =
                                'Вы: ' +
                                chatMessages[chatMessages.length - 1]?.text
                        else
                            lastMessageText =
                                chatMessages[chatMessages.length - 1]?.text
                    } else if (
                        chatMessages[chatMessages.length - 1]?.type === 'file'
                    ) {
                        lastMessageText = 'Файл'
                    }
                    lastMessageTime =
                        chatMessages[chatMessages.length - 1]?.createdAt
                    return (
                        <ChatCard
                            key={chat.id}
                            chat={chat}
                            lastMessageText={lastMessageText}
                            lastMessageTime={lastMessageTime}
                            newMessagesCount={newMessagesCount}
                        />
                    )
                })
            )}
        </Main>
    )
}

const Main = styled.div`
    overflow-y: auto;
`

const Loading = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0;
`

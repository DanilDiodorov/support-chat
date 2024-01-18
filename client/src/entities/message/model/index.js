import { createSlice } from '@reduxjs/toolkit'
import { animateScroll } from 'react-scroll'
import { $api } from 'shared'

const initialState = []

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state = action.payload
            return state
        },
        addMessage: (state, action) => {
            state = [...state, action.payload]
            setTimeout(() => {
                animateScroll.scrollToBottom({
                    duration: 100,
                    containerId: 'messageBlock',
                })
            }, 100)
            return state
        },
        removeChatMessages: (state, action) => {
            state = state.filter((message) => {
                return message.chatId !== action.payload
            })
            return state
        },
        setIsRead: (state, action) => {
            const ids = []
            state.map((message) => {
                if (
                    message.chatId?.toString() === action.payload?.toString() &&
                    !message.isRead
                ) {
                    message.isRead = true
                    ids.push(message.id)
                }
                return message
            })

            if (ids.length > 0) $api.patch('/message', { ids })

            return state
        },
    },
})

export const selectCurrentMessages = (state) => state.messages

export const { setMessages, addMessage, removeChatMessages, setIsRead } =
    messageSlice.actions

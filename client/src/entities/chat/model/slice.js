import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action) => {
            state = action.payload
            return state
        },
        addChat: (state, action) => {
            state = [...state, action.payload]
            return state
        },
        removeChat: (state, action) => {
            state = state.filter((chat) => {
                return chat.id !== action.payload
            })
            return state
        },
    },
})

export const selectCurrentChats = (state) => state.chats

export const { setChats, addChat, removeChat } = chatSlice.actions

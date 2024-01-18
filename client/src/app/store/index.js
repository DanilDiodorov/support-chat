import { configureStore } from '@reduxjs/toolkit'
import { chatSlice } from 'entities/chat'
import { messageSlice } from 'entities/message'
import { userSlice } from 'entities/user'

export default configureStore({
    reducer: {
        user: userSlice.reducer,
        chats: chatSlice.reducer,
        messages: messageSlice.reducer,
    },
})

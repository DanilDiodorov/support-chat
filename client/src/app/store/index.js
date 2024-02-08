import { configureStore } from '@reduxjs/toolkit'
import { chatSlice } from 'entities/chat'
import { messageSlice } from 'entities/message'
import { textSlice } from 'entities/text'
import { userSlice } from 'entities/user'
import { templateSidebarSlice } from 'features/template'

export default configureStore({
    reducer: {
        user: userSlice.reducer,
        chats: chatSlice.reducer,
        messages: messageSlice.reducer,
        templateSidebar: templateSidebarSlice.reducer,
        text: textSlice.reducer,
    },
})

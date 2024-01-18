import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = action.payload
            return state
        },
        changeAvatarStatus: (state, action) => {
            state.avatar = action.payload
            return state
        },
        clearUser: (state) => {
            state = initialState
            return state
        },
    },
})

export const selectCurrentUser = (state) => state.user

export const { setUser, clearUser, changeAvatarStatus } = userSlice.actions

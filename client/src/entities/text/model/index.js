import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

export const textSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        setText: (state, action) => {
            state = action.payload
            return state
        },
    },
})

export const selectCurrentText = (state) => state.text

export const { setText } = textSlice.actions

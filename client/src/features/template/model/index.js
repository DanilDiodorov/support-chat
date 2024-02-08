import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const templateSidebarSlice = createSlice({
    name: 'templateSidebar',
    initialState,
    reducers: {
        setOpenSidebar: (state, action) => {
            state = action.payload
            return state
        },
    },
})

export const selectCurrentTemplateSidebar = (state) => state.templateSidebar

export const { setOpenSidebar } = templateSidebarSlice.actions

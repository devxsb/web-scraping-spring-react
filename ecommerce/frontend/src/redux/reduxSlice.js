import {createSlice} from "@reduxjs/toolkit";

export const reduxSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: localStorage.getItem('currentUser'),
        token: localStorage.getItem('token'),
        filter: undefined
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem('currentUser', action.payload.username)
            localStorage.setItem('token', action.payload.token)
            state.currentUser = action.payload
            state.token = action.payload.token
        },
        logout: state => {
            localStorage.removeItem('currentUser')
            localStorage.removeItem('token')
            state.currentUser = undefined
            state.token = undefined
        },
        filter: (state, action) => {
            state.filter = action.payload
        }
    }
})
export const {login, logout, filter} = reduxSlice.actions
export default reduxSlice.reducer
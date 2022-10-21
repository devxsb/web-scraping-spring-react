import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: localStorage.getItem('currentUser'),
        token: localStorage.getItem('token')
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
        }
    }
})
export const {login, logout} = authSlice.actions
export default authSlice.reducer
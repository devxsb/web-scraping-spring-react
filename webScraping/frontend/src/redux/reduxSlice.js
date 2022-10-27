import {createSlice} from "@reduxjs/toolkit";

export const reduxSlice = createSlice({
    name: 'redux',
    initialState: {
        filter: null
    },
    reducers: {
        filter: (state, action) => {
            state.filter = action.payload
        }
    }
})
export const {filter} = reduxSlice.actions
export default reduxSlice.reducer
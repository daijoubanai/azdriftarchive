import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        value: false,
    },
    reducers: {
        toggleImg: (state) => {
            state.value = !state.value
        }
    }
})

export const { toggleImg } = toggleSlice.actions;

export default toggleSlice.reducer;
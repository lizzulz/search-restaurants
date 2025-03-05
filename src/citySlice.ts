import { createSlice } from "@reduxjs/toolkit";



export const citySlice = createSlice ({
    name: 'cityName',
    initialState: {
        value: "",
    },
    reducers: {
        updateCity: (state, action) => {
            state.value = action.payload;                        
        },
    }
});


export const { updateCity } = citySlice.actions;

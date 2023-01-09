import { createSlice } from "@reduxjs/toolkit";

const activities = createSlice({
    name:"activities",
    initialState:{
        items: [],
        error: null
    },
    reducers: {
        setItems: (store, action) => {
            store.items = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        }
    }
});

export default activities;
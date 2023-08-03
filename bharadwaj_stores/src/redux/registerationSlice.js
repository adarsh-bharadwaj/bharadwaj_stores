// dataSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    data: null,
    loading: false,
    error: null,
};

// Define the async thunk to handle the API request
export const postData = createAsyncThunk('data/postData', async (data, { rejectWithValue }) => {
    // console.log(postData.data);
    try {
        const response = await axios.post(data.url, data.data);
        console.log(response.headers['set-cookie']);
        return response?.data;
    }
    catch (e) {
        console.log("Hi", e.response.data.stack);
        if (e?.response?.data?.message) {
            let error = new Error(e?.response?.data?.message)
            error.stack = e?.response?.data?.stack;
            // console.log("stack",error.stack);
            return rejectWithValue(e?.response?.data);
        }
        throw e;
    }
});

// Create the slice
const registrationSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // Add a reset action to reset the state back to its initial values
        resetDataState: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(postData.rejected, (state, action) => {
                state.loading = false;
                // console.log(action)
                // console.log("action",action.payload);
                console.log(action)
                if (action.payload) {
                    state.error = {
                        message: action.payload.message,
                        stack: action.payload.stack
                    }
                    return;
                }
                state.error = {
                    message: action.message,
                    stack: action.stack
                };
            });
    },
});

// Export the resetDataState action
export const { resetDataState } = registrationSlice.actions;

export default registrationSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    data: null,
    loading: false,
    error: null,
};



export const passReset = createAsyncThunk('resetPass/passReset', async (resetPassData, { rejectWithValue }) => {
    try {
        const response = await axios.post(resetPassData.url, resetPassData.data);
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
const passResetSlice = createSlice({
    name: 'passReset',
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
            .addCase(passReset.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(passReset.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(passReset.rejected, (state, action) => {
                state.loading = false;
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
            })
    },
});

// Export the resetDataState action
export const passResetActions = passResetSlice.actions;

export default passResetSlice.reducer;
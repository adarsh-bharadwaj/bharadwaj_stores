import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';
import { deleteAccessToken, storeAccessToken } from '../utils/userDataStorage/accessToken';
import { deleteuserId, storeuserId } from '../utils/userDataStorage/userId';
import { BASE_URL } from '../constants/urls';

// Define the initial state
const initialState = {
    data: null,
    loading: false,
    error: null,
    isLoggedIn: false
};

export const accessToken = createAsyncThunk('login/accessToken', async (exchangeData, { rejectWithValue }) => {
    try {
        const cookie = await CookieManager.get(BASE_URL);
        const headers = {
            Cookie: cookie ? cookie['Set-Cookie'] : '', // Attach the cookie to the request headers
        };

        const response = await axios({
            method: 'POST',
            url: exchangeData.url,
            data: exchangeData.data,
            headers,
        });
        console.log(response.data);
        return response.data;
    }
    catch (e) {
        throw e;
    }
})

export const loginUser = createAsyncThunk('login/loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const response = await axios.post(loginData.url, loginData.data);
        console.log(response.headers['set-cookie']);
        if (response?.headers['set-cookie']) {
            const cookies = response.headers['set-cookie'];
            // Save the cookies to the CookieManager
            console.log(loginData.url, typeof (cookies));
            if (cookies) {
                await CookieManager.setFromResponse(BASE_URL, cookies[0])
                    .then((success) => {
                        console.log(success);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
        console.log(response);
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
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // Add a reset action to reset the state back to its initial values
        resetDataState: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            deleteAccessToken();
            deleteuserId();
            CookieManager.clearAll().then((success) => console.log(success))
                .catch(e => console.log(e));
            state.data = null;
            state.loading = false;
            state.error = null;
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.isLoggedIn = true;
                console.log(action.payload);
                if (action?.payload?.accessToken) {
                    storeAccessToken(action?.payload?.accessToken);
                    storeuserId(action?.payload?._id);
                }
                if (action?.payload?._id) {
                    storeuserId(action?.payload?._id);
                }

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
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
            })
            .addCase(accessToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(accessToken.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.isLoggedIn = true;
                if (action?.payload?.accessToken) {
                    storeAccessToken(action?.payload?.accessToken);
                }
            })
            .addCase(accessToken.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
            });
    },
});

// Export the resetDataState action
export const authenticateActions = loginSlice.actions;

export default loginSlice.reducer;

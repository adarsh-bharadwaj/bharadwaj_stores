// store.js

import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './registerationSlice';
import authenticationReducer from './loginSlice';
import passResetReducer from './passResetSlice'
const store = configureStore({
  reducer: {
    data: registerReducer,
    login:authenticationReducer,
    passReset:passResetReducer
    // Add other reducers if needed
  },
});

export default store;
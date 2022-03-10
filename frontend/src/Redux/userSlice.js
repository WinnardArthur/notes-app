import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

export const userSlice = createSlice({
    name: "userLogin",
    initialState: {
        userLogin: { userInfo: userInfoFromStorage}
    },
    reducers: {
        USER_LOGIN_REQUEST: (state) => {
            state.userLogin.loading = true 
        },
        USER_LOGIN_SUCCESS: (state, action) => {
            state.userLogin.loading = false;
            state.userLogin.userInfo = action.payload;
            state.userLogin.error = false;
        },
        USER_LOGIN_FAIL: (state, action) => {
            state.userLogin.loading = false;
            state.userLogin.error = action.payload
        },
        USER_REGISTER_REQUEST: (state) => {
            state.loading = true;
        },
        USER_REGISTER_SUCCESS: (state, action) => {
            state.loading = false;
            state.userRegister = action.payload;
            state.error = false;
        },
        USER_REGISTER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        USER_UPDATE_REQUEST: (state) => {
            state.userLogin.loading = true;
        },
        USER_UPDATE_SUCCESS: (state, action) => {
            state.userLogin.loading = false;
            state.userLogin.userInfo = action.payload;
            state.userLogin.error = false;
            state.success = true;
        },
        USER_UPDATE_FAIL: (state, action) => {
            state.userLogin.loading = false;
            state.userLogin.error = action.payload;
        },
        USER_LOGOUT: (state) => { 
            state = null;
        }
    }
})

export const { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,  
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_LOGOUT
} = userSlice.actions;

export default userSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./noteSlice";
import userReducer from './userSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        note: noteSlice
    }
})
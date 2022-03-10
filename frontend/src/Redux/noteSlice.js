import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "posts",
    initialState: {
        notes: []
    },
    reducers: {
        NOTES_LIST_REQUEST: (state) => {
            state.loading = true
        },
        NOTES_LIST_SUCCESS: (state, action) => {
            state.loading = false;
            state.notes = action.payload;
            state.error = false;
        },
        NOTES_LIST_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        NOTE_CREATE_REQUEST: (state) => {
            state.loading = true;
        },
        NOTE_CREATE_SUCCESS: (state, action) => {
            state.loading = false;
            state.note = action.payload;
            state.error = false;
        },
        NOTE_CREATE_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        NOTE_UPDATE_REQUEST: (state) => {
            state.loading = true;
        },
        NOTE_UPDATE_SUCCESS: (state, action) => {
            state.loading = false;
            state.note = action.payload;
            state.error = false;
        },
        NOTE_UPDATE_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        NOTE_DELETE_REQUEST: (state) => {
            state.loading = true
        },
        NOTE_DELETE_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload;
            state.error = false;
        },
        NOTE_DELETE_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }
    }
})


export const { 
    NOTES_LIST_REQUEST, 
    NOTES_LIST_SUCCESS,
    NOTES_LIST_FAIL,
    NOTE_CREATE_REQUEST,
    NOTE_CREATE_SUCCESS,
    NOTE_CREATE_FAIL,
    NOTE_UPDATE_REQUEST,
    NOTE_UPDATE_SUCCESS,
    NOTE_UPDATE_FAIL,
    NOTE_DELETE_REQUEST,
    NOTE_DELETE_SUCCESS,
    NOTE_DELETE_FAIL,
} = noteSlice.actions;


export default noteSlice.reducer;
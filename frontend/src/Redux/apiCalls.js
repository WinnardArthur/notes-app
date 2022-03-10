import axios from 'axios';

import { 
    NOTES_LIST_REQUEST,
    NOTES_LIST_SUCCESS,
    NOTES_LIST_FAIL,
    NOTE_CREATE_REQUEST,
    NOTE_CREATE_SUCCESS,
    NOTE_CREATE_FAIL,
    NOTE_UPDATE_FAIL,
    NOTE_UPDATE_REQUEST,
    NOTE_UPDATE_SUCCESS,
    NOTE_DELETE_REQUEST,
    NOTE_DELETE_SUCCESS,
    NOTE_DELETE_FAIL,
 } from './noteSlice';
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from './userSlice';


//  Login User
export const loginUser = async (user, dispatch) => {
    try {
        dispatch(USER_LOGIN_REQUEST());

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post('/api/users/login', user, config)
        dispatch(USER_LOGIN_SUCCESS(data))

        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        console.log("Error", error)
        dispatch(USER_LOGIN_FAIL(
            error.response && error.response.data.message 
            ? error.response.data.message : error.message
        ))
    }
} 
 
// Register User
export const registerUser = async (user, dispatch) => {
    try {

        dispatch(USER_REGISTER_REQUEST());

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data } = await axios.post("/api/users", user, config)
        dispatch(USER_REGISTER_SUCCESS(data))
        window.location.replace('/login');
        
    } catch (error) {
        dispatch(USER_REGISTER_FAIL(
            error.response && error.response.data.message
            ? error.response.data.message : error.message
        ))
    }
}

// Update User
export const updateUser = async (userInfo, user, dispatch) => {
    try {
        dispatch(USER_UPDATE_REQUEST())

        const config = {
            headers: {
                'content-type': "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/users/profile`, user, config);

        dispatch(USER_UPDATE_SUCCESS(data))

        dispatch(USER_LOGIN_SUCCESS(data))

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;

        dispatch(USER_UPDATE_FAIL(message))
    }
}

export const logoutUser = async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch(USER_LOGOUT())

    window.location.replace('/')


}

// List All Notes
export const listNotes = async (userInfo, dispatch) => {
    try {
        dispatch(NOTES_LIST_REQUEST())


        const config = {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        
        const { data } = await axios.get(`/api/notes/`, config)
        data.reverse()
        dispatch(NOTES_LIST_SUCCESS(data))

    } catch (error) {
        let message = error.response && error.response.data.message 
                        ? error.response.data.message 
                        : error.message;

        dispatch(NOTES_LIST_FAIL(message))
    }
}

// Create Note
export const createNote = async (userInfo, note, dispatch) => {
    try {
        dispatch(NOTE_CREATE_REQUEST())

        let config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/notes/create', note, config)
        dispatch(NOTE_CREATE_SUCCESS(data))

    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;

        dispatch(NOTE_CREATE_FAIL(message))
    }
}

// Update Note
export const updateNote = async (userInfo, id, note, dispatch) => {
    try {
        dispatch(NOTE_UPDATE_REQUEST())

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/notes/${id}`, note, config)

        dispatch(NOTE_UPDATE_SUCCESS(data))
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch(NOTE_UPDATE_FAIL(message))
    }
}

// Delete Note
export const deleteNote = async (userInfo, id, dispatch ) => {
    try {
        dispatch(NOTE_DELETE_REQUEST())

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/notes/${id}`, config)
        dispatch(NOTE_DELETE_SUCCESS(data.message))

    } catch (error) {
        
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message

        dispatch(NOTE_DELETE_FAIL(message))
    }
}
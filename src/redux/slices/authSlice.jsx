import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAlert } from "@slices/notificationSlice";
import Cookies from 'js-cookie';

const initialState = {
    token: localStorage.getItem("access_token") || null,
    user: [],
    isLoggedIn: false,
    loading: false,
    error: null,
    loadingUser: false,
    errorUser: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Set Data
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        // Loadings
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Loadings
        setLoadingUser: (state, action) => {
            state.loadingUser = action.payload;
        },
        // Errores
        setError: (state, action) => {
            state.error = action.payload;
        },
        // Errores
        setErrorUser: (state, action) => {
            state.errorUser = action.payload;
        },
    },
});

export const fetchLogin = (username, password) => async (dispatch) => {
    dispatch(setLoadingUser(true));
    try {
        const url = `${import.meta.env.VITE_API_URL}/atenea/api/login`;
        const response = await axios.post(url, { username, password });

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setUser(response.data));
        dispatch(setToken(response.data.data.token));
        Cookies.set("access_token", response.data.data.token, { expires: 1 / 24 }); 
        // localStorage.setItem("access_token", response.data.data.token);
        dispatch(setLoadingUser(false));

        dispatch(setIsLoggedIn(true));
    } catch (error) {
        if (error.status == 401) {
            dispatch(setErrorUser(error.response.data.message));
        } else {
            dispatch(setErrorUser("Error al iniciar sesión"));
        }
        dispatch(setLoadingUser(false));
    }
};

export const logout = () => async (dispatch) => {
    dispatch(setUser([]));
    dispatch(setIsLoggedIn(false));
    // localStorage.removeItem("access_token");
    Cookies.remove('access_token');
    dispatch(setAlert("info", "Sesión terminada"));
};

export default authSlice.reducer;

export const {
    setUser,
    setLoadingUser,
    setIsLoggedIn,
    setToken,
    setErrorUser,
} = authSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    token: "",
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
            state.errorError = action.payload;
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
        dispatch(setLoadingUser(false));

        dispatch(setIsLoggedIn(true));
    } catch (error) {
        dispatch(setErrorUser(error.message));
        dispatch(setLoadingUser(false));
    }
};

export const logout = () => async (dispatch) => {
    dispatch(setUser([]));
    dispatch(setIsLoggedIn(false));
};

export default authSlice.reducer;

export const { setUser, setLoadingUser, setIsLoggedIn, setErrorUser } =
    authSlice.actions;

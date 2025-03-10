import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "../../services/utils";
import { logout } from "./authSlice";

const initialState = {
    personales: [], // datos de personales
    adicionales: [], // datos de adicionales
    sistemas: [], // datos de sistemas
    relaciones: [], // datos de sistemas
    loadingPersonal: false,
    loadingAdicional: false,
    loadingSistemas: false,
    loadingRelaciones: false,
    errorPersonal: null,
    errorAdicional: null,
    errorSistemas: null,
    errorRelaciones: null,
};

const personalSlice = createSlice({
    name: "personal",
    initialState,
    reducers: {
        // Set Data
        setPersonal: (state, action) => {
            state.personales = action.payload;
        },
        setAdicional: (state, action) => {
            state.adicionales = action.payload;
        },
        setSistemas: (state, action) => {
            state.sistemas = action.payload;
        },
        setRelaciones: (state, action) => {
            state.relaciones = action.payload;
        },

        // Loadings
        setLoadingPersonal: (state, action) => {
            state.loadingPersonal = action.payload;
        },
        setLoadingAdicional: (state, action) => {
            state.loadingAdicional = action.payload;
        },
        setLoadingSistemas: (state, action) => {
            state.loadingSistemas = action.payload;
        },
        setLoadingRelaciones: (state, action) => {
            state.loadingRelaciones = action.payload;
        },

        // Errores
        setErrorPersonal: (state, action) => {
            state.errorPersonal = action.payload;
        },
        setErrorAdicional: (state, action) => {
            state.errorAdicional = action.payload;
        },
        setErrorSistemas: (state, action) => {
            state.errorSistemas = action.payload;
        },
        setErrorRelaciones: (state, action) => {
            state.errorRelaciones = action.payload;
        },
    },
});

// Función para obtener los adicionales
export const fetchPersonal = (dni) => async (dispatch, getState) => {
    dispatch(setLoadingPersonal(true));
    dispatch(setLoadingSistemas(true));
    try {
        const url = `${import.meta.env.VITE_API_URL}/atenea/api/persona/${dni}`;
        const response = await axios.get(url, getHeaders(getState));

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setPersonal(response.data.data.datos_personales[0]));
        dispatch(setSistemas(response.data.data.sistemas));

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setLoadingPersonal(false));
        dispatch(setLoadingSistemas(false));
    } catch (error) {
        if (error.status == 401) dispatch(logout());

        dispatch(setErrorPersonal(error.message));
        dispatch(setLoadingPersonal(false));
        dispatch(setErrorSistemas(error.message));
        dispatch(setLoadingSistemas(false));
    }
};

// Función para obtener los adicionales
export const fetchAdicionales = (documento) => async (dispatch, getState) => {
    dispatch(setLoadingAdicional(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/persona/${documento}/adicionales`;
        const response = await axios.get(url, getHeaders(getState));

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setAdicional(response.data.data));
        dispatch(setLoadingAdicional(false));
    } catch (error) {
        if (error.status == 401) dispatch(logout());

        dispatch(setErrorAdicional(error.message));
        dispatch(setLoadingAdicional(false));
    }
};

export const fetchRelaciones = (documento) => async (dispatch, getState) => {
    dispatch(setLoadingRelaciones(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/persona/${documento}/sistemas`;
        const response = await axios.get(url, getHeaders(getState));

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setRelaciones(response.data.data[0]));
        dispatch(setLoadingRelaciones(false));
    } catch (error) {
        if (error.status == 401) dispatch(logout());

        dispatch(setErrorRelaciones(error.message));
        dispatch(setLoadingRelaciones(false));
    }
};

export default personalSlice.reducer;

export const {
    setPersonal,
    setAdicional,
    setSistemas,
    setRelaciones,
    setLoadingPersonal,
    setLoadingSistemas,
    setLoadingAdicional,
    setLoadingRelaciones,
    setErrorSistemas,
    setErrorPersonal,
    setErrorAdicional,
    setErrorRelaciones,
} = personalSlice.actions;

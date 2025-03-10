import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "../../services/utils";

const initialState = {
    medicos: [],
    especialidades: [],
    servicios: [],
    centros: [],
    loadingMedicos: false,
    loadingEspecialidades: false,
    loadingServicios: false,
    loadingCentros: false,
    errorMedicos: null,
    errorEspecialides: null,
    errorServicios: null,
    errorCentros: null,
};

const cartillaSlice = createSlice({
    name: "cartilla",
    initialState,
    reducers: {
        // Set Data
        setMedicos: (state, action) => {
            state.medicos = action.payload;
        },
        setEspecialidades: (state, action) => {
            state.especialidades = action.payload;
        },
        setServicios: (state, action) => {
            state.servicios = action.payload;
        },
        setCentros: (state, action) => {
            state.centros = action.payload;
        },
        // Loadings
        setLoadingMedicos: (state, action) => {
            state.loadingMedicos = action.payload;
        },
        setLoadingEspecialidades: (state, action) => {
            state.loadingEspecialidades = action.payload;
        },
        setLoadingServicios: (state, action) => {
            state.loadingServicios = action.payload;
        },
        setLoadingCentros: (state, action) => {
            state.loadingCentros = action.payload;
        },

        // Errores
        setErrorMedicos: (state, action) => {
            state.errorMedicos = action.payload;
        },
        setErrorEspecialidades: (state, action) => {
            state.errorEspecialides = action.payload;
        },
        setErrorServicios: (state, action) => {
            state.errorServicios = action.payload;
        },
        setErrorCentros: (state, action) => {
            state.errorCentros = action.payload;
        },
    },
});

export const fetchCentros = (especialidad) => async (dispatch, getState) => {
    dispatch(setLoadingCentros(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/salud/centros/${especialidad}`;
        const response = await axios.get(url, getHeaders(getState));

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setCentros(response.data.data[0].centros));
        dispatch(setLoadingCentros(false));
    } catch (error) {
        dispatch(setErrorCentros(error.message));
        dispatch(setLoadingCentros(false));
    }
};

export const fetchMedicos = (especialidad) => async (dispatch, getState) => {
    dispatch(setLoadingMedicos(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/salud/medicos/${especialidad}`;
        const response = await axios.get(url, getHeaders(getState));

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setMedicos(response.data.data[0].medicos));
        dispatch(setLoadingMedicos(false));
    } catch (error) {
        dispatch(setErrorMedicos(error.message));
        dispatch(setLoadingMedicos(false));
    }
};

export const fetchEspecialidades = (cod) => async (dispatch, getState) => {
    dispatch(setLoadingEspecialidades(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/salud/servicios/${cod}`;
        const response = await axios.get(url, getHeaders(getState));

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setEspecialidades(response.data.data[0].esp));
        dispatch(setLoadingEspecialidades(false));
    } catch (error) {
        dispatch(setErrorEspecialidades(error.message));
        dispatch(setLoadingEspecialidades(false));
    }
};

export const fetchServicios = () => async (dispatch, getState) => {
    dispatch(setLoadingServicios(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/salud/servicios`;
        const response = await axios.get(url, getHeaders(getState));

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setServicios(response.data.data));
        dispatch(setLoadingServicios(false));
    } catch (error) {
        dispatch(setErrorServicios(error.message));
        dispatch(setLoadingServicios(false));
    }
};

export default cartillaSlice.reducer;

export const {
    setCentros,
    setMedicos,
    setServicios,
    setEspecialidades,
    setLoadingCentros,
    setLoadingMedicos,
    setLoadingServicios,
    setLoadingEspecialidades,
    setErrorCentros,
    setErrorMedicos,
    setErrorServicios,
    setErrorEspecialidades,
} = cartillaSlice.actions;

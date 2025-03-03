import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    comercios: [],
    loadingComercios: false,
    errorComercios: null,

    imponible: [],
    loadingImponible: false,
    errorImponible: null,
};

const imponibleSlice = createSlice({
    name: "imponible",
    initialState,
    reducers: {
        // Set Data
        setComercios: (state, action) => {
            state.comercios = action.payload;
        },
        setImponible: (state, action) => {
            state.imponible = action.payload;
        },

        // Loadings
        setLoadingComercios: (state, action) => {
            state.loadingComercios = action.payload;
        },
        setLoadingImponible: (state, action) => {
            state.loadingImponible = action.payload;
        },
        // Errores
        setErrorComercios: (state, action) => {
            state.errorComercios = action.payload;
        },
        setErrorImponible: (state, action) => {
            state.errorImponible = action.payload;
        },
    },
});

export const fetchComercios = (rubro) => async (dispatch) => {
    dispatch(setLoadingComercios(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/rafam/comercios/rubros/${rubro}`;
        const response = await axios.get(url);

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setComercios(response.data.data));
        dispatch(setLoadingComercios(false));
    } catch (error) {
        dispatch(setErrorComercios(error.message));
        dispatch(setLoadingComercios(false));
    }
};

export const fetchImponible = (imponible, tipo) => async (dispatch) => {
    dispatch(setLoadingImponible(true));

    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_API_URL
            }/atenea/api/rafam/${tipo}/${imponible}`
        );
        dispatch(setImponible(response.data.data[0]));
        dispatch(setLoadingImponible(false));
    } catch (error) {
        dispatch(setErrorImponible(error.message));
        dispatch(setLoadingImponible(false));
    }
};

export default imponibleSlice.reducer;

export const {
    setComercios,
    setImponible,
    setLoadingComercios,
    setLoadingImponible,
    setErrorComercios,
    setErrorImponible,
} = imponibleSlice.actions;

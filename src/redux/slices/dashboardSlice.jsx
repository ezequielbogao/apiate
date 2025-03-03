import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    main: [], // datos del principal dashboard
    rubros: [], // datos de rubro
    deuda: [], // datos de deuda
    loadingMain: false, // Indicador de carga para 'main'
    loadingRubros: false, // Indicador de carga para 'rubros'
    loadingDeuda: false, // Indicador de carga para 'deuda'
    errorMain: null, // Almacenará los errores
    errorRubros: null, // Almacenará los errores
    errorDeuda: null, // Almacenará los errores
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setMain: (state, action) => {
            state.main = action.payload;
        },
        setRubros: (state, action) => {
            state.rubros = action.payload;
        },
        setDeuda: (state, action) => {
            state.deuda = action.payload;
        },
        setLoadingMain: (state, action) => {
            state.loadingMain = action.payload;
        },
        setLoadingRubros: (state, action) => {
            state.loadingRubros = action.payload;
        },
        setLoadingDeuda: (state, action) => {
            state.loadingDeuda = action.payload;
        },
        setErrorMain: (state, action) => {
            state.errorMain = action.payload;
        },
        setErrorRubros: (state, action) => {
            state.errorRubros = action.payload;
        },
        setErrorDeuda: (state, action) => {
            state.errorDeuda = action.payload;
        },
    },
});

// Función para obtener la información principal
export const fetchMain = () => async (dispatch) => {
    dispatch(setLoadingMain(true));
    try {
        const url = `${import.meta.env.VITE_API_URL}/atenea/api/dashboard`;
        const response = await axios.get(url);

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setMain(response.data.data[0]));
        dispatch(setLoadingMain(false));
    } catch (error) {
        dispatch(setErrorMain(error.message));
        dispatch(setLoadingMain(false));
    }
};

// Función para obtener rubros
export const fetchRubros = () => async (dispatch) => {
    dispatch(setLoadingRubros(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/rafam/comercios/rubros`;
        const response = await axios.get(url);

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setRubros(response.data.data));
        dispatch(setLoadingRubros(false));
    } catch (error) {
        dispatch(setErrorRubros(error.message));
        dispatch(setLoadingRubros(false));
    }
};

// Función para obtener la deuda
export const fetchDeuda = () => async (dispatch) => {
    dispatch(setLoadingDeuda(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/rafam/recursos/deuda`;
        const response = await axios.get(url);

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setDeuda(response.data.data));
        dispatch(setLoadingDeuda(false));
    } catch (error) {
        dispatch(setErrorDeuda(error.message));
        dispatch(setLoadingDeuda(false));
    }
};

export default dashboardSlice.reducer;

export const {
    setMain,
    setRubros,
    setDeuda,
    setLoadingMain,
    setLoadingRubros,
    setLoadingDeuda,
    setErrorMain,
    setErrorRubros,
    setErrorDeuda,
} = dashboardSlice.actions;

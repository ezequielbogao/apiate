import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "../../services/utils";

const initialState = {
    declaraciones: [],
    loading: false,
    error: null,
};

const declaracionesJuradasSlice = createSlice({
    name: "declaracionesJuradas",
    initialState,
    reducers: {
        // Set Data
        setDeclaraciones: (state, action) => {
            state.declaraciones = action.payload;
        },

        // Loadings
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Errores
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const fetchPresentaciones = () => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/ddjj/presentaciones`;
        const response = await axios.get(url, getHeaders(getState));

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setDeclaraciones(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
    }
};


export default declaracionesJuradasSlice.reducer;

export const { setDeclaraciones, setLoading, setError } =
declaracionesJuradasSlice.actions;

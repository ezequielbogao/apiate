import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getHeaders } from "../../services/utils";

const initialState = {
    center: [-34.575267972791536, -58.72954234901199],
    locations: [],
    loading: false,
    error: null,
};

const reclamosSlice = createSlice({
    name: "reclamos",
    initialState,
    reducers: {
        // Set Data
        setCenter: (state, action) => {
            state.center = action.payload;
        },
        setLocations: (state, action) => {
            state.locations = action.payload;
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

export const fetchLocations = (documento) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
        const url = `${
            import.meta.env.VITE_API_URL
        }/atenea/api/callejero/${documento}`;
        const response = await axios.get(url, getHeaders(getState));

        // Guardamos la info del response y actualizamos el Loading
        dispatch(setLocations(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
    }
};

export const updateCenter = (data) => async (dispatch) => {
    dispatch(setLocations(data));
};

export default reclamosSlice.reducer;

export const { setCenter, setLocations, setLoading, setError } =
    reclamosSlice.actions;

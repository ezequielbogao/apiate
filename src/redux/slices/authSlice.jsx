import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    token: "",
    user: [],
    loading: false,
    error: null,
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

// export const fetchComercios = (rubro) => async (dispatch) => {
//     dispatch(setLoadingComercios(true));
//     try {
//         const url = `${
//             import.meta.env.VITE_API_URL
//         }/atenea/api/rafam/comercios/rubros/${rubro}`;
//         const response = await axios.get(url);

//         // Guardamos la info del response y actualizamos el Loading
//         dispatch(setComercios(response.data.data));
//         dispatch(setLoadingComercios(false));
//     } catch (error) {
//         dispatch(setErrorComercios(error.message));
//         dispatch(setLoadingComercios(false));
//     }
// };

export default authSlice.reducer;

export const { setToken, setUser, setLoading, setError } = authSlice.actions;

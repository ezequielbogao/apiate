import { configureStore } from "@reduxjs/toolkit";
import personalReducer from "@slices/personalSlice";
import dashboardReducer from "@slices/dashboardSlice";
import imponibleReducer from "@slices/imponibleSlice";
// import authReducer from "@slices/authSlice";
import notificationReducer from "@slices/notificationSlice";
import reclamosReducer from "@slices/reclamosSlice";
import cartillaReducer from "@slices/cartillaSlice";

export const store = configureStore({
    reducer: {
        personal: personalReducer,
        dashboard: dashboardReducer,
        imponible: imponibleReducer,
        // auth: authReducer,
        notification: notificationReducer,
        reclamos: reclamosReducer,
        cartilla: cartillaReducer,
    },
});

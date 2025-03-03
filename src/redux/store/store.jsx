import { configureStore } from "@reduxjs/toolkit";
import personalReducer from "@slices/personalSlice";
import dashboardReducer from "@slices/dashboardSlice";
import imponibleReducer from "@slices/imponibleSlice";
// import authReducer from "@slices/authSlice";
import notificationReducer from "@slices/notificationSlice";

export const store = configureStore({
    reducer: {
        personal: personalReducer,
        dashboard: dashboardReducer,
        imponible: imponibleReducer,
        // auth: authReducer,
        notification: notificationReducer,
    },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            );
        },
    },
});

export const setAlert = (type, message) => async (dispatch) => {
    const id = new Date().getTime();
    const notification = {
        id,
        type,
        message,
        timestamp: Date.now(),
    };

    dispatch(addNotification(notification));

    setTimeout(() => {
        dispatch(removeNotification(id));
    }, 5000);
};

export default notificationSlice.reducer;
export const { addNotification, removeNotification } =
    notificationSlice.actions;

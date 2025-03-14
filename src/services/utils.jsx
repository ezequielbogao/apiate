export const getHeaders = (getState) => {
    const token = getState().auth.token;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

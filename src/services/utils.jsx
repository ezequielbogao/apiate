export const getHeaders = (getState) => {
    const token = getState().auth.token;
    console.log(token)
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

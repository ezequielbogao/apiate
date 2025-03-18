import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn, setToken } from "../../../redux/slices/authSlice";
import Cookies from 'js-cookie';


export const AuthMiddleware = ({ children }) => {
    const { isLoggedIn, user, token } = useSelector((state) => state.auth); // Obtener el estado de usuario
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const ltoken = Cookies.get('access_token');
        // const ltoken = localStorage.getItem("access_token");
        if (!ltoken) navigate("/login");

        if (ltoken) {
            if (!token) dispatch(setToken(ltoken));
            if (token) dispatch(setIsLoggedIn(true));
        }

        // if (user.length == 0) navigate("/login");
    }, [navigate, dispatch, token, isLoggedIn]);

    // if (user.length == 0) return null;

    return children;
};

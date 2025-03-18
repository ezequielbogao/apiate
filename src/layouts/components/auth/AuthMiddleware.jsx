import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
    setIsLoggedIn,
    setToken,
    setUser,
} from "../../../redux/slices/authSlice";
import routes from "../../../config/routes.cfg";

// Función para normalizar las rutas dinámicas (remover los parámetros)
const normalizeRoute = (route) => {
    return route.replace(/:[^\s/]+/g, ":param"); // Reemplaza cualquier parámetro dinámico por ":param"
};

export const AuthMiddleware = ({ children }) => {
    const { isLoggedIn, user, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const ltoken = Cookies.get("access_token");
        const cookieUser = Cookies.get("user");
        let user = {};
        if (cookieUser) user = JSON.parse(Cookies.get("user"));

        if (!ltoken || !user) {
            navigate("/login");
        }

        if (ltoken && !token) {
            dispatch(setToken(ltoken));
            dispatch(setUser(user));
        }

        if (ltoken && !isLoggedIn) {
            dispatch(setIsLoggedIn(true));
        }

        const currentRoute = window.location.pathname;

        const roles = user.roles || [];
        const accessibleRoutes = routes[roles[0]] || [];

        // Normalizamos la ruta actual y las rutas accesibles
        const normalizedCurrentRoute = normalizeRoute(currentRoute);
        const normalizedAccessibleRoutes = accessibleRoutes.map(normalizeRoute);

        if (
            user.id &&
            !normalizedAccessibleRoutes.includes(normalizedCurrentRoute)
        ) {
            // navigate("/acceso-denegado");
        }
    }, [navigate, dispatch, token, isLoggedIn, user]);

    return children;
};

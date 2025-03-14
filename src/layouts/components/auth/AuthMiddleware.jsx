import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
        const ltoken = localStorage.getItem("access_token");
        const user = JSON.parse(localStorage.getItem("user"));

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

        // if (ltoken && !user.id) {
        //     // Aquí podrías hacer una petición al backend para obtener la información completa del usuario (si es necesario)
        //     // Ejemplo: dispatch(fetchUserData());
        // }

        const currentRoute = window.location.pathname;
        console.log("currentRoute", currentRoute);

        const roles = user.roles || [];
        const accessibleRoutes = routes[roles[0]] || [];

        // Normalizamos la ruta actual y las rutas accesibles
        const normalizedCurrentRoute = normalizeRoute(currentRoute);
        const normalizedAccessibleRoutes = accessibleRoutes.map(normalizeRoute);

        // Comprobamos si la ruta actual está en las rutas accesibles para el rol
        if (
            user.id &&
            !normalizedAccessibleRoutes.includes(normalizedCurrentRoute)
        ) {
            navigate("/acceso-denegado");
        }
    }, [navigate, dispatch, token, isLoggedIn, user]);

    // if (!isLoggedIn) {
    //     return null;
    // }

    return children;
};

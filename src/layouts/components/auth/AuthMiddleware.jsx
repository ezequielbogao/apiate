import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AuthMiddleware = ({ children }) => {
    const { user } = useSelector((state) => state.auth); // Obtener el estado de usuario
    const navigate = useNavigate();

    useEffect(() => {
        if (user.length == 0) navigate("/login");
    }, [user, navigate]);

    if (user.length == 0) return null;

    return children;
};

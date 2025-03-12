import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "@slices/notificationSlice";
import { fetchPersonal } from "@slices/personalSlice";
import { useDispatch, useSelector } from "react-redux";

import Lupa from "@icons/Lupa";
import Logout from "@icons/Logout";
import logo_black from "../assets/ate_logo_b.svg";
import logo_white from "../assets/ate_logo_w.svg";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { personales } = useSelector((state) => state.personal);

    const [darkMode, setDarkMode] = useState(false);
    const { handleSubmit } = useForm();
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
        }
    }, [darkMode]);

    const onSubmit = async () => {
        let dni = document.querySelector("[name=dni]").value;
        dispatch(fetchPersonal(dni));
        navigate("/personal");
    };

    useEffect(() => {
        if (personales && personales.documento) {
            dispatch(setAlert("success", "Persona encontrada con éxito"));
        } else if (!personales) {
            dispatch(setAlert("warning", "No se encontró ninguna persona"));
        }
    }, [personales, dispatch]);

    const closeSession = () => {
        dispatch(logout());
        dispatch(setAlert("info", "Cerraste sesión"));
        navigate("/");
    };

    return (
        <>
            <div className="px-5 gap-5 flex flex-col md:flex-row align-middle items-center justify-between py-2 md:py-3 text-left border-b-2 border-azure-100 dark:border-azure-600 bg-white dark:bg-azure-700">
                <div className="flex align-middle items-center w-full">
                    <a href="/">
                        <img
                            src={darkMode ? logo_white : logo_black}
                            alt="Logo de la aplicación"
                            className="me-5 w-14 md:w-20"
                        />
                    </a>
                    <div className="flex flex-col">
                        <span className="text-sm md:text-md text-azure-400 dark:text-azure-400 font-light">
                            API Atenea
                        </span>
                        <span className="text-md md:text-lg text-azure-700 dark:text-azure-300 font-medium">
                            VISUALIZACIÓN DE DATOS
                        </span>
                    </div>
                </div>
                <div className="flex gap-4 w-full justify-end">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex rounded-xl justify-end w-full">
                        <input
                            required
                            type="text"
                            className="form-control focus:outline-none bg-azure-100 dark:bg-azure-500 dark:text-azure-100 p-2  text-md font-light rounded-tl-xl rounded-bl-xl"
                            placeholder="Buscar por DNI"
                            name="dni"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-azure-600 text-white text-xs font-light  md:mt-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl focus:border-azure-600 hover:bg-azure-500 hover:outline-none hover:border-azure-600">
                                <Lupa width={"20"} />
                            </button>
                        </div>
                    </form>
                    <Link
                        onClick={closeSession}
                        to="/login"
                        className="p-2 rounded-full bg-azure-50 text-azure-800 dark:text-yellow-300 hover:bg-azure-100 dark:bg-azure-800 hover:dark:bg-azure-600 border-none focus:outline-none">
                        <Logout />
                    </Link>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-azure-50 text-azure-800 dark:text-yellow-300 hover:bg-azure-100 dark:bg-azure-800 hover:dark:bg-azure-600 border-none focus:outline-none">
                        {darkMode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-sun">
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-moon">
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;

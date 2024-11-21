import { useEffect, useState } from "react";
import logo_black from "../assets/logo_black.svg";
import logo_white from "../assets/logo_white.svg";
const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

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

    return (
        <div className="px-5 gap-5 flex align-middle items-center justify-between py-5 text-left border-b-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
            <div className="flex align-middle items-center">
                <img
                    src={darkMode ? logo_white : logo_black}
                    alt="Logo de la aplicación"
                    className="me-5"
                />
                <div className="flex flex-col">
                    <span className="text-md text-azure-400 dark:text-azure-400 font-light">
                        API Atenea
                    </span>
                    <span className="text-lg text-azure-700 dark:text-azure-300 font-medium">
                        VISUALIZACIÓN DE DATOS
                    </span>
                </div>
            </div>
            <div className="">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full bg-azure-50 text-azure-800 dark:text-yellow-300 hover:bg-azure-100 dark:bg-azure-800 hover:dark:bg-azure-600 border-none focus:outline-none">
                    {darkMode ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-sun">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-moon">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Header;

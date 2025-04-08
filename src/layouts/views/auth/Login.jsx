import axios from "axios";
import logo_black from "../../../assets/ate_logo_b.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@slices/notificationSlice";
import Notification from "../../components/Notification";
import { ToastContainer } from "react-toastify";
import Loading from "@cpt/Loading";
import {
    Card,
    CardBody,
    Collapse,
    Spinner,
    Typography,
} from "@material-tailwind/react";

import { fetchLogin, setIsLoggedIn } from "../../../redux/slices/authSlice";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, setLoginUser] = useState(true);
    const [accessView, setAccessView] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loadingUser, isLoggedIn, errorUser } = useSelector(
        (state) => state.auth
    );

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(fetchLogin(username, password));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn, navigate]);

    const handleAccessView = () => {
        setAccessView(!accessView);
    };

    return (
        <>
            <div className="w-full grid grid-cols-8 h-full min-h-screen bg-azure-100 dark:bg-azure-900">
                <div className="hidden md:flex col-span-8 md:col-span-4 items-center justify-center bg-azure-200 dark:bg-azure-800">
                    <div className="hidden md:flex p-5 text-center flex-col justify-center align-middle items-center">
                        <img
                            src={logo_black}
                            alt="Logo de la aplicación"
                            className="w-14 md:w-40"
                        />
                        <div className="flex flex-col mt-10">
                            <span className="md:text-3xl text-azure-400 dark:text-azure-400 font-light">
                                Atenea
                            </span>
                            <span className="md:text-4xl text-azure-700 dark:text-azure-300 font-medium">
                                VISUALIZACIÓN <br></br>DE DATOS
                            </span>
                        </div>
                    </div>
                </div>
                {loginUser ? (
                    <div className="col-span-8 md:col-span-4 flex flex-col items-center justify-center bg-gray-100 dark:bg-azure-900">
                        <div className="flex md:hidden p-5 text-center flex-col justify-center align-middle items-center">
                            <img
                                src={logo_black}
                                alt="Logo de la aplicación"
                                className="w-40"
                            />
                            <div className="flex flex-col mt-10">
                                <span className="text-3xl text-azure-400 dark:text-azure-400 font-light">
                                    Atenea
                                </span>
                                <span className="text-4xl text-azure-700 dark:text-azure-300 font-medium">
                                    VISUALIZACIÓN <br></br>DE DATOS
                                </span>
                            </div>
                        </div>
                        <div className="p-5 w-full max-w-md text-left">
                            {loadingUser ? (
                                <div className="flex justify-center align-items-center flex-col text-center">
                                    <span className="text-azure-600">
                                        VALIDANDO CRENDENCIALES...
                                    </span>
                                    <div className="w-full flex justify-center mt-4">
                                        <Spinner className="h-12 w-12 text-azure-400" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-xl text-center font-normal text-azure-800 dark:text-azure-50 mb-10">
                                        INGRESÁ TUS CREDENCIALES
                                    </h3>
                                    <form
                                        className="mt-4 space-y-4"
                                        onSubmit={onSubmit}>
                                        <div>
                                            <label
                                                htmlFor="username"
                                                className="block text-azure-700 dark:text-azure-300">
                                                Nombre de usuario
                                            </label>
                                            <input
                                                type="text"
                                                id="username"
                                                placeholder="Introduce tu usuario"
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                                className="w-full px-4 py-2 border border-azure-200 rounded-md text-azure-700 bg-white dark:bg-azure-700 dark:text-azure-50 focus:outline-none dark:border-azure-500 dark:border-2"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block text-azure-700 dark:text-azure-300">
                                                Contraseña
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                                placeholder="Introduce tu contraseña"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                className="w-full px-4 py-2 border border-azure-200 rounded-md text-azure-700 bg-white dark:bg-azure-700 dark:text-azure-50 focus:outline-none dark:border-azure-500 dark:border-2"
                                            />
                                        </div>
                                        <div className="flex w-full font-light text-center border-2 rounded-md dark:border-none">
                                            <span className="text-center w-full text-red-500">
                                                {errorUser}
                                            </span>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full py-2 bg-azure-800 text-white rounded-md hover:bg-azure-700 border-none focus:outline-none">
                                                Iniciar sesión
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                            <div className="flex justify-center align-items-center flex-col text-left mt-10 p-5 bg-azure-100 border-2 border-azure-300 rounded-lg dark:bg-azure-600 dark:text-azure-100 dark:border-azure-700">
                                <span className="text-lg">
                                    ¿Querés usar nuestra API de ATENEA?
                                </span>
                                <p className="text-justify font-light mt-2">
                                    Ingresá como <b>usuario API</b> para obtener
                                    acceso a nuestros endpoints y trabajar con
                                    los datos de forma personalizada.
                                </p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setLoginUser(false)}
                                        className="bg-light-green-500 mt-5 text-white border-0 outline-none hover:bg-light-green-600 w-auto focus:bg-light-green-700 focus:outline-0 transition-colors">
                                        Conocer más...
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col-span-8 md:col-span-4 flex flex-col items-center justify-center bg-azure-100 dark:bg-azure-900">
                        <div className="flex md:hidden p-5 text-center flex-col justify-center align-middle items-center">
                            <img
                                src={logo_black}
                                alt="Logo de la aplicación"
                                className="w-40"
                            />
                            <div className="flex flex-col mt-10">
                                <span className="text-3xl text-azure-400 dark:text-azure-400 font-light">
                                    Atenea
                                </span>
                                <span className="text-4xl text-azure-700 dark:text-azure-300 font-medium">
                                    VISUALIZACIÓN <br></br>DE DATOS
                                </span>
                            </div>
                        </div>
                        {accessView ? (
                            <div className="p-5 w-full max-w-md text-left">
                                {" "}
                                <h3 className="text-xl text-center text-azure-800 dark:text-azure-50 mb-10">
                                    ACCEDÉ A NUESTRA API
                                </h3>
                                <form
                                    className="mt-4 space-y-4"
                                    onSubmit={onSubmit}>
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block text-azure-700 dark:text-azure-300">
                                            Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Introduce tu correo"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            className="w-full px-4 py-2 border border-azure-200 rounded-md text-azure-700 bg-white dark:bg-azure-700 dark:text-azure-50 focus:outline-none dark:border-azure-500 dark:border-2"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <button
                                            type="submit"
                                            className="w-full py-2 bg-azure-800 text-white rounded-md hover:bg-azure-700 border-none focus:outline-none">
                                            Solicitar
                                        </button>
                                        <div className="bg-orange-200 p-5 rounded-md">
                                            <span className="text-azure-800 text-justify font-normal mt-3">
                                                Tras ingresar tu correo,
                                                recibirás un mensaje con más
                                                detalles sobre cómo obtener
                                                acceso y comenzar a trabajar con
                                                nuestros datos.
                                            </span>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() =>
                                                    handleAccessView()
                                                }
                                                className="bg-azure-100 mt-10 rounded-md text-azure-700 border-0 outline-none hover:bg-azure-200 focus:bg-azure-600 focus:text-white focus:outline-0 transition-colors w-auto">
                                                Volver
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="p-5 w-full max-w-md text-left">
                                {loadingUser ? (
                                    <div className="flex justify-center align-items-center flex-col text-center">
                                        <span className="text-azure-300">
                                            VALIDANDO CRENDENCIALES...
                                        </span>
                                        <div className="w-full flex justify-center mt-4">
                                            <Spinner className="h-12 w-12 text-azure-300" />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-xl text-center text-azure-800 dark:text-azure-50">
                                            PANEL DE CONTROL DE USUARIO API
                                        </h3>
                                        <form
                                            className="mt-4 space-y-4"
                                            onSubmit={onSubmit}>
                                            <div>
                                                <label
                                                    htmlFor="username"
                                                    className="block text-azure-700 dark:text-azure-300">
                                                    Correo electrónico
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    placeholder="Introduce tu correo"
                                                    onChange={(e) =>
                                                        setUsername(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2 border border-azure-200 rounded-md text-azure-700 bg-white dark:bg-azure-700 dark:text-azure-50 focus:outline-none dark:border-azure-500 dark:border-2"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="password"
                                                    className="block text-azure-700 dark:text-azure-300">
                                                    Contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    placeholder="Introduce tu contraseña"
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2 border border-azure-200 rounded-md text-azure-700 bg-white dark:bg-azure-700 dark:text-azure-50 focus:outline-none dark:border-azure-500 dark:border-2"
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="w-full py-2 bg-azure-800 text-white rounded-md hover:bg-azure-700 border-none focus:outline-none">
                                                    Iniciar sesión
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleAccessView()
                                                    }
                                                    className="w-full py-2 mt-3 bg-light-green-600 text-white rounded-md hover:bg-light-green-700 border-none focus:outline-none">
                                                    Solicitar acceso
                                                </button>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() =>
                                                            setLoginUser(true)
                                                        }
                                                        className="bg-azure-100 mt-10 rounded-md text-azure-700 border-0 outline-none hover:bg-azure-200  focus:bg-azure-600 focus:text-white focus:outline-0 transition-colors w-auto">
                                                        Volver
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <Notification />
            </div>
            <ToastContainer
                limit={3}
                // stacked
                pauseOnFocusLoss={false}
                autoClose={5000}
            />
        </>
    );
};

export default Login;

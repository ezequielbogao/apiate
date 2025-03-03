import axios from "axios";
import logo_black from "../../../assets/ate_logo_b.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@slices/notificationSlice";
import Notification from "../../components/Notification";
import { ToastContainer } from "react-toastify";
import Loading from "@cpt/Loading";
import { Spinner } from "@material-tailwind/react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/atenea/api/login`,
                { username, password }
            );
            if (response.data.status == "success") {
                // dispatch(setAlert("success", "Login exitoso"));

                setTimeout(() => {
                    setLoading(false);
                    navigate("/");
                }, 3000);
            }
        } catch (e) {
            console.log(e);
        }
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
                                API Atenea
                            </span>
                            <span className="md:text-4xl text-azure-700 dark:text-azure-300 font-medium">
                                VISUALIZACIÓN <br></br>DE DATOS
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-span-8 md:col-span-4 flex flex-col items-center justify-center bg-azure-100 dark:bg-azure-900">
                    <div className="flex md:hidden p-5 text-center flex-col justify-center align-middle items-center">
                        <img
                            src={logo_black}
                            alt="Logo de la aplicación"
                            className="w-40"
                        />
                        <div className="flex flex-col mt-10">
                            <span className="text-3xl text-azure-400 dark:text-azure-400 font-light">
                                API Atenea
                            </span>
                            <span className="text-4xl text-azure-700 dark:text-azure-300 font-medium">
                                VISUALIZACIÓN <br></br>DE DATOS
                            </span>
                        </div>
                    </div>
                    <div className="p-5 w-full max-w-md text-left">
                        {loading ? (
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
                                <h3 className="text-xl text-center font-normal text-azure-800 dark:text-azure-50">
                                    Ingresá tus credenciales
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
                                            className="w-full px-4 py-2 border rounded-md text-azure-700 bg-white dark:bg-azure-700 dark:text-azure-50 focus:outline-none"
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
                                                setPassword(e.target.value)
                                            }
                                            className="w-full px-4 py-2 border rounded-md text-azure-700 bg-white dark:bg-azure-700 dark:text-azure-50 focus:outline-none"
                                        />
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
                    </div>
                </div>
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

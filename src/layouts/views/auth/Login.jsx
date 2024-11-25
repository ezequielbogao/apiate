import logo_black from "../../../assets/logo_black.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const onSubmit = () => {
        navigate("/");
    };

    return (
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
                    <h3 className="text-xl text-center font-normal text-azure-800 dark:text-azure-50">
                        Ingresá tus credenciales
                    </h3>
                    <form className="mt-4 space-y-4" onSubmit={onSubmit}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-azure-700 dark:text-azure-300">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="username"
                                placeholder="Introduce tu correo"
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
                </div>
            </div>
        </div>
    );
};

export default Login;

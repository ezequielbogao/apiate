import { Link } from "react-router-dom";

const Denegado = () => {
    return (
        <>
            <div className="w-full grid grid-cols-12 h-full min-h-screen bg-azure-100 dark:bg-azure-900">
                <div className="flex flex-col col-span-12 items-center justify-center bg-azure-200 dark:bg-azure-800">
                    <div className="p-5 w-full max-w-md text-left flex flex-col justify-center items-center">
                        <h3 className="text-xl text-center text-azure-800 dark:text-azure-50">
                            No tiene permisos suficientes
                        </h3>
                        <div className="flex justify-end mt-5">
                            <Link
                                className="p-4 text-white hover:text-white bg-azure-600 rounded-md opacity-90 hover:opacity-100"
                                to={"/"}>
                                Volver
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Denegado;

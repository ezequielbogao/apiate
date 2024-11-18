import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";

const Personal = () => {
    const { persona, error, loading } = useMenu();

    return (
        <Content>
            <div className="col-span-12 sm:col-span-9 md:col-span-10 text-left">
                <div className="col-span-12 p-5 text-left  border-b-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
                    <div className="flex flex-col text-left">
                        <span className="text-md text-azure-400 font-thin">
                            Persona
                        </span>
                        <span className="text-2xl text-azure-700 dark:text-azure-300 font-normal">
                            INFORMACIÓN
                        </span>
                    </div>
                </div>
                <div className="p-5">
                    {loading ? (
                        <div className="w-full h-full flex justify-center align-middle items-center">
                            <p className="text-azure-600 dark:text-azure-200">
                                Cargando...
                            </p>
                        </div>
                    ) : (
                        persona && (
                            <div className="bg-azure-50 dark:bg-azure-800 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                                <div className="bg-azure-50 dark:bg-azure-800 text-azure-600 mb-10">
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300">
                                            Nombre y Apellido
                                        </span>
                                        <span className=" dark:text-azure-100">
                                            {persona.nombre} {persona.apellido}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300">
                                            Documento
                                        </span>
                                        <span className=" dark:text-azure-100">
                                            {persona.documento}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300">
                                            Dirección
                                        </span>
                                        <span className=" dark:text-azure-100">
                                            {persona.calle}
                                            {persona.altura}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                    {error && (
                        <div className="w-full h-full flex justify-center align-middle items-center">
                            <p className="text-red-600">Error</p>
                        </div>
                    )}
                </div>
            </div>
        </Content>
    );
};

export default Personal;

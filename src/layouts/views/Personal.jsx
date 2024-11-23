import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";
import Lupacheck from "../components/icons/Lupacheck";
import {
    Button,
    Popover,
    PopoverContent,
    PopoverHandler,
    Spinner,
    Typography,
} from "@material-tailwind/react";
import Loading from "../components/Loading";
import { Input } from "postcss";
import Checks from "../components/icons/Checks";

const Personal = () => {
    const { persona, error, loading } = useMenu();

    return (
        <Content>
            <div className="text-left w-full">
                <div className="flex justify-between p-5 text-left border-b-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
                    <div className="flex flex-col text-left">
                        <span className="sm:text-sm md:text-md text-azure-400 font-light">
                            Persona
                        </span>
                        <span className="sm:text-xl md:text-2xl text-azure-700 dark:text-azure-300 font-medium">
                            INFORMACIÓN
                        </span>
                    </div>
                    <Popover placement="bottom">
                        <PopoverHandler>
                            <button
                                type="submit"
                                className="text-lg flex justify-center items-center transition-colors rounded-xl text-azure-700  hover:text-green-300 bg-transparent hover:dark:text-green-500 dark:text-azure-50 border-none focus:outline-none">
                                <Lupacheck width="40" height="40" />
                                Sistemas activos
                            </button>
                        </PopoverHandler>
                        <PopoverContent className="md:1/12 lg:w-1/6 bg-white dark:bg-azure-700 dark:border-azure-500">
                            <table className="w-full min-w-max table-auto text-left ">
                                <tbody>
                                    <tr>
                                        <td className="p-4">
                                            <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                Salud
                                            </span>
                                        </td>
                                        <td className="p-4 flex justify-end">
                                            <span className="font-light text-sm text-blue-600 dark:text-azure-300">
                                                <Checks
                                                    width="30"
                                                    height="30"
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">
                                            <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                Rafam
                                            </span>
                                        </td>
                                        <td className="p-4 flex justify-end">
                                            <span className="font-light text-sm text-gray-400 dark:text-azure-300">
                                                <Checks
                                                    width="30"
                                                    height="30"
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="p-5">
                    {loading ? (
                        <Loading title="datos personales" />
                    ) : (
                        persona && (
                            <div className="bg-white dark:bg-azure-700 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                                <div className=" text-azure-600 mb-10">
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            Nombre y Apellido
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {persona.nombre} {persona.apellido}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            Documento
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {persona.documento}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            Dirección
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
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

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
import Checks from "../components/icons/Checks";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CheckItem from "../components/CheckItem";
import Systems from "../components/icons/Systems";

const Personal = () => {
    const { persona, setError, error, loading } = useMenu();
    const [checksActive, setChecksActive] = useState(false);
    const [checks, setChecks] = useState(null);

    const loadSystems = async () => {
        let getChecks = null;
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/personas/${persona.documento}/sistemas`
            );
            getChecks = response.data.data[0];
        } catch (err) {
            console.log(err);
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        } finally {
            setChecks(getChecks);
            console.log(getChecks);
        }
    };

    const active = () => {
        setChecksActive(!checksActive);
    };

    useEffect(() => {
        if (persona) loadSystems();
    }, [persona]);
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
                    <div className="flex flex-col">
                        {checks ? (
                            <>
                                <button
                                    onClick={active}
                                    className="text-lg gap-3 flex justify-center items-center transition-colors rounded-xl text-azure-700  hover:text-green-300 bg-transparent hover:dark:text-light-green-500 dark:text-azure-50 border-none focus:outline-none">
                                    <Systems width="40" height="40" />
                                    SISTEMAS
                                </button>
                                <div
                                    className={`bg-white w-[230px] px-4 dark:bg-azure-700 right-0 dark:border-azure-500 border-2 rounded-xl border-azure-100 absolute mt-16 ${
                                        !checksActive ? "hidden" : "block"
                                    }`}>
                                    <div className="w-full min-w-max table-auto text-left">
                                        {checks ? (
                                            <>
                                                <CheckItem
                                                    title="Autogestion"
                                                    check={checks.autogestion}
                                                />
                                                <CheckItem
                                                    title="Rafam"
                                                    check={checks.rafam}
                                                />
                                                <CheckItem
                                                    title="Salud"
                                                    check={checks.salud}
                                                />
                                                <CheckItem
                                                    title="Reclamos"
                                                    check={checks.reclamos}
                                                />
                                                <CheckItem
                                                    title="Citas"
                                                    check={checks.citas}
                                                />
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="p-5">
                    {loading ? (
                        <Loading title="datos personales" />
                    ) : persona ? (
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
                    ) : (
                        <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                            NO HAY INFORMACION PERSONAL DISPONIBLE
                        </div>
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

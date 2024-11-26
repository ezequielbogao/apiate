import { useEffect, useState } from "react";
import { useMenu } from "../../Context/MenuContext";

import Content from "../components/Content";
import Loading from "../components/Loading";
import CheckItem from "../components/CheckItem";
import Systems from "../components/icons/Systems";
import Errormsg from "../components/Errormsg";

import axios from "axios";
import { toast } from "react-toastify";

const Personal = () => {
    const { persona, setError, error, loading } = useMenu();
    const [checksActive, setChecksActive] = useState(false);
    const [checks, setChecks] = useState(null);
    const [adicionales, setAdicionales] = useState(null);

    const loadSystems = async () => {
        let getChecks = null;
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/persona/${persona.documento}/sistemas`
            );
            getChecks = response.data.data[0];
        } catch (err) {
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        } finally {
            setChecks(getChecks);
        }
    };

    const loadAdicionales = async () => {
        let getAdicionales = null;
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/persona/${persona.documento}/adicionales`
            );
            getAdicionales = response.data.data;
            console.log(response.data.data);
        } catch (err) {
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        } finally {
            setAdicionales(getAdicionales);
        }
    };

    const active = () => {
        setChecksActive(!checksActive);
    };

    useEffect(() => {
        if (persona) {
            loadSystems();
            loadAdicionales();
            console.log(adicionales);
        }
    }, [persona]);
    return (
        <Content>
            <div className="text-left w-full">
                <div className="p-5 flex justify-between text-left border-b-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
                    <div className="flex flex-col text-left">
                        <span className="text-md text-azure-400 font-light">
                            Persona
                        </span>
                        <span className="text-2xl text-azure-700 dark:text-azure-300 font-medium">
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
                                        NOMBRE Y APELLIDO
                                    </span>
                                    <span className=" dark:text-azure-100 font-medium">
                                        {persona.nombre} {persona.apellido}
                                    </span>
                                </div>
                                <div className="flex flex-col mt-3">
                                    <span className="text-azure-300 font-light">
                                        DOCUMENTO
                                    </span>
                                    <span className=" dark:text-azure-100 font-medium">
                                        {persona.documento}
                                    </span>
                                </div>
                                <div className="flex flex-col mt-3">
                                    <span className="text-azure-300 font-light">
                                        DIRECCIÓN
                                    </span>
                                    <span className=" dark:text-azure-100 font-medium">
                                        {persona.calle}
                                        {persona.altura}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY INFORMACIÓN PERSONAL DISPONIBLE
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
                <div className="p-5">
                    {adicionales && (
                        <div className="bg-white dark:bg-azure-700 rounded-xl mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                            <span className="text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                DATOS ADICIONALES
                            </span>
                            <div className="text-md text-orange-800 dark:text-orange-300 mb-4 font-light">
                                La información que se muestra a continuación
                                provienen de varios sistemas. Es por esto, que
                                algunos datos pueden estar repetidos o
                                desorganizados.
                            </div>
                            <div className="text-azure-600 mb-10">
                                {Object.entries(adicionales).map(
                                    ([key, value]) => (
                                        <div key={key} className="mb-5">
                                            <span className="text-azure-400 font-light text-sm">
                                                {key}:
                                            </span>
                                            <ul>
                                                {value.map((item, index) => (
                                                    <li
                                                        className="mx-3 text-azure-500 text-sm"
                                                        key={index}>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Content>
    );
};

export default Personal;

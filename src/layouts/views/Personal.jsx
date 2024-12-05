import { useEffect, useState } from "react";
import { useMenu } from "../../Context/MenuContext";

import Content from "../components/Content";
import CheckItem from "../components/CheckItem";
import Systems from "../components/icons/Systems";
import Errormsg from "../components/Errormsg";

import axios from "axios";
import { toast } from "react-toastify";

import TableRodado from "../components/imponibles/TableRodado";
import TableInmueble from "../components/imponibles/TableInmueble";
import TableComercio from "../components/imponibles/TableComercio";
import TableCitas from "../components/imponibles/TableCitas";

const Personal = () => {
    const { persona, setError, error } = useMenu();
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
        }
    }, [persona]);

    return (
        <Content>
            <div className="text-left w-full">
                <div className="p-3 px-5  flex justify-between text-left border-b-2 border-azure-100 dark:border-azure-600 bg-white dark:bg-azure-700">
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
                    <div className="grid grid-cols-8 gap-5">
                        <div className="col-span-8 md:col-span-2 py-5">
                            <div>
                                {persona && (
                                    <div className=" text-azure-600 mb-10">
                                        <span className="text-lg text-center text-azure-600 font-normal dark:text-azure-300">
                                            DATOS PERSONALES
                                        </span>
                                        <div className="flex flex-col mt-3">
                                            <span className="text-azure-300 dark:text-azure-400 font-light">
                                                NOMBRE Y APELLIDO
                                            </span>
                                            <span className=" dark:text-azure-100 font-medium">
                                                {persona.nombre}{" "}
                                                {persona.apellido}
                                            </span>
                                        </div>
                                        <div className="flex flex-col mt-3">
                                            <span className="text-azure-300 dark:text-azure-400 font-light">
                                                DOCUMENTO
                                            </span>
                                            <span className=" dark:text-azure-100 font-medium">
                                                {persona.documento}
                                            </span>
                                        </div>
                                        <div className="flex flex-col mt-3">
                                            <span className="text-azure-300 dark:text-azure-400 font-light">
                                                DIRECCIÓN
                                            </span>
                                            <span className=" dark:text-azure-100 font-medium">
                                                {persona.calle}
                                                {persona.altura}
                                            </span>
                                        </div>
                                        <div className="my-5 border border-b-azure-100 dark:border-azure-700"></div>
                                    </div>
                                )}
                                {error && <Errormsg />}
                            </div>

                            <div>
                                {adicionales && (
                                    <div className="">
                                        <span className="text-lg text-center text-azure-600 font-normal dark:text-azure-300">
                                            DATOS ADICIONALES
                                        </span>
                                        <div className="text-md text-orange-800 dark:text-orange-300 mb-4 font-light">
                                            La información que se muestra a
                                            continuación provienen de varios
                                            sistemas. Es por esto, que algunos
                                            datos pueden estar repetidos o
                                            desorganizados.
                                        </div>
                                        <div className="text-azure-600 mb-10">
                                            {Object.entries(adicionales).map(
                                                ([key, value]) => (
                                                    <div
                                                        key={key}
                                                        className="mb-5">
                                                        <span className="text-azure-400 dark:text-azure-400 font-light text-md">
                                                            {key}:
                                                        </span>
                                                        <ul>
                                                            {value.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        className="mx-3 text-azure-600 dark:text-azure-200 text-sm font-medium"
                                                                        key={
                                                                            index
                                                                        }>
                                                                        {item}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-span-8 md:col-span-6 bg-white dark:bg-azure-800 dark:rounded-xl border-azure-50 p-5 border-0 md:border-l-2 border-l-azure-100 dark:border-0">
                            <div className="min-w-max table-auto text-left w-full">
                                <div>
                                    {" "}
                                    <span className="text-md text-center text-azure-600 font-normal dark:text-azure-300">
                                        RODADOS
                                    </span>
                                    {<TableRodado />}
                                </div>

                                <div>
                                    {" "}
                                    <span className="text-md text-center text-azure-600 font-normal dark:text-azure-300">
                                        INMUEBLES
                                    </span>
                                    {<TableInmueble />}
                                </div>
                                <div>
                                    {" "}
                                    <span className="text-md text-center text-azure-600 font-normal dark:text-azure-300">
                                        COMERCIOS
                                    </span>
                                    {<TableComercio />}
                                </div>
                                <div>
                                    {" "}
                                    <span className="text-md text-center text-azure-600 font-normal dark:text-azure-300">
                                        CITAS
                                    </span>
                                    {<TableCitas />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
};

export default Personal;

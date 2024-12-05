import { useEffect, useState } from "react";
import { useMenu } from "../../Context/MenuContext";

import Content from "../components/Content";
import Loading from "../components/Loading";
import CheckItem from "../components/CheckItem";
import Systems from "../components/icons/Systems";
import Errormsg from "../components/Errormsg";

import axios from "axios";
import { toast } from "react-toastify";
import Imponible from "../components/Imponible";
import Auto from "../components/icons/Auto";
import { Link } from "react-router-dom";
import Casa from "../components/icons/Casa";
import Store from "../components/icons/Store";
import Td from "../components/table/Td";
import Tr from "../components/table/Tr";
import Table from "../components/table/Table";
import Th from "../components/table/Th";

const Personal = () => {
    const { sistemas, persona, setError, error, loading } = useMenu();
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

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    if (sistemas && sistemas.citas) {
        totalPage = Math.ceil(sistemas.citas.length / itemsPerPage);
        paginatedPages = sistemas.citas.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }

    const nextPage = () => {
        if (currentPage < totalPage) {
            setcurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1);
        }
    };

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
                                        <div className="my-8 border-2 border-b-azure-100 dark:border-azure-700"></div>
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
                            <div className="min-w-max table-auto text-left w-full md:w-3/12">
                                <div>
                                    {sistemas &&
                                        sistemas.rafam_imponibles &&
                                        sistemas.rafam_imponibles.rodados &&
                                        (sistemas.rafam_imponibles.rodados
                                            .length > 0 ? (
                                            <>
                                                <span className="text-md text-center text-azure-600 font-normal dark:text-azure-300">
                                                    RODADOS
                                                </span>
                                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                                    {sistemas.rafam_imponibles.rodados.map(
                                                        (
                                                            { NRO_RODADO },
                                                            index
                                                        ) => (
                                                            <Link
                                                                key={index}
                                                                to={`/rafam/rodado/${NRO_RODADO}`}
                                                                className="bg-white shadow-sm hover:-translate-y-1 transition-all ease-in dark:bg-azure-600 rounded-xl mt-2 border-2 border-azure-100 dark:border-azure-700 p-2 hover:border-azure-300">
                                                                <div className="text-azure-600">
                                                                    <div className="flex flex-col align-middle items-center justify-center">
                                                                        <span className="text-azure-300 text-md font-medium">
                                                                            N°
                                                                            {
                                                                                NRO_RODADO
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                                NO HAY RODADOS DISPONIBLES
                                            </div>
                                        ))}
                                    {error && <Errormsg />}
                                </div>

                                <div className="mt-10">
                                    {sistemas &&
                                        sistemas.rafam_imponibles &&
                                        sistemas.rafam_imponibles.inmuebles &&
                                        (sistemas.rafam_imponibles.inmuebles
                                            .length > 0 ? (
                                            <>
                                                <span className="text-md text-center text-azure-600 font-normal dark:text-azure-300">
                                                    INMUEBLES
                                                </span>
                                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                                    {sistemas.rafam_imponibles.inmuebles.map(
                                                        (
                                                            { NRO_INMUEBLE },
                                                            index
                                                        ) => (
                                                            <Link
                                                                key={index}
                                                                to={`/rafam/inmueble/${NRO_INMUEBLE}`}
                                                                className="bg-white shadow-sm hover:-translate-y-1 transition-all ease-in dark:bg-azure-600 rounded-xl mt-2 border-2 border-azure-100 dark:border-azure-700 p-2 hover:border-azure-300">
                                                                <div className="text-azure-600">
                                                                    <div className="flex flex-col align-middle items-center justify-center">
                                                                        <span className="text-azure-300 text-md font-medium">
                                                                            N°
                                                                            {
                                                                                NRO_INMUEBLE
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                                NO HAY RODADOS DISPONIBLES
                                            </div>
                                        ))}
                                    {error && <Errormsg />}
                                </div>

                                <div className="mt-10">
                                    {sistemas &&
                                        sistemas.rafam_imponibles &&
                                        sistemas.rafam_imponibles.comercios &&
                                        (sistemas.rafam_imponibles.comercios
                                            .length > 0 ? (
                                            <>
                                                <span className="text-md text-center text-azure-600 font-normal dark:text-azure-300">
                                                    COMERCIOS
                                                </span>
                                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                                    {sistemas.rafam_imponibles.comercios.map(
                                                        (
                                                            { NRO_COMERCIO },
                                                            index
                                                        ) => (
                                                            <Link
                                                                key={index}
                                                                to={`/rafam/comercio/${NRO_COMERCIO}`}
                                                                className="bg-white shadow-sm hover:-translate-y-1 transition-all ease-in dark:bg-azure-600 rounded-xl mt-2 border-2 border-azure-100 dark:border-azure-700 p-2 hover:border-azure-300">
                                                                <div className="text-azure-600">
                                                                    <div className="flex flex-col align-middle items-center justify-center">
                                                                        <span className="text-azure-300 text-md font-medium">
                                                                            N°
                                                                            {
                                                                                NRO_COMERCIO
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                                NO HAY RODADOS DISPONIBLES
                                            </div>
                                        ))}
                                    {error && <Errormsg />}
                                </div>
                            </div>

                            {/* <div className="p-5">
                                {loading ? (
                                    <Loading title="citas" />
                                ) : sistemas && sistemas.citas ? (
                                    <Table
                                        currentPage={currentPage}
                                        prevPage={prevPage}
                                        nextPage={nextPage}
                                        totalPage={totalPage}>
                                        <thead>
                                            <tr>
                                                {[
                                                    "Email",
                                                    "Organización",
                                                    "Teléfono",
                                                    "Canal",
                                                    "Fecha",
                                                    "Estado",
                                                ].map((head) => (
                                                    <Th
                                                        key={head}
                                                        text={head}
                                                    />
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sistemas.citas.length > 0 ? (
                                                paginatedPages.map(
                                                    (
                                                        {
                                                            mail,
                                                            organizacion,
                                                            telefono,
                                                            canal,
                                                            fecha_turno,
                                                            estado_turno,
                                                        },
                                                        index
                                                    ) => (
                                                        <Tr key={index}>
                                                            <Td
                                                                content={mail}
                                                            />
                                                            <Td
                                                                content={
                                                                    organizacion
                                                                }
                                                            />
                                                            <Td
                                                                content={
                                                                    telefono
                                                                }
                                                            />
                                                            <Td
                                                                content={canal}
                                                            />
                                                            <Td
                                                                content={
                                                                    fecha_turno
                                                                }
                                                            />
                                                            <Td>
                                                                <span
                                                                    className={`font-normal text-sm ${
                                                                        estado_turno ===
                                                                        "Cancelada"
                                                                            ? "text-red-500"
                                                                            : "text-green-600"
                                                                    }`}>
                                                                    {
                                                                        estado_turno
                                                                    }
                                                                </span>
                                                            </Td>
                                                        </Tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="6"
                                                        className="p-4 text-center">
                                                        No hay citas
                                                        disponibles.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                ) : (
                                    !error && (
                                        <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                            NO HAY CITAS DISPONIBLES
                                        </div>
                                    )
                                )}
                                {error && <Errormsg />}
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
};

export default Personal;

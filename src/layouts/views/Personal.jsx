import { useEffect, useState } from "react";
import { useMenu } from "@ctx/MenuContext";

import Content from "@cpt/Content";
import CheckItem from "@cpt/CheckItem";
import Systems from "@icons/Systems";
import Errormsg from "@cpt/Errormsg";

import { toast } from "react-toastify";

import { getAdicionales, getSystems } from "../../services/personaService";

import { useDispatch, useSelector } from "react-redux";
import { fetchAdicionales, fetchRelaciones } from "@slices/personalSlice";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { setAlert } from "../../redux/slices/notificationSlice";

const Personal = () => {
    //Redux
    const dispatch = useDispatch();
    const {
        personales,
        adicionales,
        relaciones,
        loadingPersonal,
        loadingAdicional,
        loadingRelaciones,
        errorAdicional,
        errorRelaciones,
        errorPersonal,
    } = useSelector((state) => state.personal);

    const [checksActive, setChecksActive] = useState(false);

    const active = () => {
        setChecksActive(!checksActive);
    };
    useEffect(() => {
        if (personales && personales.documento) {
            dispatch(fetchAdicionales(personales.documento));
            dispatch(fetchRelaciones(personales.documento));
        }
        if (errorPersonal)
            dispatch(
                setAlert("error", "Ups! Error al obtener información personal")
            );
        if (errorAdicional || errorRelaciones)
            dispatch(
                setAlert("error", "Ups! Error al obtener información adicional")
            );
    }, [personales, errorPersonal, errorAdicional, errorRelaciones, dispatch]);

    return (
        <Content>
            <div className="text-left w-full">
                <div className="p-3 px-5  flex justify-between text-left border-b-2 border-azure-100 dark:border-azure-600 bg-white dark:bg-azure-700">
                    <div className="flex flex-col text-left">
                        <span className="text-md text-azure-400 font-light">
                            Persona
                        </span>
                        <span className="text-2xl text-azure-700 dark:text-azure-100 font-medium">
                            INFORMACIÓN
                        </span>
                    </div>
                    <div className="flex flex-col">
                        {loadingRelaciones ? (
                            <button className="text-lg gap-3 flex justify-center items-center transition-colors rounded-xl text-azure-700  hover:text-green-300 bg-transparent hover:dark:text-light-green-500 dark:text-azure-50 border-none focus:outline-none">
                                <Systems width="40" height="40" />
                                ...
                            </button>
                        ) : (
                            <>
                                {relaciones ? (
                                    <>
                                        <button
                                            onClick={active}
                                            className="text-lg gap-3 flex justify-center items-center transition-colors rounded-xl text-azure-700  hover:text-green-300 bg-transparent hover:dark:text-light-green-500 dark:text-azure-50 border-none focus:outline-none">
                                            <Systems width="40" height="40" />
                                            SISTEMAS
                                        </button>
                                        <div
                                            className={`bg-white w-[230px] px-4 dark:bg-azure-700 right-0 dark:border-azure-500 border-2 rounded-xl border-azure-100 absolute mt-16 ${
                                                !checksActive
                                                    ? "hidden"
                                                    : "block"
                                            }`}>
                                            <div className="w-full min-w-max table-auto text-left">
                                                {relaciones ? (
                                                    <>
                                                        <CheckItem
                                                            title="Autogestion"
                                                            check={
                                                                relaciones.autogestion
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <CheckItem
                                                            title="Rafam"
                                                            check={
                                                                relaciones.rafam
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <CheckItem
                                                            title="Salud"
                                                            check={
                                                                relaciones.salud
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <CheckItem
                                                            title="Reclamos"
                                                            check={
                                                                relaciones.reclamos
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <CheckItem
                                                            title="Citas"
                                                            check={
                                                                relaciones.citas
                                                                    ? true
                                                                    : false
                                                            }
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
                            </>
                        )}
                    </div>
                </div>
                <div className="p-5 md:p-10">
                    {loadingPersonal ? (
                        <Loading title="Información personal" />
                    ) : (
                        <>
                            <div className="grid grid-cols-8 gap-5 border-2 dark:border-azure-600 rounded-lg p-3">
                                <div className="col-span-12 py-3 flex flex-col">
                                    {personales &&
                                    Object.keys(personales).length > 0 ? (
                                        <>
                                            <div className="flex flex-col md:flex-row">
                                                <div className="w-12/12 md:w-4/12">
                                                    <div className=" text-azure-600 mb-10">
                                                        <span className="text-md text-center text-azure-600 font-normal dark:text-azure-300">
                                                            DATOS PERSONALES
                                                        </span>
                                                        <div className="flex flex-col mt-3">
                                                            <span className="text-sm text-azure-300 dark:text-azure-400 font-light">
                                                                NOMBRE Y
                                                                APELLIDO
                                                            </span>
                                                            <span className="text-sm dark:text-azure-100 font-medium">
                                                                {
                                                                    personales.nombre
                                                                }{" "}
                                                                {
                                                                    personales.apellido
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col mt-3">
                                                            <span className="text-sm text-azure-300 dark:text-azure-400 font-light">
                                                                DOCUMENTO
                                                            </span>
                                                            <span className="text-sm dark:text-azure-100 font-medium">
                                                                {
                                                                    personales.documento
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col mt-3">
                                                            <span className="text-sm text-azure-300 dark:text-azure-400 font-light">
                                                                DIRECCIÓN
                                                            </span>
                                                            <span className="text-sm dark:text-azure-100 font-medium">
                                                                {
                                                                    personales.calle
                                                                }
                                                                {
                                                                    personales.altura
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-12/12 md:w-8/12">
                                                    {adicionales && (
                                                        <div className="">
                                                            <span className="text-md text-center text-azure-600 font-normal dark:text-azure-300">
                                                                DATOS
                                                                ADICIONALES
                                                            </span>
                                                            <div className="text-md mt-3 text-orange-800 dark:text-orange-50 font-medium  mb-4 bg-orange-100 dark:bg-orange-800 p-5 rounded-xl">
                                                                La información
                                                                que se muestra a
                                                                continuación
                                                                provienen de
                                                                varios sistemas.
                                                                <br></br> Es por
                                                                esto, que
                                                                algunos datos
                                                                pueden estar
                                                                repetidos o
                                                                desorganizados.
                                                            </div>
                                                            <div className="text-azure-600 mb-10">
                                                                {Object.entries(
                                                                    adicionales
                                                                ).map(
                                                                    ([
                                                                        key,
                                                                        value,
                                                                    ]) => (
                                                                        <div
                                                                            key={
                                                                                key
                                                                            }
                                                                            className="mb-5">
                                                                            <span className="text-azure-400 dark:text-azure-400 font-light text-md">
                                                                                {
                                                                                    key
                                                                                }

                                                                                :
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
                                                                                            {
                                                                                                item
                                                                                            }
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
                                            <div className="col-span-12 bg-white dark:bg-azure-800 dark:rounded-xl p-5 flex flex-col">
                                                <span className="text-azure-600 mb-5">
                                                    IMPONIBLES
                                                </span>
                                                <span className="text-sm text-azure-400">
                                                    Buscá en esta sección los
                                                    Rodados, Inmuebles o
                                                    Comercios. Si necesitás más
                                                    detalles, podés acceder a
                                                    las secciones específicas de{" "}
                                                    <Link
                                                        className="font-normal text-sm text-blue-700 hover:text-azure-600"
                                                        to={"/rafam/rodados"}>
                                                        rodados
                                                    </Link>
                                                    ,{" "}
                                                    <Link
                                                        className="font-normal text-sm text-blue-700 hover:text-azure-600"
                                                        to={"/rafam/inmuebles"}>
                                                        inmuebles
                                                    </Link>{" "}
                                                    o{" "}
                                                    <Link
                                                        className="font-normal text-sm text-blue-700 hover:text-azure-600"
                                                        to={"/rafam/comercios"}>
                                                        comercios
                                                    </Link>
                                                    .
                                                </span>
                                                <div className="table-auto text-left w-full">
                                                    {/* <div className="my-10">
                                                {<TableRodado />}
                                            </div>

                                            <div className="my-10">
                                                {<TableInmueble />}
                                            </div>

                                            <div className="my-10">
                                                {<TableComercio />}
                                            </div> */}
                                                    {/* <div>
                                                <span className="text-azure-600 mb-5">
                                                    CITAS
                                                </span>
                                                {<TableCitas />}
                                            </div> */}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                                NO HAY INFORMACION DISPONIBLE
                                            </div>
                                        </>
                                    )}
                                    {errorAdicional && <Errormsg />}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Content>
    );
};

export default Personal;

import { useEffect, useState } from "react";
import Content from "@cpt/Content";
import Loading from "@cpt/Loading";
import ContentHeader from "@cpt/ContentHeader";

import Dni from "@icons/Dni";
import Auto from "@icons/Auto";
import Moto from "@icons/Moto";
import Casa from "@icons/Casa";
import Email from "@icons/Email";
import Phone from "@icons/Phone";
import Store from "@icons/Store";
import Location from "@icons/Location";
import Rightarrow from "@icons/Rightarrow";

import Th from "@cpt/table/Th";
import Tr from "@cpt/table/Tr";
import Td from "@cpt/table/Td";
import Table from "@cpt/table/Table";
import { Link } from "react-router-dom";

import { setAlert } from "@slices/notificationSlice";
import { formatNumber } from "../../services/helpers";
import { useDispatch, useSelector } from "react-redux";
import { fetchMain, fetchRubros, fetchDeuda } from "@slices/dashboardSlice";
import Pending from "../components/Pending";
import ItemsMain from "../components/skeletons/dashboard/itemsMain";
import ItemsImponibles from "../components/skeletons/dashboard/ItemsImponibles";

const Dashboard = () => {
    //Redux
    const dispatch = useDispatch();
    const {
        main,
        rubros,
        deuda,
        loadingMain,
        loadingRubros,
        loadingDeuda,
        errorMain,
        errorRubros,
        errorDeuda,
    } = useSelector((state) => state.dashboard);

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    const TABLE_RUBROS = ["Rubro", "Descripción", "Cantidad", "Deuda", ""];

    if (rubros) {
        totalPage = Math.ceil(rubros.length / itemsPerPage);
        paginatedPages = rubros.slice(
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

    useEffect(() => {
        dispatch(fetchMain());
        dispatch(fetchRubros());
        dispatch(fetchDeuda());
    }, [dispatch]);

    useEffect(() => {
        if (errorMain) {
            dispatch(setAlert("error", "Ups! Error al obtener información"));
        }
        if (errorRubros) {
            dispatch(setAlert("error", "Ups! Error al obtener rubros"));
        }
        if (errorDeuda) {
            dispatch(
                setAlert("error", "Ups! Error al obtener información de deuda")
            );
        }
    }, [errorMain, errorRubros, errorDeuda, dispatch, rubros]);

    const recursos = {
        20: "COMERCIOS",
        10: "INMUEBLES",
        60: "AUTO",
        30: "MOTO",
    };

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Home" title="DASHBOARD" />

                <div className="p-5 md:p-10">
                    {/* <Pending
                        loading={loadingMain}
                        title={"Información"}
                        > */}
                    <Pending
                        loading={loadingMain}
                        title={"Información"}
                        skeleton={<ItemsMain />}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                            <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                <Location width={"40"} height={"40"} />
                                <div className="flex flex-col">
                                    <div className="text-xl text-azure-300 font-light">
                                        Direcciones
                                    </div>
                                    <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                        {main?.direcciones?.toLocaleString(
                                            "de-DE"
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                <Dni width={"40"} height={"40"} />
                                <div className="flex flex-col">
                                    <div className="text-xl text-azure-300 font-light">
                                        Documentos
                                    </div>
                                    <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                        {main?.documentos?.toLocaleString(
                                            "de-DE"
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                <Email width={"40"} height={"40"} />
                                <div className="flex flex-col">
                                    <div className="text-xl text-azure-300 font-light">
                                        Emails
                                    </div>
                                    <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                        {main?.mails?.toLocaleString("de-DE")}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                <Phone width={"40"} height={"40"} />
                                <div className="flex flex-col">
                                    <div className="text-xl text-azure-300 font-light">
                                        Telefonos
                                    </div>
                                    <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                        {main?.telefonos?.toLocaleString(
                                            "de-DE"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Pending>
                    {/* {loadingMain ? (
                        <Loading title="Información" />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                <Location width={"40"} height={"40"} />
                                <div className="flex flex-col">
                                    <div className="text-xl text-azure-300 font-light">
                                        Direcciones
                                    </div>
                                    <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                        {main?.direcciones?.toLocaleString(
                                            "de-DE"
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                <Dni width={"40"} height={"40"} />
                                <div className="flex flex-col">
                                    <div className="text-xl text-azure-300 font-light">
                                        Documentos
                                    </div>
                                    <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                        {main?.documentos?.toLocaleString(
                                            "de-DE"
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                <Email width={"40"} height={"40"} />
                                <div className="flex flex-col">
                                    <div className="text-xl text-azure-300 font-light">
                                        Emails
                                    </div>
                                    <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                        {main?.mails?.toLocaleString("de-DE")}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                <Phone width={"40"} height={"40"} />
                                <div className="flex flex-col">
                                    <div className="text-xl text-azure-300 font-light">
                                        Telefonos
                                    </div>
                                    <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                        {main?.telefonos?.toLocaleString(
                                            "de-DE"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )} */}

                    <Pending
                        loading={loadingDeuda}
                        title={"Imponibles"}
                        // skeleton={<ItemsImponibles />}>
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-5 mt-5">
                            {deuda &&
                                deuda.map(({ recurso, deuda }) => (
                                    <div key={recurso}>
                                        <div className="flex gap-5 bg-white border border-azure-200 dark:border-azure-600 dark:bg-azure-800 rounded-xl  mt-5 p-5">
                                            {recurso === 20 ? (
                                                <Store width="40" height="40" />
                                            ) : recurso === 10 ? (
                                                <Casa width="40" height="40" />
                                            ) : recurso === 60 ? (
                                                <Auto width="40" height="40" />
                                            ) : recurso === 30 ? (
                                                <Moto width="40" height="40" />
                                            ) : (
                                                ""
                                            )}

                                            <div className="flex flex-col w-full">
                                                <div className="text-xl text-azure-600 dark:text-azure-200 font-medium">
                                                    {recursos[recurso]}
                                                </div>
                                                <div className="flex flex-col mt-5">
                                                    <div className="text-md text-azure-300 font-light">
                                                        Deuda
                                                    </div>
                                                    <div className="text-4xl font-medium text-red-400 flex flex-flow">
                                                        <span className="me-3">
                                                            $
                                                        </span>
                                                        {formatNumber(deuda)}
                                                        {/* {formatNumber(
                                                                deuda.toLocaleString(
                                                                    "de-DE"
                                                                )
                                                            )} */}
                                                    </div>
                                                    <div className="text-lg font-medium text-azure-300 flex flex-flow">
                                                        <span className="me-3 d-block">
                                                            ${" "}
                                                            {deuda.toLocaleString(
                                                                "de-DE"
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </Pending>

                    {/* {loadingDeuda ? (
                        <Loading title="Imponibles" />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-5">
                            {deuda &&
                                deuda.map(({ recurso, deuda }) => (
                                    <div key={recurso}>
                                        <div className="flex gap-5 bg-white border border-azure-200 dark:border-azure-600 dark:bg-azure-800 rounded-xl  mt-5 p-5">
                                            {recurso === 20 ? (
                                                <Store width="40" height="40" />
                                            ) : recurso === 10 ? (
                                                <Casa width="40" height="40" />
                                            ) : recurso === 60 ? (
                                                <Auto width="40" height="40" />
                                            ) : recurso === 30 ? (
                                                <Moto width="40" height="40" />
                                            ) : (
                                                ""
                                            )}

                                            <div className="flex flex-col w-full">
                                                <div className="text-xl text-azure-600 dark:text-azure-200 font-medium">
                                                    {recursos[recurso]}
                                                </div>
                                                <div className="flex flex-col mt-5">
                                                    <div className="text-md text-azure-300 font-light">
                                                        Deuda
                                                    </div>
                                                    <div className="text-4xl font-medium text-red-400 flex flex-flow">
                                                        <span className="me-3">
                                                            $
                                                        </span>
                                                        {formatNumber(deuda)}
                                                    </div>
                                                    <div className="text-lg font-medium text-azure-300 flex flex-flow">
                                                        <span className="me-3 d-block">
                                                            ${" "}
                                                            {deuda.toLocaleString(
                                                                "de-DE"
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )} */}

                    {loadingRubros ? (
                        <Loading title="Rubros" />
                    ) : paginatedPages.length > 0 ? (
                        <Table
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                            totalPage={totalPage}>
                            <thead>
                                <tr>
                                    {TABLE_RUBROS.map((head) => (
                                        <Th key={head} text={head} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rubros.length > 0 ? (
                                    paginatedPages.map(
                                        (
                                            {
                                                rubro,
                                                descripcion,
                                                cantidad,
                                                deuda,
                                            },
                                            index
                                        ) => (
                                            <Tr key={index}>
                                                <Td content={rubro} />
                                                <Td content={descripcion} />
                                                <Td content={cantidad} />
                                                <Td
                                                    content={
                                                        "$ " +
                                                        deuda.toLocaleString(
                                                            "de-DE"
                                                        )
                                                    }
                                                />
                                                <Td>
                                                    <Link
                                                        className="bg-white hover:bg-azure-100 dark:bg-azure-500 dark:hover:bg-azure-600 transition-colors w-fit p-1 align-items-center justify-center flex rounded-2xl "
                                                        to={`/rafam/comercios/${rubro}`}>
                                                        <Rightarrow
                                                            width={"25"}
                                                            height={"25"}
                                                        />
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-4 text-center">
                                            No hay información disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </Content>
    );
};

export default Dashboard;

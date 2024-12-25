import { useEffect, useState } from "react";
import Content from "@cpt/Content";
import { useMenu } from "@ctx/MenuContext";

import Loading from "@cpt/Loading";
import ContentHeader from "@cpt/ContentHeader";

import Chart from "react-apexcharts";
import axios from "axios";
import { toast } from "react-toastify";
import Location from "@icons/Location";
import Email from "@icons/Email";
import Dni from "@icons/Dni";
import Phone from "@icons/Phone";
import Auto from "@icons/Auto";
import Store from "@icons/Store";
import Casa from "@icons/Casa";
import { Dialog } from "@material-tailwind/react";
import MapDeudas from "@cpt/MapDeudas";
import ReactApexChart from "react-apexcharts";
import { setOptions } from "leaflet";
import { ChartDeuda } from "@cpt/ChartDeuda";
import Errormsg from "@cpt/Errormsg";
import Table from "@cpt/table/Table";
import Th from "@cpt/table/Th";
import Tr from "@cpt/table/Tr";
import Td from "@cpt/table/Td";
import { Link } from "react-router-dom";
import Ojos from "@icons/Ojos";
import Rightarrow from "@icons/Rightarrow";

const Dashboard = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dashboard, setDashboard } = useMenu();
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState("");
    const [comerciosRubros, setComerciosRubros] = useState([]);

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    const TABLE_RUBROS = ["Rubro", "Descripción", "Cantidad", "Deuda", ""];

    const onLoad = async () => {
        setLoading(true);
        setError(null);
        let info = null;
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/dashboard`
            );

            info = response.data.data[0];
        } catch (err) {
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        } finally {
            setLoading(false);
            setDashboard(info);
        }
    };

    useEffect(() => {
        if (!dashboard) {
            onLoad();
        }
    }, [dashboard]);

    const getRubros = async () => {
        let rubros = [];
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/rafam/comercios/rubros`
            );
            rubros = response.data.data;
            console.log(rubros);
            setComerciosRubros(rubros);
        } catch (err) {
            console.log(err);
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        }
    };

    if (comerciosRubros) {
        totalPage = Math.ceil(comerciosRubros.length / itemsPerPage);
        paginatedPages = comerciosRubros.slice(
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
        getRubros();
    }, []);

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Home" title="DASHBOARD" />

                <div className="p-5 md:p-10">
                    {loading ? (
                        <Loading title="Tablero" />
                    ) : dashboard ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                    <Location width={"40"} height={"40"} />
                                    <div className="flex flex-col">
                                        <div className="text-xl text-azure-300 font-light">
                                            Direcciones
                                        </div>
                                        <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                            {dashboard.direcciones.toLocaleString(
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
                                            {dashboard.documentos.toLocaleString(
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
                                            {dashboard.mails.toLocaleString(
                                                "de-DE"
                                            )}
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
                                            {dashboard.telefonos.toLocaleString(
                                                "de-DE"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                                <div className="flex gap-5 bg-white border border-azure-200 dark:border-azure-600 dark:bg-azure-800 rounded-xl  mt-5 p-5">
                                    <Auto width={"40"} height={"40"} />
                                    <div className="flex flex-col w-full">
                                        <div className="text-xl text-azure-600 dark:text-azure-200 font-medium">
                                            RODADOS
                                        </div>
                                        <div className="flex flex-col mt-5">
                                            <div className="text-md text-azure-300 font-light">
                                                Deuda
                                            </div>
                                            <div className="text-4xl font-medium text-red-400 ">
                                                ${" "}
                                                {(837230).toLocaleString(
                                                    "de-DE"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 bg-white border border-azure-200 dark:border-azure-600 dark:bg-azure-800 rounded-xl  mt-5 p-5">
                                    <Casa width={"40"} height={"40"} />
                                    <div className="flex flex-col w-full">
                                        <div className="text-xl text-azure-600 dark:text-azure-200 font-medium">
                                            INMUEBLES
                                        </div>
                                        <div className="flex flex-col mt-5">
                                            <div className="text-md text-azure-300 font-light">
                                                Deuda
                                            </div>
                                            <div className="text-4xl font-medium text-red-400 ">
                                                ${" "}
                                                {(2743892).toLocaleString(
                                                    "de-DE"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 bg-white border border-azure-200 dark:border-azure-600 dark:bg-azure-800 rounded-xl  mt-5 p-5">
                                    <Store width={"40"} height={"40"} />
                                    <div className="flex flex-col w-full">
                                        <div className="text-xl text-azure-600 dark:text-azure-200 font-medium">
                                            COMERCIOS
                                        </div>
                                        <div className="flex flex-col mt-5">
                                            <div className="text-md text-azure-300 font-light">
                                                Deuda
                                            </div>
                                            <div className="text-4xl font-medium text-red-400 ">
                                                ${" "}
                                                {(3612936182).toLocaleString(
                                                    "de-DE"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                {loading ? (
                                    <Loading title="citas" />
                                ) : comerciosRubros ? (
                                    <Table
                                        currentPage={currentPage}
                                        prevPage={prevPage}
                                        nextPage={nextPage}
                                        totalPage={totalPage}>
                                        <thead>
                                            <tr>
                                                {TABLE_RUBROS.map((head) => (
                                                    <Th
                                                        key={head}
                                                        text={head}
                                                    />
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comerciosRubros.length > 0 ? (
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
                                                            <Td
                                                                content={rubro}
                                                            />
                                                            <Td
                                                                content={
                                                                    descripcion
                                                                }
                                                            />
                                                            <Td
                                                                content={
                                                                    cantidad
                                                                }
                                                            />
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
                                                                        width={
                                                                            "25"
                                                                        }
                                                                        height={
                                                                            "25"
                                                                        }
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
                                                        No hay información
                                                        disponibles.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                ) : (
                                    !error && (
                                        <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                            NO HAY INFORMACIÓN DISPONIBLES
                                        </div>
                                    )
                                )}
                                {error && <Errormsg />}
                            </div>
                            {/* <div className="mt-5 pt-4 flex flex-col">
                                <span className="text-azure-600 text-md py-3">
                                    MAPA DE COMERCIOS CON DEUDAS
                                </span>
                                <MapDeudas />
                            </div> */}
                            {/* <>
                                {chartOnload && (
                                    <div className="mt-10">
                                        <div id="chart">
                                            <ReactApexChart
                                                options={options}
                                                series={series}
                                                type="line"
                                                height={350}
                                            />
                                        </div>
                                        <div id="html-dist"></div>
                                    </div>
                                )}
                            </> */}
                        </>
                    ) : (
                        <></>
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

export default Dashboard;

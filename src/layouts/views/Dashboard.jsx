import { useEffect, useState } from "react";
import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";

import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";

import Chart from "react-apexcharts";
import axios from "axios";
import { toast } from "react-toastify";
import Location from "../components/icons/Location";
import Email from "../components/icons/Email";
import Dni from "../components/icons/Dni";
import Phone from "../components/icons/Phone";
import Auto from "../components/icons/Auto";
import Store from "../components/icons/Store";
import Casa from "../components/icons/Casa";
import { Dialog } from "@material-tailwind/react";
import MapDeudas from "../components/MapDeudas";
import ReactApexChart from "react-apexcharts";
import { setOptions } from "leaflet";
import { ChartDeuda } from "../components/ChartDeuda";
import Errormsg from "../components/Errormsg";
import Table from "../components/table/Table";
import Th from "../components/table/Th";
import Tr from "../components/table/Tr";
import Td from "../components/table/Td";
import { Link } from "react-router-dom";

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

    const TABLE_RUBROS = [
        "Rubro",
        "Descripción",
        "Cantidad",
        "Deuda",
        "Opciones",
    ];

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
                                                                content={deuda}
                                                            />
                                                            <Td>
                                                                <Link
                                                                    to={`/rafam/comercios/${rubro}`}
                                                                    className="px-5 py-2 rounded-md border-0 focus:outline-none bg-azure-300 dark:bg-azure-600 dark:hover:bg-azure-500 hover:bg-azure-400 text-white hover:text-white transition-colors">
                                                                    Ver
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

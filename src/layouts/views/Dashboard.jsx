import { useEffect, useState } from "react";
import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";

import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";

// import Chart from "react-apexcharts";
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

const Dashboard = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dashboard, setDashboard } = useMenu();
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState("");

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

    const openDetail = (imponible) => {
        setOpen(!open);
        setModal(imponible);
    };
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        if (!dashboard) {
            onLoad();
        }
    }, [dashboard]);

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
                                                Deudas
                                            </div>
                                            <div className="text-4xl font-medium text-red-400 ">
                                                {(837230).toLocaleString(
                                                    "de-DE"
                                                )}
                                            </div>
                                            <div className="flex justify-end mt-3">
                                                <button
                                                    className="py-0 border-0 bg-azure-50 hover:bg-blue-100 focus:outline-none"
                                                    onClick={() =>
                                                        openDetail("rodados")
                                                    }>
                                                    Detalle
                                                </button>
                                            </div>
                                            <Dialog
                                                open={
                                                    open && modal == "rodados"
                                                }
                                                handler={handleOpen}>
                                                <div className="flex flex-col p-5">
                                                    <div className="text-sm text-azure-300 font-light">
                                                        Autos
                                                    </div>
                                                    <div className="text-md font-medium text-red-400 ">
                                                        {(532134).toLocaleString(
                                                            "de-DE"
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-azure-300 font-light mt-2">
                                                        Motos
                                                    </div>
                                                    <div className="text-md font-medium text-red-400 ">
                                                        {(305096).toLocaleString(
                                                            "de-DE"
                                                        )}
                                                    </div>
                                                </div>
                                            </Dialog>
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
                                                Deudas
                                            </div>
                                            <div className="text-4xl font-medium text-red-400 ">
                                                {(2743892).toLocaleString(
                                                    "de-DE"
                                                )}
                                            </div>
                                            <div className="flex justify-end mt-3">
                                                <button
                                                    className="py-0 border-0 bg-azure-50 hover:bg-blue-100 focus:outline-none"
                                                    onClick={() =>
                                                        openDetail("inmuebles")
                                                    }>
                                                    Detalle
                                                </button>
                                            </div>
                                            <Dialog
                                                open={
                                                    open && modal == "inmuebles"
                                                }
                                                handler={handleOpen}>
                                                <div className="flex flex-col p-5">
                                                    <div className="text-sm text-azure-300 font-light">
                                                        Recurso X
                                                    </div>
                                                    <div className="text-md font-medium text-red-400 ">
                                                        {(345345).toLocaleString(
                                                            "de-DE"
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-azure-300 font-light mt-2">
                                                        Recurso X
                                                    </div>
                                                    <div className="text-md font-medium text-red-400 ">
                                                        {(7484645).toLocaleString(
                                                            "de-DE"
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-azure-300 font-light mt-2">
                                                        Recurso X
                                                    </div>
                                                    <div className="text-md font-medium text-red-400 ">
                                                        {(215661).toLocaleString(
                                                            "de-DE"
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-azure-300 font-light mt-2">
                                                        Recurso X
                                                    </div>
                                                    <div className="text-md font-medium text-red-400 ">
                                                        {(214123).toLocaleString(
                                                            "de-DE"
                                                        )}
                                                    </div>
                                                </div>
                                            </Dialog>
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
                                                Deudas
                                            </div>
                                            <div className="text-4xl font-medium text-red-400 ">
                                                {(3612936182).toLocaleString(
                                                    "de-DE"
                                                )}
                                            </div>
                                            <div className="flex justify-end mt-3">
                                                <button
                                                    className="py-0 border-0 bg-azure-50 hover:bg-blue-100 focus:outline-none"
                                                    onClick={() =>
                                                        openDetail("comercios")
                                                    }>
                                                    Detalle
                                                </button>
                                            </div>
                                            <Dialog
                                                open={
                                                    open && modal == "comercios"
                                                }
                                                handler={handleOpen}>
                                                <div className="flex flex-col p-5">
                                                    <div className="text-sm text-azure-300 font-light">
                                                        Autos
                                                    </div>
                                                    <div className="text-md font-medium text-red-400 ">
                                                        {(754645).toLocaleString(
                                                            "de-DE"
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-azure-300 font-light mt-2">
                                                        Motos
                                                    </div>
                                                    <div className="text-md font-medium text-red-400 ">
                                                        {(412512).toLocaleString(
                                                            "de-DE"
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-azure-300 font-light mt-2">
                                                        Motos
                                                    </div>
                                                    <div className="text-md font-medium text-red-400 ">
                                                        {(1234).toLocaleString(
                                                            "de-DE"
                                                        )}
                                                    </div>
                                                </div>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/* <Chart
                                    options={state.options}
                                    series={state.series}
                                    type="bar"
                                    width={500}
                                    height={320}
                                /> */}
                            </div>
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

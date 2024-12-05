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

const Dashboard = () => {
    // const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dashboard, setDashboard } = useMenu();

    const onLoad = async () => {
        setLoading(true);
        setError(null);
        let info = null;
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/dashboard`
            );

            info = response.data.data;
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

    // const state = {
    //     options: {
    //         chart: {
    //             id: "apexchart-example",
    //         },
    //         xaxis: {
    //             categories: [
    //                 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
    //             ],
    //         },
    //     },
    //     series: [
    //         {
    //             name: "series-1",
    //             data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    //         },
    //     ],
    // };

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Home" title="DASHBOARD" />

                <div className="p-5">
                    {loading ? (
                        <Loading title="Tablero" />
                    ) : dashboard ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                    <Location width={"60"} height={"60"} />
                                    <div className="flex flex-col">
                                        <div className="text-xl text-azure-300 font-light">
                                            Direcciones
                                        </div>
                                        <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                            {dashboard.direcciones}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                    <Dni width={"60"} height={"60"} />
                                    <div className="flex flex-col">
                                        <div className="text-xl text-azure-300 font-light">
                                            Documentos
                                        </div>
                                        <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                            {dashboard.documentos}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                    <Email width={"60"} height={"60"} />
                                    <div className="flex flex-col">
                                        <div className="text-xl text-azure-300 font-light">
                                            Emails
                                        </div>
                                        <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                            {dashboard.mails}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5 p-5">
                                    <Phone width={"60"} height={"60"} />
                                    <div className="flex flex-col">
                                        <div className="text-xl text-azure-300 font-light">
                                            Telefonos
                                        </div>
                                        <div className="text-4xl font-medium text-azure-600 dark:text-azure-200">
                                            {dashboard.telefonos}
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

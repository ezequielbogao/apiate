import { useState } from "react";
import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";

import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";

import Chart from "react-apexcharts";

const Dashboard = () => {
    const { sistemas, error, loading } = useMenu();
    const state = {
        options: {
            chart: {
                id: "apexchart-example",
            },
            xaxis: {
                categories: [
                    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                ],
            },
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
        ],
    };

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Home" title="DASHBOARD" />

                <div className="p-5">
                    {loading ? (
                        <Loading title="Tablero" />
                    ) : sistemas ? (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div className="bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5  p-5">
                                    <div className="text-xl text-azure-300 font-light">
                                        Personas
                                    </div>
                                    <div className="text-4xl font-bold text-azure-600">
                                        405.521
                                    </div>
                                    <div className="text-sm text-azure-400 font-light">
                                        Actualizado el 13/02/2024
                                    </div>
                                </div>
                                <div className="bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5  p-5">
                                    <div className="text-xl text-azure-300 font-light">
                                        Personas
                                    </div>
                                    <div className="text-4xl font-bold text-azure-600">
                                        405.521
                                    </div>
                                    <div className="text-sm text-azure-400 font-light">
                                        Actualizado el 13/02/2024
                                    </div>
                                </div>
                                <div className="bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5  p-5">
                                    <div className="text-xl text-azure-300 font-light">
                                        Personas
                                    </div>
                                    <div className="text-4xl font-bold text-azure-600">
                                        405.521
                                    </div>
                                    <div className="text-sm text-azure-400 font-light">
                                        Actualizado el 13/02/2024
                                    </div>
                                </div>
                                <div className="bg-azure-50  dark:bg-azure-700 rounded-xl  mt-5  p-5">
                                    <div className="text-xl text-azure-300 font-light">
                                        Personas
                                    </div>
                                    <div className="text-4xl font-bold text-azure-600">
                                        405.521
                                    </div>
                                    <div className="text-sm text-azure-400 font-light">
                                        Actualizado el 13/02/2024
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Chart
                                    options={state.options}
                                    series={state.series}
                                    type="bar"
                                    width={500}
                                    height={320}
                                />
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

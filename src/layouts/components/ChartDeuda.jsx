import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { toast } from "react-toastify";

export const ChartDeuda = () => {
    const [error, setError] = useState(null);
    const [chartOnload, setChartOnload] = useState(false);
    const [rubroDeuda, setRubroDeuda] = useState([]);
    const [rubroCantidad, setRubroCantidad] = useState([]);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: "line",
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        title: {
            text: "Deuda de comercios",
            align: "left",
        },
        grid: {
            row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
            ],
        },
    });

    function formatMonto(monto) {
        if (monto >= 1000000000) {
            return (monto / 1000000000).toFixed(1) + "B";
        } else if (monto >= 1000000) {
            return (monto / 1000000).toFixed(1) + "M";
        } else if (monto >= 1000) {
            return (monto / 1000).toFixed(1) + "K";
        } else {
            return monto.toString();
        }
    }

    const getRubros = async () => {
        let rubros = [];
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/rafam/comercios/rubros`
            );
            rubros = response.data.data;
            setRubroDeuda(rubros.map((e) => formatMonto(e.deuda)));
            setRubroCantidad(rubros.map((e) => e.cantidad));
            setSeries([
                {
                    name: "Cantidad",
                    data: rubroCantidad,
                },
                {
                    name: "Deudas",
                    data: rubroDeuda,
                },
            ]);
            setChartOnload(true);
        } catch (err) {
            console.log(err);
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        }
    };

    useEffect(() => {
        getRubros();
    }, []);
    return (
        <>
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
        </>
    );
};

import { useEffect, useState } from "react";
import Content from "@cpt/Content";
import { useMenu } from "@ctx/MenuContext";
import Loading from "@cpt/Loading";
import Store from "@icons/Store";
import ContentHeader from "@cpt/ContentHeader";
import Errormsg from "@cpt/Errormsg";
import Imponible from "@cpt/Imponible";
import { useDispatch, useSelector } from "react-redux";
import { fetchPresentaciones } from "@slices/declaracionesJuradasSlice";

import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, RadialLinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend  } from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  ArcElement,
  CategoryScale, // Para el eje X (categorías)
  LinearScale,   // Para el eje Y (valores numéricos)
  RadialLinearScale,
  BarElement,    // Para gráficos de barras
  PointElement,  // Para gráficos de puntos (scatter) y líneas
  LineElement,   // Para gráficos de líneas
  Title,         // Título del gráfico
  Tooltip,       // Información emergente al pasar sobre el gráfico
  Legend,         // Leyenda
);

const Presentaciones = () => {
    const dispatch = useDispatch();

    const { declaraciones, loading, error } = useSelector(
        (state) => state.declaraciones
    );

    const [chartDataOficioAnual , setChartDataOficioAnual] = useState({});
    const [chartOptionsOficioAnual , setChartOptionsOficioAnual] = useState({});

    const [chartDataOficioMensual , setChartDataOficioMensual] = useState({});
    const [chartOptionsOficioMensual , setChartOptionsOficioMensual] = useState({});

    const [chartDataPresOrigAnual , setChartDataPresOrigAnual] = useState({});
    const [chartOptionsPresOrigAnual , setChartOptionsPresOrigAnual] = useState({});

    const [chartDataOriginalMensual , setChartDataOriginalMensual] = useState({});
    const [chartOptionsOriginalMensual , setChartOptionsOriginalMensual] = useState({});

    const [chartDataRectifAnual , setChartDataRectifAnual] = useState({});
    const [chartOptionsRectifAnual , setChartOptionsRectifAnual] = useState({});

    const [chartDataRectifMensual , setChartDataRectifMensual] = useState({});
    const [chartOptionsRectifMensual , setChartOptionsRectifMensual] = useState({});

    const colors = [
        'rgb(250, 72, 111)',
        'rgb(42, 166, 249)',
        'rgba(255, 159, 64, 1)',
        'rgb(68, 242, 192)',
        'rgb(146, 92, 255)',
        'rgb(255, 198, 65)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 159, 64, 0.4)', 
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(255, 205, 86, 0.4)'
    ];

    const scalesStyle = {
        x: {
            ticks: {
                color: '#39e5fb', // Cambia el color de las etiquetas del eje X (por ejemplo, rojo)
                font: {
                    size: 12,  // Tamaño de la fuente
                    family: 'Arial', // Tipo de fuente
                    weight: 'normal' // Grosor de la fuente
                }
            }
        },
        y: {
            ticks: {
                color: '#a4b3d5', // Cambia el color de las etiquetas del eje Y (por ejemplo, azul)
                font: {
                    size: 12,  // Tamaño de la fuente
                    family: 'Arial', // Tipo de fuente
                    weight: 'normal' // Grosor de la fuente
                }
            }
        }
        
    };

    useEffect(() => {
        dispatch(fetchPresentaciones());
    }, [dispatch]);

    useEffect(() => {
        if (declaraciones && declaraciones.pres_oficio_anual) {
            const anios_anual = declaraciones.pres_oficio_anual.map(item => item.anio);
            const cantidadesComercios_anual = declaraciones.pres_oficio_anual.map(item => item.cantidad_comercios);

            setChartDataOficioAnual({
                labels: anios_anual, // Años en el eje X
                datasets: [
                    {
                        label: 'Cantidad de Comercios',
                        data: cantidadesComercios_anual, // Cantidades de comercios en el eje Y
                        borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
                        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color del área bajo la línea
                        fill: true, // Rellenar el área bajo la línea
                        tension: 0.4, // Curvatura de la línea
                    }
                ]
            });

            setChartOptionsOficioAnual({
                responsive: true, // Hacer el gráfico responsivo
                scales: scalesStyle,
                elements: {
                    line: {
                        borderColor: 'orange', // Cambia el color de la línea a naranja
                        borderWidth: 3
                    },
                    point: {
                        backgroundColor: 'yellow', // Cambia el color de los puntos de la línea a amarillo
                        radius: 5
                    }
                }
            });
        }

        if (declaraciones && declaraciones.pres_oficio_mensual) {
            const cantidadesComercios_mensual = declaraciones.pres_oficio_mensual.map(item => ({
                anio: item.anio,
                cuota: item.cuota,
                cantidad_comercios: item.cantidad_comercios
            }));

            // Agrupar los datos por año y cuota
            const dataByYear = cantidadesComercios_mensual.reduce((acc, { anio, cuota, cantidad_comercios }) => {
                // Si el año no existe, lo creamos
                if (!acc[anio]) {
                    acc[anio] = {};
                }
                // Si la cuota no existe dentro del año, la inicializamos
                if (!acc[anio][cuota]) {
                    acc[anio][cuota] = [];
                }
                // Agregar la cantidad de comercios a la cuota correspondiente para ese año
                acc[anio][cuota].push(cantidad_comercios);
                return acc;
            }, {});

            // Obtener todos los años y cuotas únicos
            const anios_mensual = Object.keys(dataByYear);
            const cuotas = Array.from(new Set(cantidadesComercios_mensual.map(item => item.cuota))); // Obtener todas las cuotas únicas

            const datasets = cuotas.map((cuota, index) => ({
                label: `Cuota ${cuota}`,
                data: anios_mensual.map(anio => {
                    const cantidadPorAnio = dataByYear[anio][cuota] ? dataByYear[anio][cuota].reduce((sum, cantidad) => sum + cantidad, 0) : 0;
                    return cantidadPorAnio;
                }),
                borderColor: colors[index % colors.length],
                backgroundColor: `${colors[index % colors.length].replace('1)', '0.2)')}`,
                fill: true,
                tension: 0.4
            }));

            // Establecer los datos y opciones del gráfico
            setChartDataOficioMensual({
                labels: anios_mensual, // Los años van en el eje X
                datasets: datasets,
                scales: scalesStyle
            });

            setChartOptionsOficioMensual({
                responsive: true,
                scales: scalesStyle
            });
        }

        if (declaraciones && declaraciones.pres_orig_anual) {
            const anios_orig_anual = declaraciones.pres_orig_anual.map(item => item.anio);
            const cantidadesComercios_orig_anual = declaraciones.pres_orig_anual.map(item => item.cantidad_comercios);
    
            // Crear datos y opciones para el gráfico de barras
            setChartDataPresOrigAnual({
                labels: anios_orig_anual,
                datasets: [
                    {
                        label: 'Cantidad de Comercios',
                        data: cantidadesComercios_orig_anual,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de las barras
                        borderColor: 'rgba(255, 99, 132, 1)', // Color de los bordes de las barras
                        borderWidth: 1,
                    }
                ]
            });
    
            setChartOptionsPresOrigAnual({
                responsive: true,
                scales: scalesStyle
            });
        }

        if (declaraciones && declaraciones.pres_original_mensual){
            // Mapear los datos mensuales
            const cantidadesComercios_mensual = declaraciones.pres_original_mensual.map(item => ({
                anio: item.anio,
                cuota: item.cuota,
                cantidad_comercios: item.cantidad_comercios
            }));

            // Agrupar los datos por año y cuota
            const dataByYear = cantidadesComercios_mensual.reduce((acc, { anio, cuota, cantidad_comercios }) => {
                // Si el año no existe, lo creamos
                if (!acc[anio]) {
                    acc[anio] = {};
                }
                // Si la cuota no existe dentro del año, la inicializamos
                if (!acc[anio][cuota]) {
                    acc[anio][cuota] = [];
                }
                // Agregar la cantidad de comercios a la cuota correspondiente para ese año
                acc[anio][cuota].push(cantidad_comercios);
                return acc;
            }, {});

            // Obtener todos los años y cuotas únicos
            const anios_mensual = Object.keys(dataByYear);
            const cuotas = Array.from(new Set(cantidadesComercios_mensual.map(item => item.cuota))); // Obtener todas las cuotas únicas

            const datasets = cuotas.map((cuota, index) => ({
                label: `Cuota ${cuota}`,
                data: anios_mensual.map(anio => {
                    const cantidadPorAnio = dataByYear[anio][cuota] ? dataByYear[anio][cuota].reduce((sum, cantidad) => sum + cantidad, 0) : 0;
                    return cantidadPorAnio;
                }),
                borderColor: colors[index % colors.length],
                backgroundColor: `${colors[index % colors.length].replace('1)', '0.2)')}`,
                fill: true,
                tension: 0.4
            }));

            // Establecer los datos y opciones del gráfico
            setChartDataOriginalMensual({
                labels: anios_mensual, // Los años van en el eje X
                datasets: datasets
            });

            
            setChartOptionsOriginalMensual({
                responsive: true,
                scales: scalesStyle
            });
        }

        if (declaraciones && declaraciones.pres_rectif_anual){
            // Datos para el gráfico de líneas (ejemplo)
            const anios_anual = declaraciones.pres_rectif_anual.map(item => item.anio);
            const cantidadesComercios_anual = declaraciones.pres_rectif_anual.map(item => item.cantidad_comercios);
            const colores = mapAnualColors(cantidadesComercios_anual);

            setChartDataRectifAnual({
                labels: anios_anual, // Años en el eje X
                datasets: [
                    {
                        label: 'Cantidad de Comercios',
                        data: cantidadesComercios_anual, // Cantidades de comercios en el eje Y
                        borderColor: colores, // Color diferente para cada punto de la línea
                        backgroundColor: colores.map(color => color.replace('1)', '0.2)')), // Fondo con colores más suaves
                        fill: true, // Rellenar el área bajo la línea
                        tension: 0.4, // Curvatura de la línea
                    }
                ]
            });

            setChartOptionsRectifAnual({
                responsive: true, // Hacer el gráfico responsivo
                scales: scalesStyle
            });
        }

        if (declaraciones && declaraciones.pres_rectificativa_mensual){
            // Mapear los datos mensuales
            const cantidadesComercios_mensual = declaraciones.pres_rectificativa_mensual.map(item => ({
                anio: item.anio,
                cuota: item.cuota,
                cantidad_comercios: item.cantidad_comercios
            }));

            // Agrupar los datos por año y cuota
            const dataByYear = cantidadesComercios_mensual.reduce((acc, { anio, cuota, cantidad_comercios }) => {
                // Si el año no existe, lo creamos
                if (!acc[anio]) {
                    acc[anio] = {};
                }
                // Si la cuota no existe dentro del año, la inicializamos
                if (!acc[anio][cuota]) {
                    acc[anio][cuota] = [];
                }
                // Agregar la cantidad de comercios a la cuota correspondiente para ese año
                acc[anio][cuota].push(cantidad_comercios);
                return acc;
            }, {});

            // Obtener todos los años y cuotas únicos
            const anios_mensual = Object.keys(dataByYear);
            const cuotas = Array.from(new Set(cantidadesComercios_mensual.map(item => item.cuota))); // Obtener todas las cuotas únicas

            const datasets = cuotas.map((cuota, index) => ({
                label: `Cuota ${cuota}`,
                data: anios_mensual.map(anio => {
                    const cantidadPorAnio = dataByYear[anio][cuota] ? dataByYear[anio][cuota].reduce((sum, cantidad) => sum + cantidad, 0) : 0;
                    return cantidadPorAnio;
                }),
                borderColor: colors[index % colors.length],
                backgroundColor: `${colors[index % colors.length].replace('1)', '0.2)')}`,
                fill: true,
                tension: 0.4
            }));

            // Establecer los datos y opciones del gráfico
            setChartDataRectifMensual({
                labels: anios_mensual, // Los años van en el eje X
                datasets: datasets
            });


            setChartOptionsRectifMensual({
                responsive: true,
                scales: scalesStyle
            });
        }

    }, [declaraciones]);

    const mapAnualColors = (data) => {
        return data.map((_, index) => {
            if (index < colors.length) {
                return colors[index];
            } else {
                return `rgba(${(index * 100 + 50) % 255}, ${(index * 150 + 100) % 255}, ${(index * 200 + 50) % 255}, 1)`; // Colores únicos
            }
        });
    }

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Rafam" title="PRESENTACIONES" />

                <div className="p-5 md:p-10 dark:bg-azure-800">
                    <span className="text-azure-600 dark:text-azure-300 text-lg mb-3">PRESENTACION OFICIO</span>
                    <div className="flex flex-col lg:flex-row mb-3 border-2 border-azure-300 p-3 rounded-lg">
                        <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300  w-full lg:w-4/12">
                            <span className="font-normal">Por año</span>
                            {chartDataOficioAnual && chartOptionsOficioAnual && chartDataOficioAnual.labels ? (
                                <Line data={chartDataOficioAnual} options={chartOptionsOficioAnual} />
                            ) : (
                                <Loading />
                            )}
                        </div>
                        <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300  w-full lg:w-8/12">
                            <span className="font-normal">Mensual</span>
                            {chartDataOficioMensual && chartOptionsOficioMensual && chartDataOficioMensual.labels ? (
                                <Bar data={chartDataOficioMensual} options={chartOptionsOficioMensual} />
                            ) : (
                                <Loading />
                            )}
                        </div>
                    </div>
                    <span className="text-azure-600 dark:text-azure-300 text-lg mb-3">PRESENTACION ORIGINAL</span>
                    <div className="flex flex-col lg:flex-row mb-3 border-2 border-azure-300 p-3 rounded-lg">
                        <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300  w-full lg:w-4/12">
                            <span className="font-normal">Por año</span>
                            {chartDataPresOrigAnual && chartOptionsPresOrigAnual && chartDataPresOrigAnual.labels ? (
                                <Line data={chartDataPresOrigAnual} options={chartOptionsPresOrigAnual} />
                            ) : (
                                <Loading />
                            )}
                        </div>
                    
                        <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300 w-full lg:w-8/12">
                            <span className="font-normal">Mensual</span>
                            {chartDataOriginalMensual && chartOptionsOriginalMensual && chartDataOriginalMensual.labels ? (
                                <Bar  data={chartDataOriginalMensual} options={chartOptionsOriginalMensual} />
                            ) : (
                                <Loading />
                            )}
                        </div>
                    </div>
                    <span className="text-azure-600 dark:text-azure-300 text-lg mb-3">PRESENTACION RECTIFICATIVA</span>
                    <div className="flex flex-col lg:flex-row mb-3 border-2 border-azure-300 p-3 rounded-lg">
                        <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300 w-full lg:w-4/12">
                            <span className="font-normal">Por año</span>
                            {chartDataRectifAnual && chartOptionsRectifAnual && chartDataRectifAnual.labels ? (
                                <Pie data={chartDataRectifAnual} options={chartOptionsRectifAnual} />
                            ) : (
                                <Loading />
                            )}
                        </div>
                        <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300 w-full lg:w-8/12">
                            <span className="font-normal">Mensual</span>
                            {chartDataRectifMensual && chartOptionsRectifMensual && chartDataRectifMensual.labels ? (
                                <Bar  data={chartDataRectifMensual} options={chartOptionsRectifMensual} />
                            ) : (
                                <Loading />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
};

export default Presentaciones;

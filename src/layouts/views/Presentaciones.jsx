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

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Presentaciones = () => {
    const dispatch = useDispatch();

    const { declaraciones, loading, error } = useSelector(
        (state) => state.declaraciones
    );

    const [chartDataOficioAnual , setChartDataOficioAnual] = useState({});
    const [chartOptionsOficioAnual , setChartOptionsOficioAnual] = useState({});

    const [chartDataOficioMensual , setChartDataOficioMensual] = useState({});
    const [chartOptionsOficioMensual , setChartOptionsOficioMensual] = useState({});

    useEffect(() => {
        dispatch(fetchPresentaciones());
    }, [dispatch]);

    useEffect(() => {
        if (declaraciones && declaraciones.pres_oficio_anual) {
            // Verificar que 'pres_oficio_anual' exista antes de acceder a sus datos
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
                scales: {
                    y: {
                        beginAtZero: true // Iniciar el eje Y desde cero
                    }
                }
            });
        }

        if (declaraciones && declaraciones.pres_oficio_mensual) {
            // Mapear los datos mensuales
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
            
            // Crear los datasets para cada cuota
            const datasets = cuotas.map(cuota => ({
                label: `Cuota ${cuota}`,
                data: anios_mensual.map(anio => {
                    // Si hay datos para el año y la cuota, sumarlos
                    const cantidadPorAnio = dataByYear[anio][cuota] ? dataByYear[anio][cuota].reduce((sum, cantidad) => sum + cantidad, 0) : 0;
                    return cantidadPorAnio;
                }),
                borderColor: `rgba(${(cuota * 50) % 255}, ${(cuota * 100) % 255}, ${(cuota * 150) % 255}, 1)`, // Color único para cada cuota
                backgroundColor: `rgba(${(cuota * 50) % 255}, ${(cuota * 100) % 255}, ${(cuota * 150) % 255}, 0.2)`,
                fill: true,
                tension: 0.4
            }));

            // Establecer los datos y opciones del gráfico
            setChartDataOficioMensual({
                labels: anios_mensual, // Los años van en el eje X
                datasets: datasets
            });

            setChartOptionsOficioMensual({
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            });
        }
    }, [declaraciones]); // Solo se vuelve a ejecutar cuando 'declaraciones' cambia

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Rafam" title="PRESENTACIONES" />

                <div className="p-5 md:p-10">
                    <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                        {/* Mostrar el gráfico solo si 'chartData' y 'chartOptions' están disponibles */}
                        {chartDataOficioAnual && chartOptionsOficioAnual && chartDataOficioAnual.labels ? (
                            <Line data={chartDataOficioAnual} options={chartOptionsOficioAnual} />
                        ) : (
                            <Loading /> // Mostrar un componente de carga si los datos no están listos
                        )}
                    </div>
                    <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                        {/* Mostrar el gráfico solo si 'chartData' y 'chartOptions' están disponibles */}
                        {chartDataOficioMensual && chartOptionsOficioMensual && chartDataOficioMensual.labels ? (
                            <Line data={chartDataOficioMensual} options={chartOptionsOficioMensual} />
                        ) : (
                            <Loading /> // Mostrar un componente de carga si los datos no están listos
                        )}
                    </div>
                </div>
            </div>
        </Content>
    );
};

export default Presentaciones;

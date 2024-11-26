import Content from "../../components/Content";
import { useMenu } from "../../../Context/MenuContext";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Errormsg from "../../components/Errormsg";

const Rodado = () => {
    const { sistemas, error, loading, setLoading, setError } = useMenu();
    const { rodado } = useParams();
    const [rod, setRod] = useState(null);

    const loadData = async (rodado) => {
        setLoading(true);
        setError(null);

        let getRod = null;
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/rafam/rodado/${rodado}`
            );
            getRod = response.data.data[0];
            console.log(getRod);
        } catch (err) {
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        } finally {
            setRod(getRod);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (rodado && !rod) loadData(rodado);
    }, [rodado]);

    return (
        <Content>
            <div className="text-left w-full">
                <div className="p-5 text-left border-b-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
                    <div className="flex flex-col text-left">
                        <span className="text-md text-azure-400 font-light">
                            Rafam
                        </span>
                        <div className="flex">
                            <Link
                                to={"/rafam/rodados"}
                                className="text-2xl text-azure-800 hover:text-azure-500 dark:text-azure-300 font-medium me-2">
                                RODADOS /
                            </Link>
                            <span className="text-2xl text-azure-400 dark:text-azure-300 font-medium">
                                #{rodado}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    {loading ? (
                        <Loading title="rodado" />
                    ) : rod ? (
                        <div className="bg-white dark:bg-azure-700 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                            <div className="flex flex-col md:flex-row text-azure-600 mb-10 gap-5 md:gap-20">
                                <div className="flex flex-col w-full md:w-6/12">
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            ANIO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {rod.ANIO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            CARROCERIA
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {rod.CARROCERIA ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            DOMINIO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {rod.DOMINIO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            MARCA
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {rod.MARCA ?? "-"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full md:w-6/12">
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            MODELO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {rod.MODELO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            MOTOR
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {rod.MOTOR ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            NÚMERO RODADO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {rod.NRO_RODADO ?? "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY RODADO DISPONIBLE
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Rodado;

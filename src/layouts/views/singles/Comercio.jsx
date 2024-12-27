import Content from "../../components/Content";
import { useMenu } from "../../../Context/MenuContext";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Link, useParams } from "react-router-dom";
import Errormsg from "../../components/Errormsg";
import axios from "axios";
import { toast } from "react-toastify";

const Comercio = () => {
    const { sistemas, error, loading, setLoading, setError } = useMenu();
    const { comercio } = useParams();
    const [com, setCom] = useState(null);

    const loadData = async (comercio) => {
        setLoading(true);
        setError(null);

        let getCom = null;
        try {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_API_URL
                }/atenea/api/rafam/comercio/${comercio}`
            );
            getCom = response.data.data[0];
            console.log(getCom);
        } catch (err) {
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        } finally {
            setCom(getCom);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (comercio && !com) loadData(comercio);
        // console.log(comercio);
    }, [comercio]);
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
                                to={"/rafam/comercios"}
                                className="text-2xl text-azure-800 hover:text-azure-500 dark:text-azure-300 font-medium me-2">
                                COMERCIOS /
                            </Link>
                            <span className="text-2xl text-azure-400 dark:text-azure-300 font-medium">
                                #{comercio}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    {loading ? (
                        <Loading title="rodado" />
                    ) : com ? (
                        <div className="bg-white dark:bg-azure-700 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                            <div className="flex flex-col md:flex-row text-azure-600 mb-10 gap-5 md:gap-20">
                                <div className="flex flex-col w-full md:w-6/12">
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            CUIT
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {com.CUIT ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            DIRECCIÓN
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {com.DP_CALLE ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            ALTURA
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {com.DP_NRO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            FECHA DE APERTURA
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {com.FECHA_APERTURA ?? "-"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full md:w-6/12">
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            NOMBRE
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {com.NOMBRE ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            NRO COMERCIO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {com.NRO_COMERCIO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            RESPONSABLE PAGO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {com.RESP_PAGO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            RUBRO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {com.RUBRO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            TELEFONOS
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {com.TELEFONOS ?? "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY COMERCIO DISPONIBLE
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Comercio;

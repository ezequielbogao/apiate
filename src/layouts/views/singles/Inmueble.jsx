import Content from "../../components/Content";
import { useMenu } from "../../../Context/MenuContext";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Link, useParams } from "react-router-dom";
import Errormsg from "../../components/Errormsg";
import axios from "axios";
import { toast } from "react-toastify";

const Inmueble = () => {
    const { sistemas, error, loading, setLoading, setError } = useMenu();
    const { inmueble } = useParams();
    const [inm, setInm] = useState(null);

    const loadData = async (inmueble) => {
        setLoading(true);
        setError(null);

        let getImn = null;
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/rafam/inmueble/${inmueble}`
            );
            getImn = response.data.data;
            console.log(getImn);
        } catch (err) {
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        } finally {
            setInm(getImn);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inmueble && !inm) loadData(inmueble);
    }, [inmueble]);

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
                                to={"/rafam/inmuebles"}
                                className="text-2xl text-azure-800 hover:text-azure-500 dark:text-azure-300 font-medium me-2">
                                INMUEBLES /
                            </Link>
                            <span className="text-2xl text-azure-400 dark:text-azure-300 font-medium">
                                #{inmueble}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    {loading ? (
                        <Loading title="rodado" />
                    ) : inm ? (
                        <div className="bg-white dark:bg-azure-700 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                            <div className="flex flex-col md:flex-row text-azure-600 mb-10 gap-5 md:gap-20">
                                <div className="flex flex-col w-full md:w-6/12">
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            BASE IMPONIBLE
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {inm.BASE_IMPONIBLE ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            CARACTERISTICA
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {inm.CARACTERISTICA ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            DP CALLE
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {inm.DP_CALLE ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            DP NUMERO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {inm.DP_NUMERO ?? "-"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full md:w-6/12">
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            NÚMERO INMUEBLE
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {inm.NRO_INMUEBLE ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            RESP PAGO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {inm.RESP_PAGO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            USO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {inm.USO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            VALOR FISCAL
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {inm.VAL_FISCAL ?? "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY INMUEBLE DISPONIBLE
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Inmueble;

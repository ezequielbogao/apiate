import Content from "../../components/Content";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import Errormsg from "../../components/Errormsg";
import { useDispatch, useSelector } from "react-redux";
import { fetchImponible } from "../../../redux/slices/imponibleSlice";

const Inmueble = () => {
    const { inmueble } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { imponible, loadingImponible, errorImponible } = useSelector(
        (state) => state.imponible
    );
    const { personales } = useSelector((state) => state.personal);
    const { sistemas } = useSelector((state) => state.personal);
    const [tieneDeuda, setTieneDeuda] = useState(false);

    useEffect(() => {
        // if (Object.keys(personales).length == 0) navigate("/");
        if (inmueble) dispatch(fetchImponible(inmueble, "inmueble"));

        if (sistemas && sistemas.rafam_imponibles_deuda) {
            let imponibles =
                sistemas.rafam_imponibles_deuda?.IMPONIBLES?.INMUEBLES;

            const foundRodado = imponibles.find(
                (item) => item.NRO_INMUEBLE == inmueble
            );

            if (foundRodado) {
                if (foundRodado.NRO_INMUEBLE > 0) setTieneDeuda(true);
            }
        }
    }, [inmueble, personales, dispatch, navigate, sistemas]);

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
                    {loadingImponible ? (
                        <Loading title="rodado" />
                    ) : imponible ? (
                        <div className="bg-white dark:bg-azure-700 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                            <div className="flex w-full justify-end">
                                <span
                                    className={`px-2 py-2 text-sm bg-${
                                        tieneDeuda ? "red" : "green"
                                    }-500 text-white rounded-lg`}>
                                    {tieneDeuda ? "Tiene deuda" : "Sin deuda"}
                                </span>
                            </div>
                            <div className="flex flex-col md:flex-row text-azure-600 mb-10 gap-5 md:gap-20">
                                <div className="flex flex-col w-full md:w-6/12">
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            BASE IMPONIBLE
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {imponible.BASE_IMPONIBLE ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            CARACTERISTICA
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {imponible.CARACTERISTICA ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            DP CALLE
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {imponible.DP_CALLE ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            DP NUMERO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {imponible.DP_NUMERO ?? "-"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full md:w-6/12">
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            NÚMERO INMUEBLE
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {imponible.NRO_INMUEBLE ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            RESP PAGO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {imponible.RESP_PAGO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            USO
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {imponible.USO ?? "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                        <span className="text-azure-300 font-light">
                                            VALOR FISCAL
                                        </span>
                                        <span className=" dark:text-azure-100 font-medium">
                                            {imponible.VAL_FISCAL ?? "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        !errorImponible && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY INMUEBLE DISPONIBLE
                            </div>
                        )
                    )}
                    {errorImponible && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Inmueble;

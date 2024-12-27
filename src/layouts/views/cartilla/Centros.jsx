import { useEffect, useState } from "react";
import { useMenu } from "@ctx/MenuContext";
import Content from "@cpt/Content";
import Loading from "@cpt/Loading";
import Location from "@icons/Location";
import Phone from "@icons/Phone";
import ContentHeader from "@cpt/ContentHeader";
import Errormsg from "@cpt/Errormsg";
import { FormServicio } from "./FormServicio";
import { FormProfesional } from "./FormProfesional";
import { Link, useParams } from "react-router-dom";

import Leftarrow from "@icons/Leftarrow";
import axios from "axios";
import { toast } from "react-toastify";

const Centros = () => {
    const { error, loading, setLoading, setError } = useMenu();
    const [centros, setCentros] = useState([]);
    const { especialidad } = useParams();

    const getCentros = async () => {
        try {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_API_URL
                }/atenea/api/salud/cartilla/centros/${especialidad}`
            );
            setCentros(response.data.data[0].centros);
        } catch (err) {
            console.log(err);
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        }
    };

    useEffect(() => {
        getCentros(especialidad);
        if (centros) {
            console.log(centros);
        }
    }, []);

    const style = {
        item: "p-5 flex flex-col shadow-sm rounded-lg border-2 border-azure-100  text-azure-500 bg-white hover:border-light-green-200  hover:shadow-md hover:text-azure-500 transition-all focus:outline-none",
    };

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader
                    label="Salud"
                    title="CARTILLA MÉDICA"
                    subtitle="Centros de salud"
                />

                <div className="p-5 md:pl-10 md:pr-10">
                    {loading ? (
                        <Loading title="cartilla médica - Buscador" />
                    ) : (
                        <div className="bg-white dark:bg-azure-700 rounded-xl p-5">
                            <div className="mt-5 flex flex-col">
                                <div className="flex justify-start mb-4">
                                    <Link
                                        to={"/salud/cartilla"}
                                        className="bg-azure-50 rounded-full p-1 text-azure-500 hover:text-azure-600 hover:bg-azure-100 transition-colors">
                                        <Leftarrow width={"30"} height={"30"} />
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {centros &&
                                        centros.map(
                                            ({
                                                ubicCodigo,
                                                ubicacion,
                                                calle,
                                                nro,
                                                cp,
                                                telefono,
                                            }) => (
                                                <>
                                                    <Link
                                                        key={ubicCodigo}
                                                        className={style.item}>
                                                        <span className="text-azure-600 font-bold text-lg my-2">
                                                            {ubicacion}
                                                        </span>
                                                        <span className="text-azure-600 font-bold text-2xl my-2">
                                                            {calle} {nro}
                                                        </span>
                                                        <span className="text-azure-600 font-bold text-2xl my-2">
                                                            {cp} {telefono}
                                                        </span>
                                                    </Link>
                                                </>
                                            )
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Centros;

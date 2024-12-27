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

const Medicos = () => {
    const { error, loading, setLoading, setError } = useMenu();
    const [formSelected, setFormSelected] = useState(1);
    const [medicos, setMedicos] = useState([]);
    const { especialidad } = useParams();

    const changeForm = (e) => {
        setFormSelected(e);
    };

    const getMedicos = async () => {
        let meds = [];
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/salud/cartilla/medicos/${especialidad}`
            );
            // medicos = response.data.data;
            // console.log(response.data.data[0]);
            if (response.data.data) {
                setMedicos(response.data.data[0].medicos);
            }
        } catch (err) {
            console.log(err);
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        }
    };

    useEffect(() => {
        getMedicos(especialidad);
        if (medicos) {
            console.log(medicos);
        }
    }, []);

    const style = {
        item: "p-5 shadow-sm rounded-lg border-2 border-azure-100  text-azure-500 bg-white hover:border-light-green-200  hover:shadow-md hover:text-azure-500 transition-all focus:outline-none",
    };

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader
                    label="Salud"
                    title="CARTILLA MÉDICA"
                    subtitle="Médicos"
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
                                {/* <span className="mb-2">Resultados :</span> */}
                                <div className="flex flex-col gap-4">
                                    {medicos &&
                                        medicos.map(
                                            ({
                                                mediCodigo,
                                                medNombre,
                                                medApellido,
                                            }) => (
                                                <>
                                                    <Link
                                                        key={mediCodigo}
                                                        onClick={() =>
                                                            changeForm(1)
                                                        }
                                                        className={style.item}>
                                                        <span className="text-azure-600 font-bold text-2xl my-2">
                                                            {medNombre}{" "}
                                                            {medApellido}
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

export default Medicos;

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
import Stetho from "../../components/icons/Stetho";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicos } from "../../../redux/slices/cartillaSlice";
import Pending from "../../components/Pending";

const Medicos = () => {
    const dispatch = useDispatch();
    const { medicos, loadingMedicos, errorMedicos } = useSelector(
        (state) => state.cartilla
    );

    const { especialidad } = useParams();
    useEffect(() => {
        dispatch(fetchMedicos(especialidad));
    }, []);

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader
                    label="Salud"
                    title="CARTILLA MÉDICA"
                    subtitle="Médicos"
                />

                <div className="p-5 md:pl-10 md:pr-10">
                    <Pending loading={loadingMedicos } title={"datos"}>
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
                                        {medicos.lenght > 0 ?
                                            medicos.map(
                                                ({
                                                    mediCodigo,
                                                    medNombre,
                                                    medApellido,
                                                }) => (
                                                    <div
                                                        key={mediCodigo}
                                                        className="flex gap-5 bg-azure-50  dark:bg-azure-600 rounded-xl  mt-5 p-5 dark:border-2 dark:border-azure-600">
                                                        <Stetho
                                                            width={"50"}
                                                            height={"50"}
                                                        />
                                                        <div className="flex flex-col">
                                                            <div className="text-xl flex flex-col font-medium text-azure-600 dark:text-azure-200">
                                                                {medNombre}{" "}
                                                                {medApellido}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            ) :                                      <>
                                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                                NO HAY INFORMACION DISPONIBLE
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </div>
                    </Pending>
                </div>
            </div>
        </Content>
    );
};

export default Medicos;

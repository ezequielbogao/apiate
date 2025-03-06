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
import Hospital from "../../components/icons/Hospital";
import { useDispatch, useSelector } from "react-redux";
import { fetchCentros } from "../../../redux/slices/cartillaSlice";

const Centros = () => {
    const dispatch = useDispatch();
    const { centros, loadingCentros, errorCentros } = useSelector(
        (state) => state.cartilla
    );
    const { especialidad } = useParams();

    useEffect(() => {
        dispatch(fetchCentros(especialidad));
        if (centros) {
            console.log(centros);
        }
    }, []);

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader
                    label="Salud"
                    title="CARTILLA MÉDICA"
                    subtitle="Centros de salud"
                />

                <div className="p-5 md:pl-10 md:pr-10">
                    {loadingCentros ? (
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
                                <div className="grid grid-cols-1 gap-4">
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
                                                <div
                                                    key={ubicCodigo}
                                                    className="flex gap-5 bg-azure-50  dark:bg-azure-600 rounded-xl  mt-5 p-5 dark:border-2 dark:border-azure-600">
                                                    <Hospital
                                                        width={"50"}
                                                        height={"50"}
                                                    />
                                                    <div className="flex flex-col">
                                                        <div className="text-3xl flex flex-col font-medium text-azure-600 dark:text-azure-200">
                                                            {ubicacion}
                                                        </div>
                                                        <div className="text-xl text-azure-500 font-light dark:text-azure-300">
                                                            {calle} {nro}
                                                        </div>
                                                        <div className="text-xl text-azure-500 font-light dark:text-azure-300">
                                                            {telefono}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                    {errorCentros && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Centros;

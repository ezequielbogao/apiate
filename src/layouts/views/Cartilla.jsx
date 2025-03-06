import { useState } from "react";
import { useMenu } from "@ctx/MenuContext";
import Content from "@cpt/Content";
import Loading from "@cpt/Loading";
import ContentHeader from "@cpt/ContentHeader";
import Errormsg from "@cpt/Errormsg";
import { toast } from "react-toastify";
import { setCampanasData } from "../../services/campanasService";
import { Form } from "react-hook-form";
import { FormServicio } from "./cartilla/FormServicio";
import { FormProfesional } from "./cartilla/FormProfesional";
import { useSelector } from "react-redux";

const Cartilla = () => {
    const { loadingMain, errorLoading } = useSelector(
        (state) => state.dashboard
    );
    // const [formSelected, setFormSelected] = useState(1);

    // const changeForm = (e) => {
    //     setFormSelected(e);
    // };

    // const style = {
    //     button: "p-5 shadow-md border-2 border-azure-500 text-azure-500 dark:text-azure-100 dark:border-azure-600 dark:hover:bg-azure-500 dark:hover:border-azure-500 bg-white dark:bg-azure-600 hover:bg-azure-600 hover:text-white hover:border-azure-600 transition-colors focus:outline-none",
    // };

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Salud" title="CARTILLA MÉDICA" />

                <div className="p-5 md:p-10">
                    {loadingMain ? (
                        <Loading title="cartilla médica" />
                    ) : (
                        <div className="bg-white dark:bg-azure-700 rounded-xl">
                            <span className="text-azure-400 font-light text-md">
                                Consultá y accedé a toda la información sobre
                                los servicios médicos disponibles, incluyendo
                                médicos, especialidades y centros de salud
                                afiliados. Encontrá los profesionales y centros
                                más cercanos, sus horarios de atención y
                                detalles importantes.
                            </span>
                            <div className="mt-5 flex flex-col">
                                <div className="my-5 flex justify-center">
                                    <FormServicio />
                                </div>
                            </div>
                        </div>
                    )}
                    {errorLoading && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Cartilla;

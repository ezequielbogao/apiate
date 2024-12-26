import { useState } from "react";
import { useMenu } from "@ctx/MenuContext";
import Content from "@cpt/Content";
import Loading from "@cpt/Loading";
import Location from "@icons/Location";
import Phone from "@icons/Phone";
import ContentHeader from "@cpt/ContentHeader";
import Errormsg from "@cpt/Errormsg";
import { FormServicio } from "./FormServicio";
import { FormProfesional } from "./FormProfesional";
import { Link } from "react-router-dom";

import Leftarrow from "@icons/Leftarrow";

const Buscar = () => {
    const { error, loading, setLoading, setError } = useMenu();
    const [formSelected, setFormSelected] = useState(1);

    const changeForm = (e) => {
        setFormSelected(e);
    };

    const style = {
        item: "p-5 shadow-sm rounded-lg border-2 border-azure-100  text-azure-500 bg-white hover:border-light-green-200  hover:shadow-md hover:text-azure-500 transition-all focus:outline-none",
    };

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader
                    label="Salud"
                    title="CARTILLA MÉDICA"
                    subtitle="Buscador"
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
                                    <Link
                                        onClick={() => changeForm(1)}
                                        className={style.item}>
                                        <span className="text-azure-600 font-bold text-2xl my-2">
                                            Título del item{" "}
                                        </span>
                                        <div className="flex my-2 align-middle">
                                            <Location
                                                width={"30"}
                                                height={"30"}
                                            />{" "}
                                            Calle 14 1142, 25 De Mayo , 25 De
                                            Mayo. (Buenos Aires)
                                        </div>
                                        <div className="flex align-middle">
                                            <Phone width={"30"} height={"30"} />{" "}
                                            (02345) 463616
                                        </div>
                                    </Link>
                                    <Link
                                        onClick={() => changeForm(1)}
                                        className={style.item}>
                                        <span className="text-azure-600 font-bold text-2xl my-2">
                                            Título del item{" "}
                                        </span>
                                        <div className="flex my-2 align-middle">
                                            <Location
                                                width={"30"}
                                                height={"30"}
                                            />{" "}
                                            Calle 14 1142, 25 De Mayo , 25 De
                                            Mayo. (Buenos Aires)
                                        </div>
                                        <div className="flex flex-col md:flex-row align-middle gap-3">
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 1
                                            </span>
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 2
                                            </span>
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 3
                                            </span>
                                        </div>
                                    </Link>
                                    <Link
                                        onClick={() => changeForm(1)}
                                        className={style.item}>
                                        <span className="text-azure-600 font-bold text-2xl my-2">
                                            Título del item{" "}
                                        </span>
                                        <div className="flex my-2 align-middle">
                                            <Location
                                                width={"30"}
                                                height={"30"}
                                            />{" "}
                                            Calle 14 1142, 25 De Mayo , 25 De
                                            Mayo. (Buenos Aires)
                                        </div>
                                        <div className="flex flex-col md:flex-row align-middle gap-3">
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 1
                                            </span>
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 2
                                            </span>
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 3
                                            </span>
                                        </div>
                                    </Link>
                                    <Link
                                        onClick={() => changeForm(1)}
                                        className={style.item}>
                                        <span className="text-azure-600 font-bold text-2xl my-2">
                                            Título del item{" "}
                                        </span>
                                        <div className="flex my-2 align-middle">
                                            <Location
                                                width={"30"}
                                                height={"30"}
                                            />{" "}
                                            Calle 14 1142, 25 De Mayo , 25 De
                                            Mayo. (Buenos Aires)
                                        </div>
                                        <div className="flex align-middle">
                                            <Phone width={"30"} height={"30"} />{" "}
                                            (02345) 463616
                                        </div>
                                    </Link>
                                    <Link
                                        onClick={() => changeForm(1)}
                                        className={style.item}>
                                        <span className="text-azure-600 font-bold text-2xl my-2">
                                            Título del item{" "}
                                        </span>
                                        <div className="flex my-2 align-middle">
                                            <Location
                                                width={"30"}
                                                height={"30"}
                                            />{" "}
                                            Calle 14 1142, 25 De Mayo , 25 De
                                            Mayo. (Buenos Aires)
                                        </div>
                                        <div className="flex flex-col md:flex-row align-middle gap-3">
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 1
                                            </span>
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 2
                                            </span>
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 3
                                            </span>
                                        </div>
                                    </Link>
                                    <Link
                                        onClick={() => changeForm(1)}
                                        className={style.item}>
                                        <span className="text-azure-600 font-bold text-2xl my-2">
                                            Título del item{" "}
                                        </span>
                                        <div className="flex my-2 align-middle">
                                            <Location
                                                width={"30"}
                                                height={"30"}
                                            />{" "}
                                            Calle 14 1142, 25 De Mayo , 25 De
                                            Mayo. (Buenos Aires)
                                        </div>
                                        <div className="flex flex-col md:flex-row align-middle gap-3">
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 1
                                            </span>
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 2
                                            </span>
                                            <span className="bg-azure-700 text-white px-2 py-1 text-sm rounded-lg">
                                                Categoría 3
                                            </span>
                                        </div>
                                    </Link>
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

export default Buscar;

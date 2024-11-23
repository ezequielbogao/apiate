import React, { useEffect, useState } from "react";
import Pago from "./icons/Pago";
import MenuButton from "./MenuButton";
import Citas from "./icons/Citas";
import User from "./icons/User";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMenu } from "../../Context/MenuContext";
import Casa from "./icons/Casa";
import Auto from "./icons/Auto";
import Charts from "./icons/Charts";
import Store from "./icons/Store";
import Inter from "./icons/Inter";
import Corazon from "./icons/Corazon";
import Turnosmed from "./icons/Turnosmed";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Bartoleft from "./icons/Bartoleft";
import Bartoright from "./icons/Bartoright";

const Menu = () => {
    const navigate = useNavigate();
    const [dni, setDni] = useState(null);
    const {
        persona,
        setPersona,
        sistemas,
        setSistemas,
        error,
        setError,
        loading,
        setLoading,
    } = useMenu();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async () => {
        setDni(watch("dni"));
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/persons?document=${dni}`
            );

            setPersona(response.data.data.Datos_personales.Persona[0]);
            setSistemas(response.data.data.Sistemas);
            console.log(sistemas);
            toast.success("Persona con DNI " + dni + " encontrada con exito!");
            // navigate("/personal");
        } catch (err) {
            setError(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-2/12 xs:w-2/12 md:w-3/12 justify-between md:px-5 border-r-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
            <div className="flex flex-col mt-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex rounded-xl mb-14">
                    <div className="flex flex-row w-full border-2 border-azure-200 dark:border-azure-500 rounded-xl">
                        <input
                            className="py-0 px-2 w-10/12  text-azure-600 dark:bg-azure-700 rounded-xl focus:outline-none text-sm dark:text-azure-100"
                            placeholder="Buscar por DNI"
                            {...register("dni", { required: true })}
                        />

                        <button
                            type="submit"
                            className="transition-colors rounded-xl text-azure-700  hover:text-green-300 bg-transparent hover:dark:text-green-500 dark:text-azure-50 border-none focus:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
                            </svg>
                        </button>
                    </div>
                </form>
                <span
                    className={`text-azure-300 font-light text-center md:text-left text-sm mt-10 mb-3`}>
                    HOME
                </span>
                <MenuButton to={"/"} icon={<Charts />} title={"Dashboard"} />
                <span
                    className={`text-azure-300 font-light text-center md:text-left text-sm mt-10 mb-3`}>
                    PERSONA
                </span>
                <MenuButton
                    to={"/personal"}
                    icon={<User />}
                    title={"Información"}
                />
                <span className="text-azure-300 font-light text-center md:text-left text-sm mt-10 mb-3">
                    SISTEMA
                </span>
                <MenuButton to={"/citas"} icon={<Citas />} title={"Citas"} />
                <MenuButton to={"/pagos"} icon={<Pago />} title={"Pagos"} />
                <span
                    className={`text-azure-300 font-light text-center md:text-left text-sm mt-10 mb-3`}>
                    RAFAM
                </span>
                <MenuButton
                    to={"/rafam/comercios"}
                    icon={<Store />}
                    title={"Comercios"}
                />
                <MenuButton
                    to={"/rafam/inmuebles"}
                    icon={<Casa />}
                    title={"Inmuebles"}
                />
                <MenuButton
                    to={"/rafam/rodados"}
                    icon={<Auto />}
                    title={"Rodados"}
                />
                <span
                    className={`text-azure-300 font-light text-center md:text-left text-sm mt-10 mb-3`}>
                    SALUD
                </span>
                <MenuButton
                    to={"/salud/emergencias"}
                    icon={<Corazon />}
                    title={"Emergencias"}
                />{" "}
                <MenuButton
                    to={"/salud/internacion"}
                    icon={<Inter />}
                    title={"Internación"}
                />
                <MenuButton
                    to={"/salud/turnos"}
                    icon={<Turnosmed />}
                    title={"Turnos"}
                />
            </div>
            {/* <Drawer
                overlay={false}
                open={isDrawerOpen}
                onClose={closeDrawer}
                className="bg-transparent w-full opacity-100 shadow-none">
                <Card
                    shadow={false}
                    className=" w-full bg-white dark:bg-azure-700 rounded-tl-none rounded-bl-none top-44 border-2 border-azure-200 dark:border-azure-600">
                    <div className="mb-2 flex items-center gap-4 p-4">
                        <form className="flex rounded-xl mt-2">
                            <div className="flex flex-row w-full">
                                <input
                                    className="py-0 px-2 w-10/12 border-2 border-azure-200 dark:border-azure-500 text-azure-600 dark:bg-azure-700 rounded-xl focus:outline-none text-sm dark:text-azure-100"
                                    placeholder="Buscar por DNI"
                                    {...register("dni_sidebar", {
                                        required: true,
                                    })}
                                />

                                <button
                                    type="submit"
                                    className="transition-colors rounded-xl text-azure-700  hover:text-green-300 bg-transparent hover:dark:text-green-500 dark:text-azure-50 border-none focus:outline-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"

                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                        <path d="M21 21l-6 -6" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </Card>
            </Drawer> */}
        </div>
    );
};

export default Menu;

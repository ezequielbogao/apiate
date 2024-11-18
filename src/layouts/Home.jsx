import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import User from "./components/icons/User";
import Citas from "./components/icons/Citas";
import Imponible from "./components/icons/Imponible";
import { Link } from "react-router-dom";
import MenuButton from "./components/MenuButton";
import Pago from "./components/icons/Pago";
import Menu from "./components/Menu";

const Home = () => {
    const TABLE_CITAS = [
        "Email",
        "Organización",
        "Teléfono",
        "Canal",
        "Fecha",
        "Estado",
    ];

    return (
        <div className="mx-0 md:mx-auto grid grid-cols-12 w-full h-full min-h-screen px-5">
            <Menu />

            <div className="col-span-12 sm:col-span-8 md:col-span-9 py-10">
                {/* {persona ? (
                    <div className="flex justify-start bg-azure-50 dark:bg-azure-900 mt-5 border-2 border-azure-200 dark:border-azure-700 rounded-xl p-4">
                        <div className="flex flex-col text-start">
                            <span className="text-sm text-azure-400 font-thin">
                                Nombre completo
                            </span>
                            <span className="text-md text-azure-700 dark:text-azure-300 font-bold">
                                {persona.nombre} {persona.apellido}
                            </span>
                            <span className="mt-3 text-sm text-azure-400 font-thin">
                                DNI
                            </span>
                            <span className="text-md text-azure-700 dark:text-azure-300 font-bold">
                                {persona.documento}
                            </span>
                        </div>
                    </div>
                ) : (
                    <></>
                    // <div className="flex justify-start bg-azure-50 dark:bg-azure-900 mt-5 border-2 border-azure-200 dark:border-azure-700 rounded-xl p-4">
                    //     <span className="text-sm text-azure-400 font-thin">
                    //         No se encontró la persona o ingresa un DNI válido
                    //     </span>
                    // </div>
                )}
                {sistemas && sistemas.Citas ? (
                    <div className="overflow-auto bg-azure-50 dark:bg-azure-900 rounded-xl p-4 mt-5 border-2 border-azure-200 dark:border-azure-700">
                        <div className="flex flex-col text-start">
                            <span className="text-sm text-azure-400 font-thin">
                                Sistema
                            </span>
                            <span className="text-md text-azure-700 dark:text-azure-300 font-bold">
                                Citas
                            </span>
                        </div>
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_CITAS.map((head) => (
                                        <th
                                            key={head}
                                            className="bg-azure-200 dark:bg-azure-800  p-4">
                                            <Typography
                                                variant="small"
                                                className="font-normal leading-none opacity-70 text-azure-700 dark:text-azure-100">
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sistemas.Citas.length > 0 ? (
                                    sistemas.Citas.map(
                                        (
                                            {
                                                mail,
                                                organizacion,
                                                telefono,
                                                canal,
                                                fecha_turno,
                                                estado_turno,
                                            },
                                            index
                                        ) => (
                                            <tr
                                                key={index}
                                                className="even:bg-azure-100/100 dark:even:bg-azure-800/100">
                                                <td className="p-4">
                                                    <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                        {mail}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                        {organizacion}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                        {telefono}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                        {canal}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                        {fecha_turno}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span
                                                        className={`font-normal text-sm ${
                                                            estado_turno ===
                                                            "Cancelada"
                                                                ? "text-red-500"
                                                                : "text-green-600"
                                                        }`}>
                                                        {estado_turno}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-4 text-center">
                                            No hay citas disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-start bg-azure-50 dark:bg-azure-900 mt-5 border-2 border-azure-200 dark:border-azure-700 rounded-xl p-4">
                        <div className="flex flex-col text-start">
                            <span className="text-sm text-azure-400 font-thin">
                                Sistema
                            </span>
                            <span className="text-md text-azure-700 dark:text-azure-300 font-bold">
                                Citas
                            </span>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Home;

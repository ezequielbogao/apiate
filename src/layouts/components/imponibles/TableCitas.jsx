import React, { useState } from "react";
import { useMenu } from "../../../Context/MenuContext";
import Loading from "../Loading";
import Table from "../table/Table";
import Th from "../table/Th";
import Tr from "../table/Tr";
import Td from "../table/Td";
import Errormsg from "../Errormsg";
import { Link } from "react-router-dom";

export const TableCitas = () => {
    const { sistemas, error, loading } = useMenu();

    const TABLE_CITAS = [
        "Email",
        "Organización",
        "Teléfono",
        "Canal",
        "Fecha",
        "Estado",
    ];

    // Si existen citas, seleccionamos solo las últimas 3.
    const citasUltimas =
        sistemas && sistemas.citas ? sistemas.citas.slice(-3) : [];

    return (
        <>
            {loading ? (
                <Loading title="citas" />
            ) : sistemas && sistemas.citas ? (
                <>
                    {" "}
                    <div className="overflow-auto bg-white dark:bg-azure-800 rounded-xl mt-5 border-2 border-azure-100 dark:border-azure-700">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_CITAS.map((head) => (
                                        <Th key={head} text={head} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {citasUltimas.length > 0 ? (
                                    citasUltimas.map(
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
                                            <Tr key={index}>
                                                <Td content={mail} />
                                                <Td content={organizacion} />
                                                <Td content={telefono} />
                                                <Td content={canal} />
                                                <Td content={fecha_turno} />
                                                <Td>
                                                    <span
                                                        className={`font-normal text-sm ${
                                                            estado_turno ===
                                                            "Cancelada"
                                                                ? "text-red-500"
                                                                : "text-green-600"
                                                        }`}>
                                                        {estado_turno}
                                                    </span>
                                                </Td>
                                            </Tr>
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
                    <div className="w-full flex justify-end p-4">
                        <Link
                            to={"/citas"}
                            className="text-azure-600 dark:text-azure-100 text-lg">
                            Ver mas
                        </Link>
                    </div>
                </>
            ) : (
                !error && (
                    <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                        NO HAY CITAS DISPONIBLES
                    </div>
                )
            )}
            {error && <Errormsg />}
        </>
    );
};

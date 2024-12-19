import React, { useEffect } from "react";

import { useState } from "react";
import { useMenu } from "../../Context/MenuContext";
import Content from "../components/Content";
import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";
import Errormsg from "../components/Errormsg";
import Th from "../components/table/Th";
import Td from "../components/table/Td";
import Tr from "../components/table/Tr";
import Table from "../components/table/Table";
import { toast } from "react-toastify";
import axios from "axios";

const ComerciosRubros = () => {
    const { sistemas, error, loading } = useMenu();
    const TABLE_RUBROS = ["Comercio", "Rubro", "Descripción", "Deuda"];

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);
    const [comerciosRubros, setComerciosRubros] = useState([]);

    const getImponibleByRubro = async (rubro) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/atenea/api/rafam/comercios/rubros/${rubro}`
            );

            setComerciosRubros(response.data.data);
        } catch (err) {
            console.log(err);
            setComerciosRubros(
                err.response ? err.response.data.message : "Error desconocido"
            );
            toast.error("Error");
        }
    };

    useEffect(() => {
        getImponibleByRubro();
    }, []);

    if (comerciosRubros) {
        totalPage = Math.ceil(comerciosRubros.length / itemsPerPage);
        paginatedPages = comerciosRubros.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }

    const nextPage = () => {
        if (currentPage < totalPage) {
            setcurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1);
        }
    };

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Rafam" title="COMERCIOS" />

                <div className="p-5 md:p-10">
                    {loading ? (
                        <Loading title="citas" />
                    ) : comerciosRubros ? (
                        <Table
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                            totalPage={totalPage}>
                            <thead>
                                <tr>
                                    {TABLE_RUBROS.map((head) => (
                                        <Th key={head} text={head} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {comerciosRubros.length > 0 ? (
                                    paginatedPages.map(
                                        (
                                            {
                                                comercio,
                                                rubro,
                                                descripcion,
                                                deuda,
                                            },
                                            index
                                        ) => (
                                            <Tr key={index}>
                                                <Td content={comercio} />
                                                <Td content={rubro} />
                                                <Td content={descripcion} />
                                                <Td content={deuda} />
                                            </Tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-4 text-center">
                                            No hay comercios disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY COMERCIOS DISPONIBLES
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default ComerciosRubros;

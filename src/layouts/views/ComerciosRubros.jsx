import React, { useEffect } from "react";

import { useState } from "react";
import { useMenu } from "@ctx/MenuContext";
import Content from "@cpt/Content";
import Loading from "@cpt/Loading";
import ContentHeader from "@cpt/ContentHeader";
import Errormsg from "@cpt/Errormsg";
import Th from "@cpt/table/Th";
import Td from "@cpt/table/Td";
import Tr from "@cpt/table/Tr";
import Table from "@cpt/table/Table";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Rightarrow from "@icons/Rightarrow";
import { useDispatch, useSelector } from "react-redux";
import { fetchComercios } from "../../redux/slices/imponibleSlice";

const ComerciosRubros = () => {
    const { rubro } = useParams();

    const dispatch = useDispatch();
    const { comercios, loading, error } = useSelector(
        (state) => state.imponible
    );

    const TABLE_RUBROS = ["N° Comercio", "Rubro", "Descripción", "Deuda", ""];

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchComercios(rubro));
    }, [dispatch]);

    if (comercios) {
        totalPage = Math.ceil(comercios.length / itemsPerPage);
        paginatedPages = comercios.slice(
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
                <ContentHeader
                    label="Rafam"
                    title={`COMERCIOS`}
                    subtitle={`${
                        comercios && comercios.length > 0
                            ? comercios[0].descripcion
                            : ""
                    }`}
                />

                <div className="p-5 md:p-10">
                    {loading ? (
                        <Loading title="citas" />
                    ) : comercios ? (
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
                                {comercios.length > 0 ? (
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
                                                <Td
                                                    content={
                                                        "$ " +
                                                        deuda.toLocaleString(
                                                            "de-DE"
                                                        )
                                                    }
                                                />
                                                <Td>
                                                    <Link
                                                        className="bg-white hover:bg-azure-100 dark:bg-azure-500 dark:hover:bg-azure-600 transition-colors w-fit p-1 align-items-center justify-center flex rounded-2xl "
                                                        to={`/rafam/comercio/${comercio}`}>
                                                        <Rightarrow
                                                            width={"25"}
                                                            height={"25"}
                                                        />
                                                    </Link>
                                                </Td>
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

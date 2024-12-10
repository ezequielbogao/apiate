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
import Location from "../components/icons/Location";

const Reclamos = () => {
    const { sistemas, error, loading } = useMenu();

    const TABLE_RECLAMOS = [
        "Número",
        "Documento",
        "Motivo",
        "Derivado",
        "Nombre",
        "Apellido",
        "Calle",
        "Altura",
        "Lugar",
    ];

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    if (sistemas && sistemas.reclamos) {
        totalPage = Math.ceil(sistemas.reclamos.length / itemsPerPage);
        paginatedPages = sistemas.reclamos.slice(
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
                <ContentHeader label="Gestión" title="RECLAMOS" />

                <div className="p-5">
                    {loading ? (
                        <Loading title="citas" />
                    ) : sistemas && sistemas.reclamos ? (
                        <Table
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                            totalPage={totalPage}>
                            <thead>
                                <tr>
                                    {TABLE_RECLAMOS.map((head) => (
                                        <Th key={head} text={head} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sistemas.reclamos.length > 0 ? (
                                    paginatedPages.map(
                                        (
                                            {
                                                NUMERO,
                                                NUMERODOCUMENTO,
                                                MOTIVO,
                                                DERIVADO,
                                                NOMBRE,
                                                APELLIDO,
                                                CALLE,
                                                ALTURACALLE,
                                            },
                                            index
                                        ) => (
                                            <Tr key={index}>
                                                <Td content={NUMERO} />
                                                <Td content={NUMERODOCUMENTO} />
                                                <Td content={MOTIVO} />
                                                <Td content={DERIVADO} />
                                                <Td content={NOMBRE} />
                                                <Td content={APELLIDO} />
                                                <Td content={CALLE} />
                                                <Td content={ALTURACALLE} />
                                                <Td>
                                                    <Location />
                                                </Td>
                                            </Tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-4 text-center">
                                            No hay reclamos disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY RECLAMOS DISPONIBLES
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Reclamos;

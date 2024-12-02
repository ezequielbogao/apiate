import { useState } from "react";
import { useMenu } from "../../Context/MenuContext";
import Content from "../components/Content";
import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";
import Errormsg from "../components/Errormsg";
import Th from "../components/table/Th";
import Table from "../components/table/Table";
import Tr from "../components/table/Tr";
import Td from "../components/table/Td";

const Pagos = () => {
    const { sistemas, error, loading } = useMenu();

    const TABLE_PAGOS = [
        "Tipo",
        "Modo de pago",
        "Imponible",
        "Importe",
        "Fecha de pago",
        "Estado",
    ];

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    if (sistemas && sistemas.pagos) {
        totalPage = Math.ceil(sistemas.pagos.length / itemsPerPage);
        paginatedPages = sistemas.pagos.slice(
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
                <ContentHeader label="Autogestión" title="PAGOS" />

                <div className="p-5">
                    {loading ? (
                        <Loading title="pagos" />
                    ) : sistemas && sistemas.pagos ? (
                        <Table
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                            totalPage={totalPage}>
                            <thead>
                                <tr>
                                    {TABLE_PAGOS.map((head) => (
                                        <Th key={head} text={head} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sistemas.pagos.length > 0 ? (
                                    paginatedPages.map(
                                        (
                                            {
                                                tipo,
                                                modo_pago,
                                                imponible,
                                                importe,
                                                fecha_pago,
                                                estado,
                                            },
                                            index
                                        ) => (
                                            <Tr key={index}>
                                                <Td content={tipo} />
                                                <Td content={modo_pago} />
                                                <Td content={imponible} />
                                                <Td content={importe} />
                                                <Td content={fecha_pago} />
                                                <Td>
                                                    <span
                                                        className={`font-normal text-sm ${
                                                            estado ===
                                                            "Cancelada"
                                                                ? "text-red-500"
                                                                : "text-green-600"
                                                        }`}>
                                                        {estado}
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
                                            No hay pagos disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY PAGOS DISPONIBLES
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Pagos;

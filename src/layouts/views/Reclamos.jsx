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
import MapReclamos from "@cpt/MapReclamos";
import { useSelector } from "react-redux";

const Reclamos = () => {
    const { sistemas, loadingSistemas, errorSistemas } = useSelector(
        (state) => state.personal
    );
    const TABLE_RECLAMOS = [
        "Número",
        "Documento",
        "Motivo",
        "Derivado",
        "Nombre",
        "Apellido",
        "Calle",
        "Altura",
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

                <div className="p-5 md:p-10">
                    {loadingSistemas ? (
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
                                                // latitud,
                                                // longitud,
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
                        !errorSistemas && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY RECLAMOS DISPONIBLES
                            </div>
                        )
                    )}
                    {errorSistemas && <Errormsg />}
                </div>
                <div className="p-10">{<MapReclamos />}</div>
            </div>
        </Content>
    );
};

export default Reclamos;

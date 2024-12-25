import Content from "@cpt/Content";
import { useMenu } from "@ctx/MenuContext";
import { useState } from "react";
import Loading from "@cpt/Loading";
import ContentHeader from "@cpt/ContentHeader";
import Errormsg from "@cpt/Errormsg";
import Th from "@cpt/table/Th";
import Tr from "@cpt/table/Tr";
import Td from "@cpt/table/Td";
import Table from "@cpt/table/Table";

const Turnos = () => {
    const { sistemas, error, loading } = useMenu();

    const TABLE_TURNOS = [
        "Paciente",
        "Médico",
        "Especialidad",
        "Ubicación",
        "Procedimiento",
        "Llegada",
        "Salida",
    ];

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    if (sistemas && sistemas.salud_turnos) {
        totalPage = Math.ceil(sistemas.salud_turnos.length / itemsPerPage);
        paginatedPages = sistemas.salud_turnos.slice(
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
                <ContentHeader label="Salud" title="TURNOS" />

                <div className="p-5 md:p-10">
                    {loading ? (
                        <Loading title="turnos" />
                    ) : sistemas && sistemas.salud_turnos ? (
                        <Table
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                            totalPage={totalPage}>
                            <thead>
                                <tr>
                                    {TABLE_TURNOS.map((head) => (
                                        <Th key={head} text={head} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sistemas.salud_turnos.length > 0 ? (
                                    paginatedPages.map(
                                        (
                                            {
                                                paciente,
                                                medico,
                                                especialidad,
                                                ubicacion,
                                                procedimiento,
                                                llegada,
                                                salida,
                                            },
                                            index
                                        ) => (
                                            <Tr key={index}>
                                                <Td content={paciente} />
                                                <Td content={medico} />
                                                <Td content={especialidad} />
                                                <Td content={ubicacion} />
                                                <Td content={procedimiento} />
                                                <Td content={llegada} />
                                                <Td content={salida} />
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
                        </Table>
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY TURNOS DISPONIBLES
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Turnos;

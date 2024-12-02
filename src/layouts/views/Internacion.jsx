import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";
import Errormsg from "../components/Errormsg";
import Th from "../components/table/Th";
import Table from "../components/table/Table";
import Tr from "../components/table/Tr";
import Td from "../components/table/Td";

const Internacion = () => {
    const { sistemas, error, loading } = useMenu();

    const TABLE_INTERNACION = [
        "Paciente",
        "Cód. Paciente",
        "Cobertura",
        "Fecha Ingreso",
        "Fecha Egreso",
        "Descripcion",
        "Observaciones",
        "Cod. Ubicación",
        "Descripción",
    ];

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    if (sistemas && sistemas.salud_internacion) {
        totalPage = Math.ceil(sistemas.salud_internacion.length / itemsPerPage);
        paginatedPages = sistemas.salud_internacion.slice(
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

    useEffect(() => {
        console.log(paginatedPages);
    }, [paginatedPages]);

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Salud" title="INTERNACIÓN" />

                <div className="p-5">
                    {loading ? (
                        <Loading title="internación" />
                    ) : sistemas && sistemas.salud_internacion ? (
                        <Table
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                            totalPage={totalPage}>
                            <thead>
                                <tr>
                                    {TABLE_INTERNACION.map((head) => (
                                        <Th key={head} text={head} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sistemas.salud_internacion.length > 0 ? (
                                    paginatedPages.map(
                                        (
                                            {
                                                paciente,
                                                pacoCodigo,
                                                cobeDescripcion,
                                                inteFechaIngreso,
                                                inteFechaEgreso,
                                                tiinDescripcion,
                                                inteObservaciones,
                                                ubicCodigo,
                                                ubicDescripcion,
                                            },
                                            index
                                        ) => (
                                            <Tr key={index}>
                                                <Td content={paciente} />
                                                <Td content={pacoCodigo} />
                                                <Td content={cobeDescripcion} />
                                                <Td
                                                    content={inteFechaIngreso}
                                                />
                                                <Td content={inteFechaEgreso} />
                                                <Td content={tiinDescripcion} />
                                                <Td
                                                    content={inteObservaciones}
                                                />
                                                <Td content={ubicCodigo} />
                                                <Td content={ubicDescripcion} />
                                            </Tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-4 text-center">
                                            No hay internaciones disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY INTERNACIONES DISPONIBLES
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Internacion;

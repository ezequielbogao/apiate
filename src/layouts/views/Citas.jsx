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

const Citas = () => {
    const { sistemas, error, loading } = useMenu();

    const TABLE_CITAS = [
        "Email",
        "Organización",
        "Teléfono",
        "Canal",
        "Fecha",
        "Estado",
    ];

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    if (sistemas && sistemas.citas) {
        totalPage = Math.ceil(sistemas.citas.length / itemsPerPage);
        paginatedPages = sistemas.citas.slice(
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
                <ContentHeader label="Conducir" title="CITAS" />

                <div className="p-5">
                    {loading ? (
                        <Loading title="citas" />
                    ) : sistemas && sistemas.citas ? (
                        <Table
                            currentPage={currentPage}
                            prevPage={prevPage}
                            nextPage={nextPage}
                            totalPage={totalPage}>
                            <thead>
                                <tr>
                                    {TABLE_CITAS.map((head) => (
                                        <Th key={head} text={head} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sistemas.citas.length > 0 ? (
                                    paginatedPages.map(
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
                        </Table>
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY CITAS DISPONIBLES
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Citas;

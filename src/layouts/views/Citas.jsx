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
import { useSelector } from "react-redux";

const Citas = () => {
    const { sistemas, loadingSistemas, errorSistemas } = useSelector(
        (state) => state.personal
    );

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

                <div className="p-5 md:p-10">
                    {loadingSistemas ? (
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
                        !errorSistemas && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY CITAS DISPONIBLES
                            </div>
                        )
                    )}
                    {errorSistemas && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Citas;

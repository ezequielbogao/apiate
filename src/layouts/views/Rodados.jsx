import { useEffect, useState } from "react";
import Content from "@cpt/Content";
import { useMenu } from "@ctx/MenuContext";
import Loading from "@cpt/Loading";
import Auto from "@icons/Auto";
import ContentHeader from "@cpt/ContentHeader";
import Errormsg from "@cpt/Errormsg";
import Imponible from "@cpt/Imponible";
import { useSelector } from "react-redux";
import Pending from "../components/Pending";

const Rodados = () => {
    const { sistemas, loadingSistemas, errorSistemas } = useSelector(
        (state) => state.personal
    );

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 8;
    const [currentPage, setcurrentPage] = useState(1);

    if (sistemas && sistemas.rafam_imponibles_deuda) {
        let imponibles = sistemas.rafam_imponibles_deuda?.IMPONIBLES?.RODADOS;
        if (imponibles && imponibles.length > 0) {
            totalPage = Math.ceil(imponibles.length / itemsPerPage);
            paginatedPages = imponibles.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
            );
        }
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
                <ContentHeader label="Rafam" title="RODADOS" />

                <div className="p-5 md:p-10">
                    <Pending loading={loadingSistemas} title={"Información"}>
                        {paginatedPages.length > 0 ? (
                            paginatedPages.some(
                                ({ NRO_RODADO }) => NRO_RODADO
                            ) ? (
                                <>
                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {paginatedPages.map(
                                            (
                                                { NRO_RODADO, DEUDA_RODADO },
                                                index
                                            ) =>
                                                NRO_RODADO && (
                                                    <Imponible
                                                        to={`/rafam/RODADO/${NRO_RODADO}`}
                                                        key={index}
                                                        nro={NRO_RODADO}
                                                        deuda={DEUDA_RODADO}
                                                        icon={
                                                            <Auto
                                                                width="50"
                                                                height="50"
                                                            />
                                                        }
                                                    />
                                                )
                                        )}
                                    </div>
                                    <div className="flex justify-center items-center mt-4">
                                        <button
                                            onClick={prevPage}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 bg-transparent text-azure-600 hover:text-light-green-500 rounded disabled:text-gray-300 outline-none border-none focus:outline-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-left">
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M17 6h-6a1 1 0 0 0 -.78 .375l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78 .375h6l.112 -.006a1 1 0 0 0 .669 -1.619l-3.501 -4.375l3.5 -4.375a1 1 0 0 0 -.78 -1.625z" />
                                            </svg>
                                        </button>
                                        <span className="text-sm text-azure-600 dark:text-azure-200">
                                            Página {currentPage} de {totalPage}
                                        </span>
                                        <button
                                            onClick={nextPage}
                                            disabled={currentPage === totalPage}
                                            className="px-4 py-2 bg-transparent text-azure-600 hover:text-light-green-500 rounded disabled:text-gray-300 outline-none border-none focus:outline-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-right">
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5 4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z" />
                                            </svg>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                    NO HAY RODADOS DISPONIBLES
                                </div>
                            )
                        ) : (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY RODADOS DISPONIBLES
                            </div>
                        )}
                    </Pending>
                </div>
            </div>
        </Content>
    );
};

export default Rodados;

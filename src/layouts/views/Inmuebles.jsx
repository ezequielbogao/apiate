import { useState } from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../../Context/MenuContext";
import Content from "../components/Content";
import Loading from "../components/Loading";
import Casa from "../components/icons/Casa";
import ContentHeader from "../components/ContentHeader";
import Errormsg from "../components/Errormsg";
import Imponible from "../components/Imponible";

const Inmuebles = () => {
    const { sistemas, error, loading } = useMenu();

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 8;
    const [currentPage, setcurrentPage] = useState(1);

    if (sistemas && sistemas.rafam_imponibles.inmuebles) {
        totalPage = Math.ceil(
            sistemas.rafam_imponibles.inmuebles.length / itemsPerPage
        );
        paginatedPages = sistemas.rafam_imponibles.inmuebles.slice(
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
                <ContentHeader label="Rafam" title="INMUEBLES" />

                <div className="p-5">
                    {loading ? (
                        <Loading title="inmuebles" />
                    ) : sistemas &&
                      sistemas.rafam_imponibles &&
                      sistemas.rafam_imponibles.inmuebles ? (
                        sistemas.rafam_imponibles.inmuebles.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {paginatedPages.map(
                                        (
                                            { NRO_INMUEBLE, DEUDA_INMUEBLE },
                                            index
                                        ) => (
                                            <Imponible
                                                to={`/rafam/inmueble/${NRO_INMUEBLE}`}
                                                key={index}
                                                nro={NRO_INMUEBLE}
                                                deuda={DEUDA_INMUEBLE}
                                                icon={
                                                    <Casa
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
                            <tr>
                                <td colSpan="6" className="p-4 text-center">
                                    No hay inmuebles disponibles.
                                </td>
                            </tr>
                        )
                    ) : (
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY INMUEBLES DISPONIBLES
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Inmuebles;

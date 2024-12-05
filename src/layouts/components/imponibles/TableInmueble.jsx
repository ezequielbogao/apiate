import { useState } from "react";
import { useMenu } from "../../../Context/MenuContext";
import Loading from "../../components/Loading";
import Errormsg from "../../components/Errormsg";
import { Link } from "react-router-dom";

const TableInmueble = () => {
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
        <>
            {loading ? (
                <Loading title="inmuebles" />
            ) : sistemas &&
              sistemas.rafam_imponibles &&
              sistemas.rafam_imponibles.inmuebles ? (
                paginatedPages.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {paginatedPages.map(({ NRO_INMUEBLE }, index) => (
                                <Link
                                    key={index}
                                    to={`/rafam/inmueble/${NRO_INMUEBLE}`}
                                    className="bg-white shadow-sm hover:-translate-y-1 transition-all ease-in dark:bg-azure-600 rounded-xl mt-2 border-2 border-azure-100 dark:border-azure-700 p-2 hover:border-azure-300">
                                    <div className="text-azure-600">
                                        <div className="flex flex-col align-middle items-center justify-center">
                                            <span className="text-azure-300 text-md font-medium">
                                                N°
                                                {NRO_INMUEBLE}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="flex justify-end items-center mt-4">
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
                !error && (
                    <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                        NO HAY RODADOS DISPONIBLES
                    </div>
                )
            )}
            {error && <Errormsg />}
        </>
    );
};

export default TableInmueble;

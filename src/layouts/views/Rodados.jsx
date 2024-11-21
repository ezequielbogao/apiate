import { useState } from "react";
import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";
import Loading from "../components/Loading";
import Auto from "../components/icons/Auto";

const Rodados = () => {
    const { sistemas, error, loading } = useMenu();

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    if (sistemas && sistemas.Rafam_imponibles.Rodados) {
        totalPage = Math.ceil(
            sistemas.Rafam_imponibles.Rodados.length / itemsPerPage
        );
        paginatedPages = sistemas.Rafam_imponibles.Rodados.slice(
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
            <div className="col-span-12 sm:col-span-9 md:col-span-10 text-left">
                <div className="col-span-12 p-5 text-left  border-b-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
                    <div className="flex flex-col text-left">
                        <span className="text-md text-azure-400 font-light">
                            Rafam
                        </span>
                        <span className="text-2xl text-azure-700 dark:text-azure-300 font-medium">
                            RODADOS
                        </span>
                    </div>
                </div>
                <div className="p-5">
                    {loading ? (
                        <Loading title="rodados" />
                    ) : sistemas &&
                      sistemas.Rafam_imponibles &&
                      sistemas.Rafam_imponibles.Rodados ? (
                        sistemas.Rafam_imponibles.Rodados.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {paginatedPages.map(
                                    ({ NRO_RODADO, DEUDA_RODADO }, index) => (
                                        <div
                                            key={index}
                                            className="bg-white dark:bg-azure-700 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                                            <div className=" text-azure-600">
                                                <div className="flex flex-col align-middle items-center justify-center">
                                                    <Auto
                                                        width="50"
                                                        height="50"
                                                    />
                                                    <span className="text-azure-300 text-md font-medium mt-3">
                                                        N° {NRO_RODADO}
                                                    </span>
                                                    <span className="text-red-600 dark:text-red-400 text-lg font-medium">
                                                        {DEUDA_RODADO}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 text-center">
                                    No hay rodados disponibles.
                                </td>
                            </tr>
                        )
                    ) : (
                        <></>
                    )}
                    {error && (
                        <div className="w-full h-full flex justify-center align-middle items-center">
                            <p className="text-red-600">Error</p>
                        </div>
                    )}
                </div>
            </div>
        </Content>
    );
};

export default Rodados;

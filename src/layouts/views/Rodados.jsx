import { useState } from "react";
import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";

const Rodados = () => {
    const { sistemas, error, loading } = useMenu();

    const TABLE_RODADOS = [];

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
                        <span className="text-md text-azure-400 font-thin">
                            Rafam
                        </span>
                        <span className="text-2xl text-azure-700 dark:text-azure-300 font-normal">
                            RODADOS
                        </span>
                    </div>
                </div>
                <div className="p-5">
                    {loading ? (
                        <div className="w-full h-full flex justify-center align-middle items-center">
                            <p className="text-azure-600 dark:text-azure-200">
                                Cargando...
                            </p>
                        </div>
                    ) : (
                        sistemas && <></>
                    )}
                    {error && (
                        <div className="w-full h-full flex justify-center align-middle items-center">
                            <p className="text-red-600">Error</p>
                        </div>
                    )}
                    {sistemas &&
                    sistemas.Rafam_imponibles &&
                    sistemas.Rafam_imponibles.Rodados ? (
                        <></>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </Content>
    );
};

export default Rodados;

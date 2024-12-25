import { useEffect, useState } from "react";
import { useMenu } from "@ctx/MenuContext";
import Loading from "@cpt/Loading";
import Errormsg from "@cpt/Errormsg";

import { Link } from "react-router-dom";
import Paginate from "../table/Paginate";

const TableInmueble = () => {
    const { sistemas, error, loading } = useMenu();
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [paginatedPages, setPaginatedPages] = useState([]);
    const [filteredResults, setFilteredResults] = useState(data);
    const [imponible, setImponible] = useState("");
    const itemsPerPage = 16;

    const nextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        if (sistemas && sistemas.rafam_imponibles.inmuebles) {
            setData(sistemas.rafam_imponibles.inmuebles);
        }
    }, []);

    useEffect(() => {
        if (filteredResults && filteredResults.length != 0) {
            setData(filteredResults);
        } else {
            setData(sistemas.rafam_imponibles.inmuebles);
        }
        if (data) {
            const total = Math.ceil(data.length / itemsPerPage);
            setTotalPage(total);

            const paginatedData = data.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
            );
            setPaginatedPages(paginatedData);
        }
    }, [data, currentPage, filteredResults]);

    const updateImponible = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setImponible(value);
        }
        const results = data.filter((item) =>
            item.NRO_INMUEBLE.toString().includes(value)
        );
        setFilteredResults(results);
        if (value == "")
            setFilteredResults(sistemas.rafam_imponibles.inmuebles);
    };

    return (
        <>
            {loading ? (
                <Loading title="inmuebles" />
            ) : data ? (
                paginatedPages.length > 0 ? (
                    <>
                        <div className="flex justify-between align-middle items-center mb-2">
                            <span className="text-sm text-center text-azure-300 font-medium dark:text-azure-300">
                                Inmuebles
                            </span>
                            <div className="flex flex-col">
                                <input
                                    onChange={updateImponible}
                                    type="text"
                                    value={imponible}
                                    pattern="^[0-9]+$"
                                    placeholder="Buscar inmueble"
                                    className="p-1 text-sm border border-azure-100  dark:border-azure-700 px-2 rounded-md text-azure-700 bg-white dark:bg-azure-700 dark:text-azure-50 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                            {paginatedPages.map(({ NRO_INMUEBLE }, index) => (
                                <Link
                                    key={index}
                                    to={`/rafam/inmueble/${NRO_INMUEBLE}`}
                                    className="bg-white shadow-sm hover:-translate-y-1 transition-all ease-in dark:bg-azure-600 rounded-xl mt-2 border-2 border-azure-100 dark:border-azure-900 p-1 hover:border-azure-300">
                                    <div className="text-azure-600">
                                        <div className="flex flex-col align-middle items-center justify-center">
                                            <span className="text-azure-500 text-sm font-medium">
                                                N°
                                                {NRO_INMUEBLE}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Paginate
                            prevPage={prevPage}
                            nextPage={nextPage}
                            currentPage={currentPage}
                            totalPage={totalPage}
                        />
                    </>
                ) : (
                    <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                        NO HAY INMUEBLES DISPONIBLES
                    </div>
                )
            ) : (
                !error && (
                    <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                        NO HAY INMUEBLES DISPONIBLES
                    </div>
                )
            )}
            {error && <Errormsg />}
        </>
    );
};

export default TableInmueble;

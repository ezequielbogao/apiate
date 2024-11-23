import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

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

    if (sistemas && sistemas.Salud_internacion) {
        totalPage = Math.ceil(sistemas.Salud_internacion.length / itemsPerPage);
        paginatedPages = sistemas.Salud_internacion.slice(
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
                <div className="p-5 text-left border-b-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
                    <div className="flex flex-col text-left">
                        <span className="text-md text-azure-400 font-light">
                            Salud
                        </span>
                        <span className="text-2xl text-azure-700 dark:text-azure-300 font-medium">
                            INTERNACIÓN
                        </span>
                    </div>
                </div>
                <div className="p-5">
                    {loading ? (
                        <Loading title="internación" />
                    ) : sistemas && sistemas.Salud_internacion ? (
                        <div className="overflow-auto bg-white dark:bg-azure-800 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_INTERNACION.map((head) => (
                                            <th
                                                key={head}
                                                className="bg-azure-200 dark:bg-azure-800 p-4">
                                                <span className="text-md font-medium leading-none  text-azure-700 dark:text-azure-100">
                                                    {head}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sistemas.Salud_internacion.length > 0 ? (
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
                                                <tr
                                                    key={index}
                                                    className="even:bg-azure-100/100 dark:even:bg-azure-700/100">
                                                    <td className="p-4">
                                                        <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                            {paciente}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                            {pacoCodigo}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                            {cobeDescripcion}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                            {inteFechaIngreso}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                            {inteFechaEgreso}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                            {tiinDescripcion}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                            {inteObservaciones}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                            {ubicCodigo}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-light text-sm text-azure-600 dark:text-azure-300">
                                                            {ubicDescripcion}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="p-4 text-center">
                                                No hay internaciones
                                                disponibles.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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
                        </div>
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

export default Internacion;

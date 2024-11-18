import { useState } from "react";
import { useMenu } from "../../Context/MenuContext";
import Content from "../components/Content";

const Pagos = () => {
    const { sistemas, error, loading } = useMenu();

    const TABLE_PAGOS = [
        "Tipo",
        "Modo de pago",
        "Imponible",
        "Importe",
        "Fecha de pago",
        "Estado",
    ];

    let totalPage = 0;
    let paginatedPages = 0;
    const itemsPerPage = 10;
    const [currentPage, setcurrentPage] = useState(1);

    if (sistemas && sistemas.Pagos) {
        totalPage = Math.ceil(sistemas.Pagos.length / itemsPerPage);
        paginatedPages = sistemas.Pagos.slice(
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
                            Sistema
                        </span>
                        <span className="text-2xl text-azure-700 dark:text-azure-300 font-normal">
                            PAGOS
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
                    {sistemas && sistemas.Pagos ? (
                        <div className="overflow-auto bg-azure-50 dark:bg-azure-900 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_PAGOS.map((head) => (
                                            <th
                                                key={head}
                                                className="bg-azure-200 dark:bg-azure-800  p-4">
                                                <span className="text-sm font-normal leading-none opacity-70 text-azure-700 dark:text-azure-100">
                                                    {head}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sistemas.Pagos.length > 0 ? (
                                        paginatedPages.map(
                                            (
                                                {
                                                    tipo,
                                                    modo_pago,
                                                    imponible,
                                                    importe,
                                                    fecha_pago,
                                                    estado,
                                                },
                                                index
                                            ) => (
                                                <tr
                                                    key={index}
                                                    className="even:bg-azure-100/100 dark:even:bg-azure-800/100">
                                                    <td className="p-4">
                                                        <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                            {tipo}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                            {modo_pago}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                            {imponible}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                            {importe}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                            {fecha_pago}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span
                                                            className={`font-normal text-sm ${
                                                                estado ===
                                                                "Cancelada"
                                                                    ? "text-red-500"
                                                                    : "text-green-600"
                                                            }`}>
                                                            {estado}
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
                                                No hay pagos disponibles.
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
                                        viewBox="0 0 24 24"
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
                                        viewBox="0 0 24 24"
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
                </div>
            </div>
        </Content>
    );
};

export default Pagos;

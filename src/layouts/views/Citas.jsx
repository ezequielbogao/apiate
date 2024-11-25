import { useState } from "react";
import { useMenu } from "../../Context/MenuContext";
import Content from "../components/Content";
import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";
import Errormsg from "../components/Errormsg";

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
                        <div className="overflow-auto bg-white dark:bg-azure-800 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_CITAS.map((head) => (
                                            <th
                                                key={head}
                                                className="bg-azure-200 dark:bg-azure-800 p-4">
                                                <span className="text-md font-medium leading-none text-azure-700 dark:text-azure-100">
                                                    {head}
                                                </span>
                                            </th>
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
                                                <tr
                                                    key={index}
                                                    className="even:bg-azure-100/100 dark:even:bg-azure-700/100">
                                                    <td className="p-4">
                                                        <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                            {mail}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                            {organizacion}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                            {telefono}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                            {canal}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="font-normal text-sm text-azure-600 dark:text-azure-300">
                                                            {fecha_turno}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span
                                                            className={`font-normal text-sm ${
                                                                estado_turno ===
                                                                "Cancelada"
                                                                    ? "text-red-500"
                                                                    : "text-green-600"
                                                            }`}>
                                                            {estado_turno}
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
                                                No hay citas disponibles.
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

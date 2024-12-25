import { useMenu } from "@ctx/MenuContext";
import Loading from "../Loading";
import Th from "../table/Th";
import Tr from "../table/Tr";
import Td from "../table/Td";
import Errormsg from "../Errormsg";
import { Link } from "react-router-dom";

const TableCitas = () => {
    const { sistemas, error, loading } = useMenu();

    const TABLE_CITAS = [
        "Email",
        "Organización",
        "Teléfono",
        "Canal",
        "Fecha",
        "Estado",
    ];

    const citasUltimas =
        sistemas && sistemas.citas ? sistemas.citas.slice(-3) : [];

    return (
        <>
            {loading ? (
                <Loading title="citas" />
            ) : sistemas && sistemas.citas ? (
                <>
                    {" "}
                    <div className="overflow-auto bg-white dark:bg-azure-800 rounded-xl mt-5">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_CITAS.map((head) => (
                                        <Th key={head} text={head} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {citasUltimas.length > 0 ? (
                                    citasUltimas.map(
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
                        </table>
                    </div>
                    <div className="w-full flex justify-end py-3">
                        <Link
                            to={"/citas"}
                            className="text-white dark:text-azure-100 text-md bg-azure-500 hover:bg-azure-600 dark:bg-azure-600 hover:dark:bg-azure-700 hover:text-white px-3 py-1 rounded-md">
                            Ver mas
                        </Link>
                    </div>
                </>
            ) : (
                !error && (
                    <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                        NO HAY CITAS DISPONIBLES
                    </div>
                )
            )}
            {error && <Errormsg />}
        </>
    );
};

export default TableCitas;

import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";
import Loading from "../components/Loading";

const Emergencias = () => {
    const { sistemas, error, loading } = useMenu();

    return (
        <Content>
            <div className="text-left w-full">
                <div className="p-5 text-left border-b-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
                    <div className="flex flex-col text-left">
                        <span className="text-md text-azure-400 font-light">
                            Salud
                        </span>
                        <span className="text-2xl text-azure-700 dark:text-azure-300 font-medium">
                            EMERGENCIAS
                        </span>
                    </div>
                </div>
                <div className="p-5">
                    {loading ? (
                        <Loading title="citas" />
                    ) : sistemas && sistemas.salud_emergencias ? (
                        sistemas.salud_emergencias.length > 0 ? (
                            sistemas.salud_emergencias.map(
                                (
                                    {
                                        paciente,
                                        observaciones,
                                        emerCalle,
                                        emerAltura,
                                        emecCodigo,
                                        emecDescripcion,
                                        pacoCodigo,
                                        cobeDescripcion,
                                    },
                                    index
                                ) => (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-azure-700 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                                        <div className=" text-azure-600 mb-10">
                                            <div className="flex justify-between">
                                                <span className="text-azure-300 text-md font-medium">
                                                    Paciente # {paciente}
                                                </span>
                                                <span className="text-azure-600 dark:text-azure-100 text-md font-medium">
                                                    Código # {pacoCodigo}
                                                </span>
                                            </div>
                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    Ubicación
                                                </span>
                                                <span className=" dark:text-azure-100 font-light">
                                                    {emerCalle} {emerAltura}
                                                </span>
                                            </div>
                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    Observaciones
                                                </span>
                                                <p className=" dark:text-azure-100 font-light">
                                                    {observaciones}
                                                </p>
                                            </div>
                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    Codigo y Descripción
                                                </span>
                                                <span className=" dark:text-azure-100 font-light">
                                                    {emecCodigo}{" "}
                                                    {emecDescripcion}
                                                </span>
                                            </div>
                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    Cobertura
                                                </span>
                                                <span className=" dark:text-azure-100 font-light">
                                                    {cobeDescripcion}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 text-center">
                                    No hay emergencias disponibles.
                                </td>
                            </tr>
                        )
                    ) : (
                        <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                            NO HAY EMERGENCIAS DISPONIBLES
                        </div>
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

export default Emergencias;

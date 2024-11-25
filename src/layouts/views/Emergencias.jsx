import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";
import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";
import Errormsg from "../components/Errormsg";

const Emergencias = () => {
    const { sistemas, error, loading } = useMenu();

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Salud" title="EMERGENCIAS" />

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
                                                    PACIENTE # {paciente}
                                                </span>
                                                <span className="text-azure-600 dark:text-azure-100 text-md font-normal">
                                                    CÓDIGO # {pacoCodigo}
                                                </span>
                                            </div>
                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    UBICACIÓN
                                                </span>
                                                <span className=" dark:text-azure-100 font-normal">
                                                    {emerCalle} {emerAltura}
                                                </span>
                                            </div>
                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    OBSERVACIONES
                                                </span>
                                                <p className=" dark:text-azure-100 font-normal">
                                                    {observaciones}
                                                </p>
                                            </div>
                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    CÓDIGO Y DESCRIPCIÓN
                                                </span>
                                                <span className=" dark:text-azure-100 font-normal">
                                                    {emecCodigo}{" "}
                                                    {emecDescripcion}
                                                </span>
                                            </div>
                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    COBERTURA
                                                </span>
                                                <span className=" dark:text-azure-100 font-normal">
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
                        !error && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY EMERGENCIAS DISPONIBLES
                            </div>
                        )
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Emergencias;

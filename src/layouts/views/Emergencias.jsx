import Content from "@cpt/Content";
import { useMenu } from "@ctx/MenuContext";
import Loading from "@cpt/Loading";
import ContentHeader from "@cpt/ContentHeader";
import Errormsg from "@cpt/Errormsg";
import { useSelector } from "react-redux";

const Emergencias = () => {
    const { sistemas, loadingSistemas, errorSistemas } = useSelector(
        (state) => state.personal
    );
    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Salud" title="EMERGENCIAS" />

                <div className="p-5 md:p-10">
                    {loadingSistemas ? (
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
                                        className="grid grid-cols-12 gap-4 bg-white dark:bg-azure-700 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                                        <div className="col-span-12 md:col-span-6 lg:col-span-8 text-azure-600">
                                            <div className="flex justify-between">
                                                <span className="text-blue-600 dark:text-blue-500 text-lg font-normal">
                                                    PACIENTE # {paciente}
                                                </span>
                                                <span className="text-azure-600 dark:text-azure-100 text-md font-normal">
                                                    <span className="text-azure-300">
                                                        COD #
                                                    </span>{" "}
                                                    {pacoCodigo}
                                                </span>
                                            </div>
                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    UBICACIÓN
                                                </span>
                                                <span className=" dark:text-azure-100 font-normal">
                                                    {emerCalle &&
                                                        emerCalle.toLowerCase()}{" "}
                                                    {emerAltura &&
                                                        emerAltura.toLowerCase()}
                                                </span>
                                            </div>

                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    CÓDIGO Y DESCRIPCIÓN
                                                </span>
                                                <span className=" dark:text-azure-100 font-normal">
                                                    {emecCodigo}
                                                    {" - "}
                                                    {emecDescripcion &&
                                                        emecDescripcion.toLowerCase()}
                                                </span>
                                            </div>
                                            <div className="flex flex-col mt-3">
                                                <span className="text-azure-300 font-light">
                                                    COBERTURA
                                                </span>
                                                <span className=" dark:text-azure-100 font-normal">
                                                    {cobeDescripcion &&
                                                        cobeDescripcion.toLowerCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                            <div className="bg-azure-50 dark:bg-azure-800 p-3 rounded-xl h-full">
                                                <span className="text-azure-300 font-light px-2">
                                                    OBSERVACIONES
                                                </span>
                                                <div className="flex flex-col mt-3">
                                                    <span className="text-azure-500 dark:text-azure-100 font-normal px-2">
                                                        {observaciones &&
                                                            observaciones.toLowerCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        ) : (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY EMERGENCIAS DISPONIBLES
                            </div>
                        )
                    ) : (
                        !errorSistemas && (
                            <div className="p-4 text-lg text-center text-azure-600 font-light dark:text-azure-300">
                                NO HAY EMERGENCIAS DISPONIBLES
                            </div>
                        )
                    )}
                    {errorSistemas && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Emergencias;

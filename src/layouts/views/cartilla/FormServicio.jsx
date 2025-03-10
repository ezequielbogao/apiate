import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchEspecialidades,
    fetchServicios,
} from "../../../redux/slices/cartillaSlice";

export const FormServicio = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { especialidades, servicios } = useSelector(
        (state) => state.cartilla
    );

    const [selectedCodSer, setSelectedCodSer] = useState("");
    const [selectedCodEsp, setSelectedCodEsp] = useState("");
    const [selectedCodTipo, setSelectedCodTipo] = useState("medicos");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedCodEsp) {
            let url = "";

            if (selectedCodTipo == "medicos") url = "medicos";
            if (selectedCodTipo == "centros") url = "centros";

            navigate(`/salud/cartilla/${url}/${selectedCodEsp}`);
        }
    };
    const style = {
        input: "p-3 border-2 dark:text-azure-100 border-azure-300 rounded-md dark:bg-azure-600 dark:border-azure-700 focus:outline-none",
    };

    const handleSelSer = (e) => {
        const codigo = e.target.value;
        setSelectedCodSer(codigo);
        dispatch(fetchEspecialidades(codigo));
    };

    const handleSelEsp = (e) => {
        const codigo = e.target.value;
        setSelectedCodEsp(codigo);
    };

    const handleSelTipo = (e) => {
        const codigo = e.target.value;
        setSelectedCodTipo(codigo);
    };

    useEffect(() => {
        if (especialidades && especialidades.length > 0) {
            setSelectedCodEsp(especialidades[0].espeCodigo);
        }
    }, [especialidades]);

    useEffect(() => {
        dispatch(fetchServicios());
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-5 border-2 border-azure-200 dark:border-azure-600 rounded-md p-5 w-full">
            {/* <span className="text-azure-400 mb-2">POR SERVICIO MÉDICO</span> */}
            <div className="flex flex-col mb-3 w-full">
                <label className="mb-1 text-azure-500 text-md font-light">
                    Buscar por Médico o Centro de Salud
                </label>
                <select
                    className={style.input}
                    onChange={handleSelTipo}
                    value={selectedCodTipo}>
                    <option value="medico">Médico</option>
                    <option value="centros">Centro de salud</option>
                </select>
            </div>
            <div className="flex flex-col mb-3 w-full">
                <label className="mb-1 text-azure-500 text-md font-light">
                    Seleccioná un servicio
                </label>
                <select
                    className={style.input}
                    onChange={handleSelSer}
                    value={selectedCodSer}>
                    <option value={""}>Seleccionar opción</option>
                    {servicios.map(({ codigo, servicio }) => (
                        <option key={codigo} value={codigo}>
                            {servicio}
                        </option>
                    ))}
                </select>
            </div>
            {especialidades && (
                <div className="flex flex-col mb-3 w-full">
                    <label className="mb-1 text-azure-500 text-md font-light">
                        Seleccioná una especialidad
                    </label>
                    <select
                        className={style.input}
                        onChange={handleSelEsp}
                        value={selectedCodEsp}>
                        <option>Seleccionar opción</option>
                        {especialidades.map(({ espeCodigo, especialidad }) => (
                            <option key={espeCodigo} value={espeCodigo}>
                                {especialidad}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="flex justify-end mt-3 gap-3">
                <button
                    type="submit"
                    className="bg-azure-600 hover:bg-azure-700 text-white border-0 outline-none transition-colors">
                    BUSCAR
                </button>
            </div>
        </form>
    );
};

import React from "react";
import { useNavigate } from "react-router-dom";

export const FormServicio = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        navigate("/salud/cartilla/buscar");
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-5 bg-azure-50 rounded-md p-5 w-full">
            <span className="text-azure-400 mb-2">POR SERVICIO MÉDICO</span>
            <div className="flex flex-col mb-3 w-full">
                <label className="mb-1 text-azure-500 text-md font-light">
                    Seleccioná una categoría*
                </label>
                <select className="p-3 border-2 border-azure-300 rounded-md">
                    <option>categoria 1</option>
                    <option>categoria 1</option>
                    <option>categoria 1</option>
                    <option>categoria 1</option>
                </select>
            </div>
            <div className="flex flex-col mb-3 w-full">
                <label className="mb-1 text-azure-500 text-md font-light">
                    Seleccioná un servicio médico*
                </label>
                <select className="p-3 border-2 border-azure-300 rounded-md">
                    <option>categoria 1</option>
                    <option>categoria 1</option>
                    <option>categoria 1</option>
                    <option>categoria 1</option>
                </select>
            </div>
            <div className="flex flex-col mb-3 w-full">
                <label className="mb-1 text-azure-500 text-md font-light">
                    Seleccioná un servicio médico*
                </label>
                <input
                    type="text"
                    placeholder="asdasd"
                    className="p-3 border-2 border-azure-300 rounded-md"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-azure-600 hover:bg-azure-700 text-white border-0 outline-none transition-colors">
                    BUSCAR
                </button>
            </div>
        </form>
    );
};

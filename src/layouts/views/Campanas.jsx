import { useEffect, useState } from "react";
import { useMenu } from "../../Context/MenuContext";
import Content from "../components/Content";
import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";
import Errormsg from "../components/Errormsg";
import axios from "axios";
import { toast } from "react-toastify";

const Campanas = () => {
    const { sistemas, error, loading, setLoading, setError } = useMenu();

    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        setError(null);

        event.preventDefault();
        if (!file) {
            // setError('Por favor selecciona un archivo');
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:5000/atenea/api/campania/data",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    responseType: "blob",
                }
            );

            // Si la respuesta es un archivo lo descargamos
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "listadoContactos.xlsx");
            document.body.appendChild(link);
            link.click();
            toast.success("Archivo procesado y descargado");
            setLoading(false);
        } catch (error) {
            if (error.response) {
                toast.error(`Error: no se pudo procesar el archivo`);
            } else if (error.request) {
                toast.error("No se pudo conectar con el servidor.");
            } else {
                toast.error("Hubo un error al realizar la solicitud.");
            }
            setLoading(false);
        }
    };

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Gestión" title="CAMPAÑAS" />

                <div className="p-5">
                    {loading ? (
                        <Loading title="contactos" />
                    ) : (
                        <div className="bg-white dark:bg-azure-700 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700 p-5">
                            <div className="flex flex-col md:flex-row text-azure-600 mb-10 gap-5 md:gap-20">
                                <div className="flex flex-col w-full ">
                                    <span className="text-azure-500 font-normal">
                                        SUBIR ARCHIVO PARA CAMPAÑA
                                    </span>

                                    <div className="text-azure-400 dark:text-azure-100 font-light text-sm mt-4">
                                        En esta sección, puedes cargar un
                                        archivo en formato Excel o CSV que
                                        contenga una columna llamada{" "}
                                        <span className=" text-azure-600 font-normal dark:text-blue-500 text-md">
                                            documento
                                        </span>{" "}
                                        . Este archivo será procesado para
                                        extraer la información de las personas
                                        que coincidan con los documentos
                                        proporcionados, junto con sus números de
                                        teléfono. <br></br>Esto te permitirá
                                        obtener rápidamente una lista de
                                        contactos para realizar campañas
                                        personalizadas.{" "}
                                        <p className="text-azure-600 font-normal dark:text-blue-500 text-md mt-4">
                                            Haz clic en el botón para
                                            seleccionar y cargar tu archivo y
                                            comenzar el proceso.
                                        </p>
                                    </div>
                                    <div className="w-full flex justify-start">
                                        <form
                                            onSubmit={handleSubmit}
                                            className="flex flex-col md:flex-row mt-5">
                                            <input
                                                required
                                                type="file"
                                                className="form-control bg-azure-100 dark:bg-azure-400 dark:text-azure-100 p-2 rounded-lg text-xs font-light md:rounded-r-none"
                                                id="file-upload"
                                                accept=".xlsx, .xls, .csv"
                                                onChange={handleFileChange}
                                            />
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="bg-azure-600 text-white text-xs font-light mt-1 md:mt-0 md:rounded-l-none focus:border-azure-600 hover:bg-azure-500 hover:outline-none hover:border-azure-600">
                                                    Subir archivo
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        // <div className="overflow-auto bg-white dark:bg-azure-800 rounded-xl  mt-5 border-2 border-azure-200 dark:border-azure-700">

                        // </div>
                    )}
                    {error && <Errormsg />}
                </div>
            </div>
        </Content>
    );
};

export default Campanas;

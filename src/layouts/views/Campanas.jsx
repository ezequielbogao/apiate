import { useState } from "react";
import { useMenu } from "../../Context/MenuContext";
import Content from "../components/Content";
import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";
import Errormsg from "../components/Errormsg";
import axios from "axios";

const Campanas = () => {
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

    if (sistemas && sistemas.pagos) {
        totalPage = Math.ceil(sistemas.pagos.length / itemsPerPage);
        paginatedPages = sistemas.pagos.slice(
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

    const [file, setFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState("");

    // Función para manejar la selección del archivo
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            // setError('Por favor selecciona un archivo');
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    responseType: "blob", // Esto es importante si esperamos recibir un archivo como respuesta
                }
            );

            // Si la respuesta es un archivo lo descargamos
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "archivo_modificado.xlsx");
            document.body.appendChild(link);
            link.click();
            setResponseMessage("Archivo procesado y descargado");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Gestión" title="CAMPAÑAS" />

                <div className="p-5">
                    {" "}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept=".xlsx, .xls,  .csv"
                            onChange={handleFileChange}
                        />
                        <button type="submit">Subir archivo</button>
                    </form>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {responseMessage && (
                        <p style={{ color: "green" }}>{responseMessage}</p>
                    )}
                </div>
            </div>
        </Content>
    );
};

export default Campanas;

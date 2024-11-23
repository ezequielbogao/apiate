import Content from "../../components/Content";
import { useMenu } from "../../../Context/MenuContext";
import { useState } from "react";
import Loading from "../../components/Loading";
import { Link, useParams } from "react-router-dom";

const Inmueble = () => {
    const { sistemas, error, loading } = useMenu();
    const { inmueble } = useParams();

    return (
        <Content>
            <div className="text-left w-full">
                <div className="p-5 text-left border-b-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
                    <div className="flex flex-col text-left">
                        <span className="text-md text-azure-400 font-light">
                            Rafam
                        </span>
                        <div className="flex">
                            <Link
                                to={"/rafam/inmuebles"}
                                className="text-2xl text-azure-800 hover:text-azure-500 dark:text-azure-300 font-medium me-2">
                                INMUEBLES /
                            </Link>
                            <span className="text-2xl text-azure-400 dark:text-azure-300 font-medium">
                                #{inmueble}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    {loading ? <Loading title="inmueble" /> : <></>}
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

export default Inmueble;

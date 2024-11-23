import { useState } from "react";
import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";
import { Spinner } from "@material-tailwind/react";
import Loading from "../components/Loading";

const Dashboard = () => {
    const { sistemas, error, loading } = useMenu();

    return (
        <Content>
            <div className="text-left w-full">
                <div className="p-5 text-left border-b-2 border-azure-200 dark:border-azure-600 bg-white dark:bg-azure-700">
                    <div className="flex flex-col text-left">
                        <span className="text-md text-azure-400 font-light">
                            Home
                        </span>
                        <span className="text-2xl text-azure-700 dark:text-azure-300 font-medium">
                            DASHBOARD
                        </span>
                    </div>
                </div>
                <div className="p-5">
                    {loading ? (
                        <Loading title="Tablero" />
                    ) : sistemas &&
                      sistemas.rafam_imponibles &&
                      sistemas.rafam_imponibles.rodados ? (
                        <></>
                    ) : (
                        <></>
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

export default Dashboard;

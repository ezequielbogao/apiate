import { useState } from "react";
import Content from "../components/Content";
import { useMenu } from "../../Context/MenuContext";
import { Spinner } from "@material-tailwind/react";
import Loading from "../components/Loading";
import ContentHeader from "../components/ContentHeader";

const Dashboard = () => {
    const { sistemas, error, loading } = useMenu();

    return (
        <Content>
            <div className="text-left w-full">
                <ContentHeader label="Home" title="DASHBOARD" />

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

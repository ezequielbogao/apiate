import Header from "../Header";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./Menu";
import Notification from "./Notification";
import { useEffect } from "react";

export const MainLayout = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="w-full flex flex-col justify-center bg-white text-azure-800 dark:bg-azure-900 dark:text-azure-50 bg-pattern">
            <Header />
            {/* <div className="flex w-[85%] sm:w-[90%] md:w-[100%] lg:w-[100%]"> */}
            <div className="flex w-full">
                <Menu />
                <Outlet />
            </div>
            <ToastContainer limit={3} stacked />
            <Notification />
            <ToastContainer
                limit={3}
                // stacked
                pauseOnFocusLoss={false}
                autoClose={5000}
            />
        </div>
    );
};

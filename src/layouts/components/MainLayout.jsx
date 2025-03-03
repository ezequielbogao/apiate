import Header from "../Header";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Notification from "./Notification";
export const MainLayout = () => {
    return (
        <div className="w-full flex flex-col justify-center bg-white text-azure-800 dark:bg-azure-900 dark:text-azure-50 bg-pattern">
            <Header />
            <div className="flex w-[85%] sm:w-[90%] md:w-[100%]">
                <Menu />
                <Outlet />
            </div>
            {/* <ToastContainer limit={3} stacked  /> */}
            <Notification />
            <ToastContainer
                stacked
                pauseOnFocusLoss={false}
                autoClose={5000}
                // toastStyle={{
                //     backgroundColor: "#f87171", // Rojo claro
                //     color: "white",
                //     padding: "16px",
                //     borderRadius: "8px",
                // }}
            />
        </div>
    );
};

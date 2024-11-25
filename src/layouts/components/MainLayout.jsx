import PropTypes from "prop-types";
import Header from "../Header";
import { ToastContainer } from "react-toastify";

export const MainLayout = ({ children }) => {
    MainLayout.propTypes = {
        children: PropTypes.object,
    };
    return (
        <div className="w-full flex flex-col justify-center bg-white text-azure-800 dark:bg-azure-900 dark:text-azure-50 bg-pattern">
            <Header />
            {children}
            <ToastContainer />
        </div>
    );
};
